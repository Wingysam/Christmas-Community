import passport from 'passport'
import express from 'express'

export default function ({db}) {
  const router = express.Router()

  router.get('/', passport.authenticate('google-login', {
    scope: ['openid', 'profile', 'email']
  }));
  
  // Callback route once Google has authenticated the user
  router.get('/redirect', 
    passport.authenticate('google-login', { 
      successRedirect: '/',
      failureRedirect: '/login',
      failureMessage: 'Unable to sign-in using Google'
    })

  );

  router.get('/link', passport.authenticate('google-link', {
    scope: ['email']
  }));

  router.get('/link/redirect', 
    passport.authenticate('google-link', { failureRedirect: '/profile' }),
    (req, res) => {
      res.redirect('/profile');
    }
  );

  router.get('/unlink', async (req, res) => {
    const doc = await db.get(req.session.passport.user)
    delete doc.idpGoogle
    await db.put(doc)
    res.redirect('/profile');
  })

  return router
}
