import bcrypt from 'bcrypt-nodejs'
import express from 'express'

export default function ({ db, ensurePfp }) {
  const router = express.Router()

  router.get('/',
    async (req, res) => {
      const dbInfo = await db.info()
      if (dbInfo.doc_count === 0) {
        res.render('setup', { title: _CC.lang('SETUP_HEADER') })
      } else {
        res.redirect('/')
      }
    }
  )

  router.post('/',
    async (req, res) => {
      const dbInfo = await db.info()
      if (dbInfo.doc_count === 0) {
        const username = req.body.adminUsername.trim()
        await new Promise((resolve, reject) => {
          bcrypt.hash(req.body.adminPassword, null, null, (err, adminPasswordHash) => {
            if (err) throw err
            db.put({
              _id: username,
              password: adminPasswordHash,
              admin: true,
              wishlist: [],
              oauthConnections: {},
              pledgeOnly: false
            })
            resolve()
          })
        })
        await ensurePfp(username)
      }

      res.redirect('/')
    }
  )

  return router
}
