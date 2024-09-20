import passport from 'passport'
import express from 'express'

export default function () {
  const router = express.Router()

  router.get('/', passport.authenticate('google', {
    scope: ['openid', 'profile', 'email']
  }));
  
  // Callback route once Google has authenticated the user
  router.get('/redirect', 
    passport.authenticate('google', { 
      successRedirect: '/',
      failureRedirect: '/login',
      failureMessage: 'Unable to sign-in using Google'
    })

  );

  return router
}
