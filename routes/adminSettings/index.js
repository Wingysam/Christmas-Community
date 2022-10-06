const verifyAuth = require('../../middlewares/verifyAuth')
const express = require('express')
const { nanoid } = require('nanoid')

const SECRET_TOKEN_LENGTH = 32
const SECRET_TOKEN_LIFETIME =
  // One week, approximately. Doesn't need to be perfect.
  1000 * // milliseconds
  60 * // seconds
  60 * // minutes
  24 * // hours
  7 // days

module.exports = ({ db, ensurePfp }) => {
  const router = express.Router()

  router.get('/', verifyAuth(), (req, res) => {
    if (!req.user.admin) return res.redirect('/')
    db.allDocs({ include_docs: true })
      .then(docs => {
        res.render('adminSettings', { title: _CC.lang('ADMIN_SETTINGS_HEADER'), users: docs.rows })
      })
      .catch(err => { throw err })
  })

  router.post('/add', verifyAuth(), async (req, res) => {
    if (!req.user.admin) return res.redirect('/')

    const username = req.body.newUserUsername.trim()
    if (!username) {
      return db
          .allDocs({ include_docs: true })
          .then((docs) => {
            res.render("adminSettings", {
                add_user_error: _CC.lang(
                    "ADMIN_SETTINGS_USERS_ADD_ERROR_USERNAME_EMPTY"
                ),
                title: _CC.lang("ADMIN_SETTINGS_HEADER"),
                users: docs.rows,
            });
          })
          .catch((err) => {
              throw err;
          });
    }

    await db.put({
      _id: username,
      admin: false,
      wishlist: [],

      signupToken: nanoid(SECRET_TOKEN_LENGTH),
      expiry: new Date().getTime() + SECRET_TOKEN_LIFETIME
    })
    await ensurePfp(username)
    res.redirect(`/admin-settings/edit/${req.body.newUserUsername.trim()}`)
  })

  router.get('/edit/:userToEdit', verifyAuth(), async (req, res) => {
    if (!req.user.admin) return res.redirect('/')
    const doc = await db.get(req.params.userToEdit)
    delete doc.password
    res.render('admin-user-edit', { user: doc })
  })

  router.post('/edit/refresh-signup-token/:userToEdit', verifyAuth(), async (req, res) => {
    if (!req.user.admin) return res.redirect('/')
    const doc = await db.get(req.params.userToEdit)
    doc.signupToken = nanoid(SECRET_TOKEN_LENGTH)
    doc.expiry = new Date().getTime() + SECRET_TOKEN_LIFETIME
    await db.put(doc)
    return res.redirect(`/admin-settings/edit/${req.params.userToEdit}`)
  })

  router.post('/edit/resetpw/:userToEdit', verifyAuth(), async (req, res) => {
    if (!req.user.admin) return res.redirect('/')
    const doc = await db.get(req.params.userToEdit)
    doc.pwToken = nanoid(SECRET_TOKEN_LENGTH)
    doc.pwExpiry = new Date().getTime() + SECRET_TOKEN_LIFETIME
    await db.put(doc)
    return res.redirect(`/admin-settings/edit/${req.params.userToEdit}`)
  })

  router.post('/edit/cancelresetpw/:userToEdit', verifyAuth(), async (req, res) => {
    if (!req.user.admin) return res.redirect('/')
    const doc = await db.get(req.params.userToEdit)
    delete doc.pwToken
    delete doc.pwExpiry
    await db.put(doc)
    return res.redirect(`/admin-settings/edit/${req.params.userToEdit}`)
  })

  router.post('/edit/rename/:userToRename', verifyAuth(), async (req, res) => {
    if (!req.user.admin && req.user._id !== req.params.userToRename) return res.redirect('/')
    if (!req.body.newUsername) {
      req.flash('error', _CC.lang('ADMIN_SETTINGS_USERS_EDIT_NO_USERNAME_PROVIDED'))
      return res.redirect(`/admin-settings/edit/${req.params.userToRename}`)
    }
    if (req.body.newUsername === req.params.userToRename) {
      req.flash('error', _CC.lang('ADMIN_SETTINGS_USERS_EDIT_SAME_NAME'))
      return res.redirect(`/admin-settings/edit/${req.params.userToRename}`)
    }

    const oldName = req.params.userToRename
    const newName = req.body.newUsername

    const userDoc = await db.get(oldName)
    userDoc._id = newName
    delete userDoc._rev
    try {
      await db.put(userDoc)
      try {
        const usersBulk = []
        const users = (await db.allDocs({ include_docs: true })).rows
        for (const { doc: user } of users) {
          for (const item of user.wishlist) {
            if (item.pledgedBy === oldName) item.pledgedBy = newName
            if (item.addedBy === oldName) item.addedBy = newName
          }
          usersBulk.push(user)
        }

        await db.bulkDocs(usersBulk)
        await db.remove(await db.get(oldName))

        req.flash('success', _CC.lang('ADMIN_SETTINGS_USERS_EDIT_RENAMED_USER'))
        return res.redirect(`/wishlist/${newName}`)
      } catch (error) {
        console.log(error, error.stack)
        await db.remove(await db.get(newName))
        throw error
      }
    } catch (error) {
      req.flash('error', error.message)
      return res.redirect(`/admin-settings/edit/${oldName}`)
    }
  })

  router.post('/edit/impersonate/:userToEdit', verifyAuth(), async (req, res) => {
    if (!req.user.admin) return res.redirect('/')
    req.login({ _id: req.params.userToEdit }, err => {
      if (err) {
        req.flash('error', err.message)
        return res.redirect(`/admin-settings/edit/${req.params.userToEdit}`)
      }
      req.flash('success', _CC.lang('ADMIN_SETTINGS_USERS_EDIT_IMPERSONATE_SUCCESS', req.params.userToEdit))
      res.redirect('/')
    })
  })

  router.post('/edit/promote/:userToPromote', verifyAuth(), async (req, res) => {
    if (!req.user.admin) return res.redirect('/')
    const user = await db.get(req.params.userToPromote)
    if (!user) {
      req.flash('error', _CC.lang('ADMIN_SETTINGS_USERS_EDIT_PROMOTE_DEMOTE_NOT_FOUND'))
      return res.redirect(`/admin-settings/edit/${req.params.userToPromote}`)
    }
    if (user.admin) {
      req.flash('error', _CC.lang('ADMIN_SETTINGS_USERS_EDIT_PROMOTE_ALREADY_ADMIN'))
      return res.redirect(`/admin-settings/edit/${req.params.userToPromote}`)
    }

    user.admin = true
    await db.put(user)

    req.flash('success', _CC.lang('ADMIN_SETTINGS_USERS_EDIT_PROMOTE_SUCCESS', user._id))
    return res.redirect(`/admin-settings/edit/${req.params.userToPromote}`)
  })

  router.post('/edit/demote/:userToDemote', verifyAuth(), async (req, res) => {
    if (!req.user.admin) return res.redirect('/')
    if (req.user._id === req.params.userToDemote) {
      req.flash('error', _CC.lang('ADMIN_SETTINGS_USERS_EDIT_DEMOTE_SELF'))
      return res.redirect(`/admin-settings/edit/${req.params.userToDemote}`)
    }

    const user = await db.get(req.params.userToDemote)

    if (!user) {
      req.flash('error', _CC.lang('ADMIN_SETTINGS_USERS_EDIT_PROMOTE_DEMOTE_NOT_FOUND'))
      return res.redirect(`/admin-settings/edit/${req.params.userToDemote}`)
    }
    if (!user.admin) {
      req.flash('error', _CC.lang('ADMIN_SETTINGS_USERS_EDIT_DEMOTE_NOT_ADMIN'))
      return res.redirect(`/admin-settings/edit/${req.params.userToDemote}`)
    }

    user.admin = false
    await db.put(user)

    req.flash('success', _CC.lang('ADMIN_SETTINGS_USERS_EDIT_DEMOTE_SUCCESS', user._id))
    return res.redirect(`/admin-settings/edit/${req.params.userToDemote}`)
  })

  router.post('/edit/remove/:userToRemove', verifyAuth(), async (req, res) => {
    if (!req.user.admin) return res.redirect('/')
    const doc = await db.get(req.params.userToRemove)
    if (doc.admin) {
      req.flash('error', _CC.lang('ADMIN_SETTINGS_USERS_EDIT_DELETE_FAIL_ADMIN'))
      return res.redirect('/admin-settings')
    }
    await db.remove(doc)
    const { rows } = await db.allDocs({ include_docs: true })
    for (let i = 0; i < rows.length; i++) {
      for (let j = 0; j < rows[i].doc.wishlist.length; j++) {
        if (rows[i].doc.wishlist[j].pledgedBy === req.params.userToRemove) {
          rows[i].doc.wishlist[j].pledgedBy = undefined
          if (rows[i].doc.wishlist[j].addedBy === req.params.userToRemove) rows[i].doc.wishlist.splice(j, 1)
          await db.put(rows[i].doc)
        }
      }
    }
    req.flash('success', _CC.lang('ADMIN_SETTINGS_USERS_EDIT_DELETE_SUCCESS', req.params.userToRemove))
    res.redirect('/admin-settings')
  })

  router.get('/clear-wishlists', verifyAuth(), async (req, res) => {
    if (!req.user.admin) return res.redirect('/')
    res.render('admin-clear-wishlists')
  })

  router.post('/clear-wishlists', verifyAuth(), async (req, res) => {
    if (!req.user.admin) return res.redirect('/')
    const { rows } = await db.allDocs({ include_docs: true })
    for (const row of rows) {
      row.doc.wishlist = []
      await db.put(row.doc)
    }
    req.flash('success', _CC.lang('ADMIN_SETTINGS_CLEARDB_SUCCESS'))
    res.redirect('/admin-settings')
  })

  return router
}
