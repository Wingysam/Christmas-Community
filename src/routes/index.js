import publicRoute from '../middlewares/publicRoute.js'
import express from 'express'
import path from 'path'
import fs from 'fs/promises'

import Api from './api/index.js'
import Setup from './setup/index.js'
import Login from './login/index.js'
import Logout from './logout/index.js'
import ResetPw from './resetpw/index.js'
import ConfirmAccount from './confirm-account/index.js'
import Wishlist from './wishlist/index.js'
import SupportedSites from './supported-sites/index.js'
import Profile from './profile/index.js'
import AdminSettings from './adminSettings/index.js'
import ManifestJson from './manifest.json/index.js'

export default ({ db, config }) => {
  async function ensurePfp (username) {
    if (!config.pfp) return
    const user = await db.get(username)
    if (user.pfp) return

    const { rows } = await db.allDocs({ include_docs: true })

    const unfilteredPool = await fs.readdir('src/static/img/default-pfps')
    const filteredPool = unfilteredPool.filter(file => !rows.find(row => row.doc.pfp === `${_CC.config.base}img/default-pfps/${file}`))
    const pool = filteredPool.length ? filteredPool : unfilteredPool

    user.pfp = `${_CC.config.base}img/default-pfps/${_CC._.sample(pool)}`
    await db.put(user)
  }

  ;(async () => {
    const { rows } = await db.allDocs({ include_docs: true })
    for (const row of rows) {
      await ensurePfp(row.id)
    }
  })()

  const router = express.Router()

  router.use('/', express.static(path.resolve('./src/static')))

  router.get('/',
    async (req, res, next) => {
      const dbInfo = await db.info()
      if (dbInfo.doc_count === 0) {
        res.redirect('/setup')
      } else {
        next()
      }
    },
    publicRoute(),
    (req, res) => {
      res.redirect('/wishlist')
    }
  )

  router.use('/api', Api({ db }))

  router.use('/setup', Setup({ db, ensurePfp }))

  router.use('/login', Login({ ensurePfp }))
  router.use('/logout', Logout())
  router.use('/resetpw', ResetPw(db))
  router.use('/confirm-account', ConfirmAccount(db))

  router.use('/wishlist', Wishlist(db))
  router.use('/supported-sites', SupportedSites())

  router.use('/profile', Profile({ db, config, ensurePfp }))

  router.use('/admin-settings', AdminSettings({ db, ensurePfp }))

  router.use('/manifest.json', ManifestJson({ config }))

  return router
}
