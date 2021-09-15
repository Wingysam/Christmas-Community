const verifyAuth = require('../../middlewares/verifyAuth')
const bcrypt = require('bcrypt-nodejs')
const express = require('express')

module.exports = ({ db, ensurePfp }) => {
  const router = express.Router()

  router.get('/', verifyAuth(), async (req, res) => {
    await ensurePfp(req.user._id)
    res.render('profile', { title: `Profile Settings - ${req.user._id}` })
  })
  router.post('/pfp', verifyAuth(), async (req, res) => {
    req.user.pfp = req.body.image
    await db.put(req.user)
    if (!req.user.pfp) await ensurePfp(req.user._id)
    req.flash('success', 'Saved profile picture!')
    res.redirect(`${_CC.config.base}profile`)
  })
  router.post('/password', verifyAuth(), (req, res) => {
    if (!req.body.oldPassword) {
      req.flash('error', 'Old Password is required')
      return res.redirect('/profile/password')
    }
    if (!req.body.newPassword) {
      req.flash('error', 'New Password is required')
      return res.redirect('/profile/password')
    }
    bcrypt.compare(req.body.oldPassword, req.user.password, (err, correct) => {
      if (err) throw err
      if (correct) {
        bcrypt.hash(req.body.newPassword, null, null, (err, hash) => {
          if (err) throw err
          db.get(req.user._id)
            .then(doc => {
              doc.password = hash
              db.put(doc)
                .then(() => {
                  req.flash('success', 'Changes saved successfully!')
                  res.redirect('/profile/password')
                })
                .catch(err => { throw err })
            })
            .catch(err => { throw err })
        })
      } else {
        req.flash('error', 'Incorrect old password')
        res.redirect('/profile/password')
      }
    })
  })

  return router
}
