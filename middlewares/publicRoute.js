const verifyAuth = require('./verifyAuth')

const publicMiddleware = () => process.env.LISTS_PUBLIC === 'true'
  ? (req, res, next) => {
      if (!req.user) req.user = { _id: 'Unknown' }
      next()
    }
  : verifyAuth()

module.exports = publicMiddleware
