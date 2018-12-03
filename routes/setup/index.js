const bcrypt = require('bcrypt-nodejs')
const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  router.get('/',
    async (req, res) => {
      const dbInfo = await db.info();
      if (dbInfo.doc_count === 0) {
        res.render('setup', { title: 'Setup' });
      } else {
        res.redirect('/');
      }
    }
  );

  router.post('/',
    async (req, res) => {
      const dbInfo = await db.info();
      if (dbInfo.doc_count === 0) {
        bcrypt.hash(req.body.adminPassword, null, null, (err, adminPasswordHash) => {
          if (err) throw err;
          db.put({
            _id: req.body.adminUsername.trim(),
            password: adminPasswordHash,
            admin: true,
            wishlist: []
          })
          res.redirect('/');
        });
      } else {
        res.redirect('/');
      }
    }
  );

  return router;
}