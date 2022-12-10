const express = require('express')

module.exports = () => {
  const router = express.Router()

  router.get('/', async (req, res) => {
    res.render('supported-sites', { title: _CC.lang('SUPPORTED_SITES_HEADER') })
  })

  return router
}
