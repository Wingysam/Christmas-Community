const verifyAuth = require('./verifyAuth')

const publicMiddleware = () => global._CC.config.wishlist.public
  ? (req, res, next) => {
      if (!req.user) req.user = { _id: '_CCUNKNOWN' }
      next()
    }
  : verifyAuth()

module.exports = publicMiddleware
