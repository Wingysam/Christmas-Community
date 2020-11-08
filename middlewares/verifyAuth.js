const config = require('../config')
module.exports = options => {
  return (req, res, next) => {
    options = options || {}
    let authed = false
    try {
      authed = req.isAuthenticated()
    } catch {
      return res.send('auth fail')
    }
    if (authed) return next()
    res.redirect(options.failureRedirect || config.defaultFailureRedirect)
  }
}
