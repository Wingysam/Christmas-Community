const publicRoute = require('../middlewares/publicRoute')
const express = require('express')
const path = require('path')
const fs = require('fs/promises')

module.exports = ({ db, config }) => {
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

  router.use('/', express.static(path.join(__dirname, '../static')))

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

  router.use('/api', require('./api')({ db }))

  router.use('/setup', require('./setup')({ db, ensurePfp }))

  router.use('/login', require('./login')({ ensurePfp }))
  router.use('/logout', require('./logout')())
  router.use('/resetpw', require('./resetpw')(db))
  router.use('/confirm-account', require('./confirm-account')(db))

  router.use('/wishlist', require('./wishlist')(db))
  router.use('/supported-sites', require('./supported-sites')())

  router.use('/profile', require('./profile')({ db, config, ensurePfp }))

  router.use('/admin-settings', require('./adminSettings')({ db, ensurePfp }))

  router.use('/manifest.json', require('./manifest.json')({ config }))

  return router
}
