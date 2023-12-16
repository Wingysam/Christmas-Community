import express from 'express'

export default function ({ config }) {
  const router = express.Router()

  router.get('/', (req, res) => {
    res.send({
      name: config.siteTitle,
      short_name: config.shortTitle,
      background_color: 'white',
      description: 'Sleek Wishlist App',
      theme_color: '#dc5878',
      start_url: '/',
      display: 'standalone',
      icons: [
        {
          sizes: '1280x1280',
          src: `${_CC.config.base}img/logo.png`
        }
      ]
    })
  })

  return router
}
