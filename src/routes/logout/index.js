import verifyAuth from '../../middlewares/verifyAuth.js'
import express from 'express'

export default function () {
  const router = express.Router()

  router.get('/', verifyAuth(), (req, res) => res.render('logout'))
  router.post('/', (req, res) => {
    req.logout()
    res.redirect('/')
  })

  return router
}
