import passport from 'passport'
import express from 'express'

export default function () {
  const router = express.Router()

  router.get('/',
    (req, res) => {
      if (req.isAuthenticated()) {
        res.redirect('/')
      } else {
        res.render('login')
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
