import Wishlist from './wishlist/index.js'

import verifyAuth from '../../middlewares/verifyAuth.js'
import express from 'express'

export default function ({ db, config }) {
  const router = express.Router()

  router.use(verifyAuth())

  router.get('/', (req, res) => {
    res.send({
      api: true
    })
  })

  router.use('/wishlist', Wishlist({ db }))

  return router
}
