import Wishlist from './wishlist/index.js'

import verifyAuth from '../../middlewares/verifyAuth.js'
import express from 'express'

export default function () {
  const router = express.Router()

  router.use(verifyAuth())

  router.get('/', (_req, res) => {
    res.send({
      api: true,
    })
  })

  router.use('/wishlist', Wishlist())

  return router
}
