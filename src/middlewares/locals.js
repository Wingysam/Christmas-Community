const config = require('../config')

module.exports = (req, res, next) => {
  res.locals.config = config
  res.locals.req = req
  res.locals.lang = _CC.lang
  next()
}
