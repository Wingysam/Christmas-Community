const verifyAuth = require('../../middlewares/verifyAuth');
const bcrypt = require('bcrypt-nodejs');
const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  router.get('/', verifyAuth(), (req, res) => {
    if (!req.user.admin) return res.redirect('/');
    db.allDocs({ include_docs: true })
      .then(docs => {
        res.render('adminSettings', { title: 'Admin Settings', users: docs.rows })
      })
      .catch(err => { throw err; });
  });

  router.post('/add', verifyAuth(), async (req, res) => {
    if (!req.user.admin) return res.redirect('/');
    bcrypt.hash(req.body.newUserPassword, null, null, async (err, newUserPasswordHash) => {
      if (err) throw err;
      await db.put({
        _id: req.body.newUserUsername.trim(),
        password: newUserPasswordHash,
        admin: false,
        wishlist: []
      });
      req.flash('success', `Successfully added user ${req.body.newUserUsername.trim()}!`);
      res.redirect('/admin-settings');
    });
  });

  router.get('/remove/:userToRemove', verifyAuth(), (req, res) => {
    if (!req.user.admin) return res.redirect('/');
    res.render('remove', { userToRemove: req.params.userToRemove });
  });

  router.post('/remove/:userToRemove', verifyAuth(), async (req, res) => {
    if (!req.user.admin) return res.redirect('/');
    const doc = await db.get(req.params.userToRemove);
    if (doc.admin) {
      req.flash('error', 'Failed to remove: user is admin.');
      return res.redirect('/admin-settings');
    }
    await db.remove(doc);
    const docs = await db.allDocs({ include_docs: true });
    for (let i = 0; i < docs.length; i++) {
      for (let j = 0; j < docs[i].doc.wishlist.length; j++) {
        if (docs[i].doc.wishlist[j].pledgedBy === req.params.userToRemove) {
          docs[i].doc.wishlist[j].pledgedBy === undefined;
          if (docs[i].doc.wishlist[j].addedBy === req.params.userToRemove) await db.remove(doc);
          else await db.put(docs[i].doc);
        }
      }
    }
    req.flash('success', `Successfully removed user ${req.params.userToRemove}`);
    res.redirect('/admin-settings')
  });

  return router;
};