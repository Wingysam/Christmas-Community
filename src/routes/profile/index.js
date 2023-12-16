const verifyAuth = require('../../middlewares/verifyAuth')
const bcrypt = require('bcrypt-nodejs')
const express = require('express')

module.exports = ({ db, config, ensurePfp }) => {
  const router = express.Router()

  router.get('/', verifyAuth(), async (req, res) => {
    await ensurePfp(req.user._id)
    res.render('profile', { title: _CC.lang('PROFILE_TITLE', req.user._id) })
  })

  router.post('/pfp', verifyAuth(), async (req, res) => {
    if (config.pfp) {
      req.user.pfp = req.body.image
      await db.put(req.user)
      if (!req.user.pfp) await ensurePfp(req.user._id)
      req.flash('success', _CC.lang('PROFILE_SAVE_PFP_SUCCESS'))
    } else {
      req.flash('error', _CC.lang('PROFILE_SAVE_PFP_DISABLED'))
    }
    res.redirect(`${_CC.config.base}profile`)
  })

  const INFO_KEYS = [
    'shoeSize', 'ringSize', 'dressSize',
    'sweaterSize', 'shirtSize', 'pantsSize',
    'coatSize', 'hatSize', 'phoneModel'
  ]
  router.post('/info', verifyAuth(), async (req, res) => {
    if (!req.user.info) {
      req.user.info = {}
    }
    for (const [k, v] of Object.entries(req.body)) {
      console.log({ k, v })
      if (!INFO_KEYS.includes(k)) continue
      req.user.info[k] = v
    }
    await db.put(req.user)
    req.flash('success', _CC.lang('PROFILE_UPDATE_INFO_SUCCESS'))
    res.redirect(`${_CC.config.base}profile`)
  })

  router.get('/password', verifyAuth(), async (req, res) => {
    await ensurePfp(req.user._id)
    res.render('profile-password', { title: _CC.lang('PROFILE_PASSWORD_TITLE', req.user._id) })
  })
  router.post('/password', verifyAuth(), (req, res) => {
    if (!req.body.oldPassword) {
      req.flash('error', _CC.lang('PROFILE_PASSWORD_REQUIRED_OLD'))
      return res.redirect(`${_CC.config.base}profile/password`)
    }
    if (!req.body.newPassword) {
      req.flash('error', _CC.lang('PROFILE_PASSWORD_REQUIRED_NEW'))
      return res.redirect(`${_CC.config.base}profile/password`)
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
                  req.flash('success', _CC.lang('PROFILE_PASSWORD_SUCCESS'))
                  res.redirect(`${_CC.config.base}profile/password`)
                })
                .catch(err => { throw err })
            })
            .catch(err => { throw err })
        })
      } else {
        req.flash('error', _CC.lang('PROFILE_PASSWORD_OLD_MISMATCH'))
        res.redirect(`${_CC.config.base}profile/password`)
      }
    })
  })

  return router
}
