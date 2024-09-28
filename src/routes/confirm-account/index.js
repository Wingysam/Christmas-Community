import bcrypt from 'bcrypt-nodejs'
import express from 'express'

export default function (db) {
  const router = express.Router()

  router.get('/:code', async (req, res) => {
    const row = (await db.allDocs({ include_docs: true }))
      .rows
      .find(({ doc }) => doc.signupToken === req.params.code)

    res.render('confirm-account', { doc: row ? row.doc : undefined })
  })

  router.post('/:code', async (req, res) => {
    const { doc } = (await db.allDocs({ include_docs: true }))
      .rows
      .find(({ doc }) => doc.signupToken === req.params.code)

    if (doc.expiry < new Date().getTime()) return res.redirect(`/confirm-account/${req.params.code}`)

    bcrypt.hash(req.body.password, null, null, async (err, passwordHash) => {
      if (err) throw err

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
        req.flash('success', _CC.lang('CONFIRM_ACCOUNT_SUCCESS'))
        res.redirect('/')
      })
    })
  })

  return router
}
