import verifyAuth from './verifyAuth.js'

const publicMiddleware = () =>
  global._CC.config.wishlist.public
    ? (req, _res, next) => {
        if (!req.user) req.user = { _id: '_CCUNKNOWN' }
        next()
      }
    : verifyAuth()

export default publicMiddleware
