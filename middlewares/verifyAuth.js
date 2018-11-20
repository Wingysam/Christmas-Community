const config = require('../config');
module.exports = options => {
  return (req, res, next) => {
    options = options ? options : {};
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect(options.failureRedirect || config.defaultFailureRedirect);
    }
  };
}