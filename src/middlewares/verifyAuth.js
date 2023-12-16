const ROUGHLY_ONE_YEAR_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 30 * 12
const COOKIE_NAME = 'christmas_community.guestpassword'

export default function (options) {
  return (req, res, next) => {
    options = options || {}
    let authed = false
    try {
      authed = req.isAuthenticated()
    } catch {
      return res.send('auth fail')
    }
    if (authed) return next()
    if (_CC.config.guestPassword && (req.query.pw === _CC.config.guestPassword || req.cookies[COOKIE_NAME] === _CC.config.guestPassword)) {
      req.user = {
        _id: '_CCUNKNOWN'
      }
      res.cookie(COOKIE_NAME, _CC.config.guestPassword, { maxAge: ROUGHLY_ONE_YEAR_IN_MILLISECONDS })
      return next()
    }
    res.redirect(options.failureRedirect || _CC.config.defaultFailureRedirect)
  }
}
