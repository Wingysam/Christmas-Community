const verifyAuth = require('../middlewares/verifyAuth');
const express = require('express');
const path = require('path');

module.exports = ({ db, config }) => {
  const router = express.Router();

  router.use('/', express.static(path.join(__dirname, '../static')));

  router.get('/',
    async (req, res, next) => {
      dbInfo = await db.info();
      if (dbInfo.doc_count === 0) {
        res.redirect('/setup');
      } else {
        next();
      }
    },
    verifyAuth(),
    (req, res) => {
      res.redirect('/wishlist');
    }
  );

  router.use('/setup', require('./setup')(db));

  router.use('/login', require('./login')());
  router.use('/logout', require('./logout')());

  router.use('/wishlist', require('./wishlist')(db));

  router.use('/profile', require('./profile')(db));

  router.use('/admin-settings', require('./adminSettings')(db));

  router.use('/manifest.json', require('./manifest.json')({ config }))

  return router;
}