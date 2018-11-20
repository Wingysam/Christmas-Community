const config = require('../config');
module.exports = (req, res, next) => {
  res.locals.successes = req.flash('success');
  res.locals.errors = req.flash('error');
  res.locals.config = config;
  res.locals.req = req;
  next();
};
