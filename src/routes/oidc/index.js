import passport from 'passport'
import express from 'express'

export default function ({ db }) {
  const router = express.Router()

  router.get('/', passport.authenticate('oidc-login', {
    scope: ['openid', 'profile']
  }))

  // Callback route once OIDC has authenticated the user
  router.get('/redirect',
    passport.authenticate('oidc-login', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureMessage: 'Unable to sign-in using OIDC',
      failureFlash: true
    })

  )

  router.get('/link', passport.authenticate('oidc-link', {
    scope: ['profile']
  }))

  router.get('/link/redirect',
    passport.authenticate('oidc-link', { failureRedirect: '/profile', failureFlash: true }),
    (req, res) => {
      res.redirect('/profile')
    }
  )

  router.get('/unlink', async (req, res) => {
    try {
      const doc = await db.get(req.session.passport.user)
      delete doc.oauthConnections.oidc
      await db.put(doc)
      req.flash('success', _CC.lang('LOGIN_SSO_UNLINK_SUCCESS'))
    } catch (err) {
      req.flash('error', _CC.lang('LOGIN_SSO_UNLINK_FAILURE'))
    }
    res.redirect('/profile')
  })

  return router
}
