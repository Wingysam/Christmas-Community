global._CC = { require }

_CC.package = require('./package.json')

const PouchSession = require('session-pouchdb-store')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')
const bcrypt = require('bcrypt-nodejs')
const flash = require('connect-flash')
const passport = require('passport')
const fetch = require('node-fetch')
const express = require('express')

const config = require('./config')
_CC.config = config

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

app.use(require('body-parser').urlencoded({ extended: true }))
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
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.use(require('./middlewares/locals'))

app.use((req, res, next) => {
  logger.log('express', `${req.ip} - ${req.method} ${req.originalUrl}`)
  next()
})

app.set('view engine', 'pug')
app.use(config.base, require('./routes')({ db, config }))

app.listen(config.port, () => logger.success('express', `Express server started on port ${config.port}!`))

;(() => {
  if (!config.dbExposePort) return
  const dbExposeApp = express()
  dbExposeApp.use('/', require('express-pouchdb')(PouchDB, { inMemoryConfig: true }))
  dbExposeApp.listen(config.dbExposePort, () => logger.success('db expose', `DB has been exposed on port ${config.dbExposePort}`))
})()

;(() => {
  async function getSecurityNotices () {
    try {
      const res = await fetch('https://gitlab.com/wingysam/christmas-community/-/raw/security-notices/security-notices.json')
      const data = await res.json()
      _CC.securityNotice = data[_CC.package.version]
      if (_CC.securityNotice) console.error(_CC.securityNotice)
    } catch (_) {}
  }
  getSecurityNotices()
  setInterval(getSecurityNotices, 1000 * 60 * 60) // hour
})()
