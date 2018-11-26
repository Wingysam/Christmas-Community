require('dotenv').config();

const yesNo = require('yes-no');

module.exports = {
  dbUrl: process.env.DB_URL || 'db',
  defaultFailureRedirect: process.env.DEFAULT_FAILURE_REDIRECT || '/login',
  port: process.env.PORT || 3000,
  proxyServer: process.env.PROXY_SERVER || undefined,
  secret: process.env.SECRET || require('./secret'),
  sessionMaxAge: Number(process.env.SESSION_MAX_AGE) || 1000 * 60 * 60 * 24 * 7,
  siteTitle: process.env.SITE_TITLE || 'Christmas Community',
  useCDN: yesNo.parse(process.env.USE_CDN || true)
};
