const verifyAuth = require('../../middlewares/verifyAuth')
const express = require('express')

module.exports = () => {
  const router = express.Router()

  router.get('/', verifyAuth(), (req, res) => res.render('logout'))
  router.post('/', (req, res) => {
    req.logout()
    res.redirect('/')
  })

  return router
}
