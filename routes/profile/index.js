const verifyAuth = require('../../middlewares/verifyAuth');
const bcrypt = require('bcrypt-nodejs');
const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  router.get('/', verifyAuth(), (req, res) => res.render('profile', { title: `Profile Settings - ${req.user._id}`}));
  router.post('/', verifyAuth(), (req, res) => {
    if (req.body.oldPassword && req.body.newPassword) {
      bcrypt.compare(req.body.oldPassword, req.user.password, (err, correct) => {
        if (err) throw err;
        if (correct) {
          bcrypt.hash(req.body.newPassword, null, null, (err, hash) => {
            if (err) throw err;
            db.get(req.user._id)
              .then(doc => {
                doc.password = hash;
                db.put(doc)
                  .then(() => {
                    req.flash('success', 'Changes saved successfully!');
                    res.redirect('/profile');
                  })
                  .catch(err => { throw err; });
              })
              .catch(err => { throw err; });
          });
        } else {
          req.flash('error', 'Incorrect old password');
          res.redirect('/profile');
        }
      });
    } else {
      res.redirect('/profile');
    }
  });

  return router;
};