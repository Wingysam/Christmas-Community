const config = require('../config')
module.exports = (req, res, next) => {
  res.locals.config = config
  res.locals.req = req
  next()
}
