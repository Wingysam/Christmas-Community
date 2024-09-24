import passport from 'passport'
import express from 'express'

export default function () {
  const router = express.Router()

  var showGoogleSSO = false
  if ( process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ){ showGoogleSSO = true }

  router.get('/',
    (req, res) => {
      if (req.isAuthenticated()) {
        res.redirect('/')
      } else {
        res.render('login',{ showGoogleSSO })
      }
    }
  )

  router.post(
    '/',
    (req, res, next) => {
      next()
    },
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: 'Invalid username or password'
    })
  )
  return router
}
