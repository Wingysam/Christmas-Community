global._CC = { require }

_CC.package = require('../package.json')

const PouchSession = require('session-pouchdb-store')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')
const bcrypt = require('bcrypt-nodejs')
const flash = require('connect-flash')
const passport = require('passport')
const fetch = require('node-fetch')
const express = require('express')
const path = require('path')

_CC._ = require('lodash')
_CC.moment = require('moment/min/moment-with-locales')

const { WishlistManager } = require('./structures/WishlistManager')
const config = require('./config')
_CC.config = config

;(() => {
  let language
  try {
    language = require(`./languages/${config.language}`)
  } catch (error) {
    if (error.message.startsWith('Cannot find module')) console.error(`Language ${config.language} is not supported. If you know this language and would like to translate Christmas Community, please ask for help doing so here: https://github.com/Wingysam/Christmas-Community/issues/new`)
    else console.error(`Failed to load language ${config.language} because of ${error}`)
    process.exit(1)
  }

  if (_CC.moment.locale(language.momentLocale) !== language.momentLocale) {
    console.error(`${_CC.moment.locale()} Failed to load language ${config.language}, moment locale missing. Valid locales: ${_CC.moment.locales().join(', ')}`)
    process.exit(1)
  }

  _CC.lang = (key, ...args) => {
    const lang = language.strings[key]
    if (!lang) return language.strings._NOT_LOCALIZED(key)
    if (typeof lang === 'function') return lang(...args)
    return lang
  }
})()

if (!config.dbPrefix.startsWith('http')) {
  const mkdirp = require('mkdirp').sync
  mkdirp(config.dbPrefix)
}

const PouchDB = require('pouchdb').defaults({ prefix: config.dbPrefix })

const logger = require('./logger')

const app = express()
app.set('base', config.base)
app.set('trust proxy', config.trustProxy)

const db = new PouchDB('users')
_CC.usersDb = db

_CC.wishlistManager = new WishlistManager()

passport.use('local', new LocalStrategy(
  (username, password, done) => {
    username = username.trim()
    db.get(username)
      .then(doc => {
        bcrypt.compare(password, doc.password, (err, correct) => {
          if (err) return done(err)
          if (!correct) return done(null, false, { message: 'Incorrect password' })
          if (correct) return done(null, doc)
        })
      })
      .catch(err => {
        if (err.message === 'missing') return done(null, false, { message: 'Incorrect username.' })
        return done(err)
      })
  }
))

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

app.use(require('body-parser').urlencoded({ extended: true }))
app.use(require('cookie-parser')());
app.use(session({
  secret: config.secret,
  resave: false,
  saveUninitialized: true,
  store: new PouchSession(new PouchDB('sessions')),
  cookie: {
    maxAge: config.sessionMaxAge
  },
  name: 'christmas_community.connect.sid'
}))
app.use((req, res, next) => {
  let basepath = req.path.substring(0, req.path.lastIndexOf("/"));

  // Clear cookies for paths that are not the base path. See #17
  if(basepath.length > config.base.length) {
    res.clearCookie('christmas_community.connect.sid', {path: req.path});
    res.clearCookie('christmas_community.connect.sid', {path: basepath});
  }
  next();
});
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.use(require('./middlewares/locals'))

app.use((req, res, next) => {
  logger.log('express', `${req.ip} - ${req.method} ${req.originalUrl}`)
  next()
})

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.use(config.base, require('./routes')({ db, config }))

app.listen(config.port, () => logger.success('express', `Express server started on port ${config.port}!`))

;(() => {
  if (!config.dbExposePort) return
  const dbExposeApp = express()
  dbExposeApp.use('/', require('express-pouchdb')(PouchDB, { inMemoryConfig: true }))
  dbExposeApp.listen(config.dbExposePort, () => logger.success('db expose', `DB has been exposed on port ${config.dbExposePort}`))
})()

;(() => {
  if (process.env.UPDATE_CHECK === 'false') return
  async function checkUpdates () {
    try {
      const res = await fetch('https://raw.githubusercontent.com/Wingysam/Christmas-Community/master/package.json')
      const data = await res.json()
      _CC.updateNotice = (data.version === _CC.package.version) ? false : { current: _CC.package.version, latest: data.version }
    } catch (_) {}
  }
  checkUpdates()
  setInterval(checkUpdates, 1000 * 60 * 60) // hour
})()
