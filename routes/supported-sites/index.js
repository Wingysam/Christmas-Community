const express = require('express')

module.exports = () => {
  const router = express.Router()

  router.get('/', async (req, res) => {
    res.render('supported-sites', { title: 'Supported Sites' })
  })

  return router
}
