import passport from 'passport'
import express from 'express'

export default function ({ db }) {
  const router = express.Router()

  router.get('/', passport.authenticate('google-login', {
    scope: ['openid', 'profile']
  }))

  // Callback route once Google has authenticated the user
  router.get('/redirect',
    passport.authenticate('google-login', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureMessage: 'Unable to sign-in using Google',
      failureFlash: true
    })

  )

  router.get('/link', passport.authenticate('google-link', {
    scope: ['profile']
  }))

  router.get('/link/redirect',
    passport.authenticate('google-link', { failureRedirect: '/profile', failureFlash: true }),
    (req, res) => {
      res.redirect('/profile')
    }
  )

  router.get('/unlink', async (req, res) => {
    try {
      const doc = await db.get(req.session.passport.user)
      delete doc.oauthConnections.google
      await db.put(doc)
      req.flash('success', _CC.lang('LOGIN_SSO_UNLINK_SUCCESS'))
    } catch (err) {
      req.flash('error', _CC.lang('LOGIN_SSO_UNLINK_FAILURE'))
    }
    res.redirect('/profile')
  })

  return router
}
