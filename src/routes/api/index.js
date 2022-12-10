const verifyAuth = require('../../middlewares/verifyAuth')
const express = require('express')

module.exports = ({ db, config }) => {
  const router = express.Router()

  router.use(verifyAuth())

  router.get('/', (req, res) => {
    res.send({
      api: true
    })
  })

  router.use('/wishlist', require('./wishlist')({ db }))

  return router
}
