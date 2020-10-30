const bcrypt = require('bcrypt-nodejs');
const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  router.get('/:code', async (req, res) => {
    const { doc } = (await db.allDocs({ include_docs: true }))
      .rows
      .find(({ doc }) => doc.signupToken === req.params.code)

    res.render('confirm-account', { doc })
  });

  router.post('/:code', async (req, res) => {
    const { doc } = (await db.allDocs({ include_docs: true }))
      .rows
      .find(({ doc }) => doc.signupToken === req.params.code)

    if (doc.expiry < new Date().getTime()) return res.redirect(`/confirm-account/${req.params.code}`)

    bcrypt.hash(req.body.password, null, null, async (err, passwordHash) => {
      if (err) throw err;

      doc.password = passwordHash
      delete doc.signupToken
      delete doc.expiry

      await db.put(doc)

      req.login({ _id: doc._id }, err => {
        if (err) {
          console.log(err)
          req.flash('error', err.message)
          return res.redirect('/')
        }
        req.flash('success', `Welcome to ${_CC.config.siteTitle}!`);
        res.redirect('/');
      })
    });
  });

  return router;
};