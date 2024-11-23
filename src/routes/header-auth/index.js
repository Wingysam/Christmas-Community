import passport from 'passport'
import express from 'express'

export default function ({ config }) {
  const router = express.Router()

  router.get('/',
    passport.authenticate('header', { failureRedirect: config.headerSSORedirect, failureFlash: 'Invalid username or password' }),
    (req, res) => {
      res.redirect('/')
    }
  )


  return router
}
