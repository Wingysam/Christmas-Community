global._CC = { require }
const expressSessionLevel = require('express-session-level');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bcrypt = require('bcrypt-nodejs');
const flash = require('connect-flash');
const passport = require('passport');
const express = require('express');
const level = require('level');

const config = require('./config');
_CC.config = config

if (!config.dbPrefix.startsWith('http')) {
  const mkdirp = require('mkdirp').sync
  mkdirp(config.dbPrefix)
}

const PouchDB = require('pouchdb').defaults({ prefix: config.dbPrefix });

const logger = require('./logger');
const { dbExposePort } = require('./config');

const app = express();
app.set('base', config.base)
app.set('trust proxy', config.trustProxy)

const db = new PouchDB('users');

passport.use('local', new LocalStrategy(
  (username, password, done) => {
    username = username.trim();
    db.get(username)
      .then(doc => {
        bcrypt.compare(password, doc.password, (err, correct) => {
          if (err) return done(err);
          if (!correct) return done(null, false, { message: 'Incorrect password' });
          if (correct) return done(null, doc);
        });
      })
      .catch(err => {
        if (err.message === 'missing') return done(null, false, { message: 'Incorrect username.' });
        return done(err);
      });
  }
));

passport.serializeUser((user, callback) => callback(null, user._id));

passport.deserializeUser((user, callback) => {
  db.get(user)
    .then(dbUser => callback(null, dbUser))
    .catch(() => callback(null, null));
});


const LevelStore = expressSessionLevel(session);
const sessionDb = level(config.sessionStore)

app.use(require('body-parser').urlencoded({ extended: true }));
app.use(session({
  secret: config.secret,
  resave: false,
  saveUninitialized: true,
  store: new LevelStore(sessionDb),
  cookie: {
    maxAge: config.sessionMaxAge
  },
  name: 'christmas_community.connect.sid'
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(require('./middlewares/locals'));

app.use((req, res, next) => {
  logger.log('express', `${req.ip} - ${req.method} ${req.originalUrl}`);
  next();
});

app.set('view engine', 'pug');
app.use(config.base, require('./routes')({ db, config }));

app.listen(config.port, () => logger.success('express', `Express server started on port ${config.port}!`))

;(() => {
  if (!dbExposePort) return
  const dbExposeApp = express()
  dbExposeApp.use('/', require('express-pouchdb')(PouchDB, { inMemoryConfig: true }));
  dbExposeApp.listen(config.dbExposePort, () => logger.success('db expose', `DB has been exposed on port ${config.dbExposePort}`))
})()
