import publicRoute from '../middlewares/publicRoute.js'
import express from 'express'
import path from 'path'
import fs from 'fs/promises'
import ensurePfp from '../utils/ensurePfp.js'

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
import OIDC from './oidc/index.js'

export default ({ db, config }) => {
  ;(async () => {
    const { rows } = await db.allDocs({ include_docs: true })
    for (const row of rows) {
      await ensurePfp(db, config, row.id)
    }
  })()

  const router = express.Router()

  router.use('/', express.static(path.resolve('./src/static')))

  router.get(
    '/',
    async (_req, res, next) => {
      const dbInfo = await db.info()
      if (dbInfo.doc_count === 0) {
        res.redirect('/setup')
      } else {
        next()
      }
    },
    publicRoute(),
    (_req, res) => {
      res.redirect('/wishlist')
    },
  )

  router.use('/api', Api())

  router.use('/setup', Setup({ db, ensurePfp: (username) => ensurePfp(db, config, username) }))

  router.use('/login', Login({ config }))
  router.use('/logout', Logout())
  router.use('/resetpw', ResetPw(db))
  router.use('/confirm-account', ConfirmAccount(db))

  router.use('/wishlist', Wishlist(db))
  router.use('/supported-sites', SupportedSites())

  router.use('/profile', Profile({ db, config, ensurePfp: (username) => ensurePfp(db, config, username) }))

  router.use('/admin-settings', AdminSettings({ db, ensurePfp: (username) => ensurePfp(db, config, username) }))

  router.use('/manifest.json', ManifestJson({ config }))

  router.use('/auth/oidc', OIDC({ db }))

  return router
}
