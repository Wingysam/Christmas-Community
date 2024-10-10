import './env.js'
import './CC.js'

import PouchSession from 'session-pouchdb-store'
import { Strategy as LocalStrategy } from 'passport-local'
import GoogleStrategy from 'passport-google-oidc'
import session from 'express-session'
import bcrypt from 'bcrypt-nodejs'
import flash from 'connect-flash'
import passport from 'passport'
import express from 'express'
import path from 'path'
import mkdirp from 'mkdirp'
import BodyParser from 'body-parser'
import CookieParser from 'cookie-parser'
import ExpressPouchDB from 'express-pouchdb'
import { customAlphabet } from 'nanoid'

import config from './config/index.js'
import PouchDB from './PouchDB.js'
import logger from './logger.js'

// from https://github.com/ai/nanoid/blob/main/url-alphabet/index.js
const nanoidWithoutUnderscores = customAlphabet('useandom-26T198340PX75pxJACKVERYMINDBUSHWOLFGQZbfghjklqvwyzrict')

if (!config.dbPrefix.startsWith('http')) {
  await mkdirp(config.dbPrefix)
}

const app = express()
app.set('base', config.base)
app.set('trust proxy', config.trustProxy)

// https://github.com/Wingysam/Christmas-Community/issues/17#issuecomment-1824863081
app.use((req, res, next) => {
  if (!req.session?.passport || Object.keys(req.session?.passport)?.length === 0) { res.clearCookie('christmas_community.connect.sid', { path: '/wishlist' }) }
  next()
})

const db = _CC.usersDb

passport.use('local', new LocalStrategy(
  (username, password, done) => {
    username = username.trim()
    db.get(username)
      .then((doc: any) => {
        bcrypt.compare(password, doc.password, (err, correct) => {
          if (err) return done(err)
          if (!correct) return done(null, false, { message: _CC.lang('LOGIN_INCORRECT_PASSWORD') })
          if (correct) return done(null, doc)
        })
      })
      .catch(err => {
        if (err.message === 'missing') return done(null, false, { message: _CC.lang('LOGIN_INCORRECT_USERNAME') })
        return done(err)
      })  
  }
))

if ( config.googleSSOEnabled ) {
  passport.use('google-login', new GoogleStrategy({
      clientID: config.googleSSOClientId,
      clientSecret: config.googleSSOClientSecret,
      callbackURL: config.googleSignInRedirect,
    },
    async (issuer, profile, done) => {
      const username = profile.emails[0].value.trim();
      try {
        // Try to get the user from the database
        let docs = await db.find({
            selector: { "oauthConnections.google": { $eq: username } }
        });
        if (docs.docs.length == 1 ){
            return done(null, docs.docs[0])
        } else {
            // Handle other errors, including missing user
            return done(null, false, { message: _CC.lang('LOGIN_SSO_UNKNOWN_USER') });
        }
      }
      catch (err) {
          // Handle other errors, including missing user
          if (err.message === 'missing') {
              return done(null, false, { message: _CC.lang('LOGIN_SSO_UNKNOWN_USER') });
          }
          return done(err);
      }
    }
  ));

  passport.use('google-link', new GoogleStrategy({
    clientID: config.googleSSOClientId,
    clientSecret: config.googleSSOClientSecret,
    callbackURL: config.googleLinkRedirect,
    passReqToCallback: true
  },
    async (req, issuer, profile, done) => {
      const googleEmail = profile.emails[0].value.trim();  // Get Google email

      let docs = await db.find({
          selector: { "oauthConnections.google": { $eq: googleEmail } }
      });
      if (docs.docs.length == 1 ){
        req.flash('error', _CC.lang('LOGIN_SSO_LINK_FAILURE_ACCOUNT_EXISTS'))
        return done(null)
      } else {
        try {
          const doc = await db.get(req.session.passport.user)
          if (doc.oauthConnections) {
            doc.oauthConnections.google = googleEmail
          }
          else {
            doc.oauthConnections = {} // handle migration from 1.35 and earlier releases
            doc.oauthConnections.google = googleEmail
          }
          await db.put(doc)
          req.flash('success', _CC.lang('LOGIN_SSO_LINK_SUCCESS') )
          return done(null, doc);
        } catch (err) {
          req.flash('error', _CC.lang('LOGIN_SSO_LINK_FAILURE'))
          return done(err);
        }
      }
    }
  ));
}


passport.serializeUser((user, callback) => callback(null, user._id))

passport.deserializeUser((user, callback) => {
  db.get(user)
    .then(dbUser => callback(null, dbUser))
    .catch(() => callback(null, null))
})

// https://stackoverflow.com/a/54426950
app.use((req, res, next) => {
  const redirector = res.redirect
  res.redirect = function (url) {
    const base = this.req.app.set('base')
    if (base && url.startsWith('/')) url = base + url.substr(1)
    redirector.call(this, url)
  }
  next()
})

app.use(BodyParser.urlencoded({ extended: true }))
app.use(CookieParser())
app.use(session({
  secret: config.secret,
  resave: false,
  saveUninitialized: true,
  store: new PouchSession(new PouchDB('sessions')),
  cookie: {
    maxAge: config.sessionMaxAge
  },
  name: 'christmas_community.connect.sid',
  genid: () => nanoidWithoutUnderscores()
}))
app.use((req, res, next) => {
  const basepath = req.path.substring(0, req.path.lastIndexOf('/'))

  // Clear cookies for paths that are not the base path. See #17
  if (basepath.length > config.base.length) {
    res.clearCookie('christmas_community.connect.sid', { path: req.path })
    res.clearCookie('christmas_community.connect.sid', { path: basepath })
  }
  next()
})
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.use((await import('./middlewares/locals.js')).default)

app.use((req, res, next) => {
  logger.log('express', `${req.ip} - ${req.method} ${req.originalUrl}`)
  next()
})

app.set('view engine', 'pug')
app.set('views', path.resolve('./src/views'))
app.use(config.base, (await import('./routes/index.js')).default({ db, config }))

app.listen(config.port, () => { logger.success('express', `Express server started on port ${config.port}!`) })

;(() => {
  if (!config.dbExposePort) return
  const dbExposeApp = express()
  dbExposeApp.use('/', ExpressPouchDB(PouchDB, { inMemoryConfig: true, logPath: config.dbLogFile }))
  dbExposeApp.listen(config.dbExposePort, () => { logger.success('db expose', `DB has been exposed on port ${config.dbExposePort}`) })
})()
