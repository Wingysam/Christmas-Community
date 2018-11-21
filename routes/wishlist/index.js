const verifyAuth = require('../../middlewares/verifyAuth');
const getProductName = require('get-product-name');
const bcrypt = require('bcrypt-nodejs');
const express = require('express');
const config = require('../../config');
const uuid = require('uuid/v4');

const totals = wishlist => {
  let unpledged = 0;
  let pledged = 0;
  wishlist.forEach(wishItem => {
    if (wishItem.pledgedBy) pledged += 1;
    else unpledged += 1;
  });
  return { unpledged, pledged };
};

const ValidURL = (string) => { // Ty SO
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;  
  }
}

module.exports = (db) => {
  const router = express.Router();

  router.get('/', verifyAuth(), async (req, res) => {
    const docs = await db.allDocs({ include_docs: true })
    res.render('wishlists', { title: 'Wishlists', users: docs.rows, totals})
  });

  router.get('/:user', verifyAuth(), async (req, res) => {
    try {
      const dbUser = await db.get(req.params.user);
      res.render('wishlist', { title: `Wishlist - ${dbUser._id}`, wishlist: dbUser.wishlist });
    } catch (error) {
      res.redirect('/wishlist');
    }
  });

  router.post('/:user', verifyAuth(), async (req, res) => {
    const isUrl = ValidURL(req.body.itemUrlOrName);
    const item = {};
    let productData;
    try {
      if (isUrl) productData = await getProductName(req.body.itemUrlOrName, config.proxyServer);
    } catch (err) {}
    item.name = (productData ? productData.name : req.body.itemUrlOrName);
    item.addedBy = req.user._id;
    item.pledgedBy = (req.user._id === req.params.user ? undefined : req.user._id);
    if (isUrl) item.url = req.body.itemUrlOrName;
    item.id = uuid();
    const doc = await db.get(req.params.user);
    doc.wishlist.push(item);
    await db.put(doc);
    req.flash('success', (req.user._id === req.params.user ? 'Added item to wishlist' : `Pleged item for ${req.params.user}`));
    res.redirect(`/wishlist/${req.params.user}`);
  });

  router.post('/:user/pledge/:itemId', verifyAuth(), async (req, res) => {
    const docs = await db.allDocs({ include_docs: true });
    for (let i = 0; i < docs.rows.length; i++) {
      for (let j = 0; j < docs.rows[i].doc.wishlist.length; j++) {
        if (docs.rows[i].doc.wishlist[j].id === req.params.itemId) {
          if (docs.rows[i].doc.wishlist[j].pledgedBy !== undefined) {
            req.flash('error', 'Item already pledged for');
            return res.redirect(`/wishlist/${req.params.user}`);            
          }
          docs.rows[i].doc.wishlist[j].pledgedBy = req.user._id;
          await db.put(docs.rows[i].doc);
          req.flash('success', 'Successfully pledged for item!');
          return res.redirect(`/wishlist/${req.params.user}`);
        }
      }
    }
  });
  router.post('/:user/unpledge/:itemId', verifyAuth(), async (req, res) => {
    const docs = await db.allDocs({ include_docs: true });
    for (let i = 0; i < docs.rows.length; i++) {
      for (let j = 0; j < docs.rows[i].doc.wishlist.length; j++) {
        if (docs.rows[i].doc.wishlist[j].id === req.params.itemId) {
          if (docs.rows[i].doc.wishlist[j].pledgedBy !== req.user._id) {
            req.flash('error', 'You did not pledge for this');
            return res.redirect(`/wishlist/${req.params.user}`);            
          }
          docs.rows[i].doc.wishlist[j].pledgedBy = undefined;
          if (docs.rows[i].doc.wishlist[j].addedBy === req.user._id) docs.rows[i].doc.wishlist.pop(j);
          await db.put(docs.rows[i].doc);
          req.flash('success', 'Successfully unpledged for item');
          return res.redirect(`/wishlist/${req.params.user}`);
        }
      }
    }
    req.flash('error', 'Failed to find item');
    return res.redirect(`/wishlist/${req.params.user}`);
  });

  router.post('/:user/remove/:itemId', verifyAuth(), async (req, res) => {
    if (req.user._id !== req.params.user) {
      req.flash('error', 'Not correct user');
      return res.redirect(`/wishlists/${req.params.user}`);
    }
    const doc = await db.get(req.user._id);
    for (let i = 0; i < doc.wishlist.length; i++) {
      if (doc.wishlist[i].id === req.params.itemId) {
        doc.wishlist.pop(i);
        await db.put(doc);
        req.flash('success', 'Successfully removed from wishlist');
        return res.redirect(`/wishlist/${req.params.user}`);
      }
    }
    req.flash('error', 'Failed to find item');
    return res.redirect(`/wishlist/${req.params.user}`);
  });

  return router;
};