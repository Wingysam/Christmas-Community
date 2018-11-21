require('dotenv').config();
module.exports = {
  dbUrl: process.env.DB_URL || 'db',
  defaultFailureRedirect: process.env.DEFAULT_FAILURE_REDIRECT || '/login',
  port: process.env.PORT || 3000,
  proxyServer: process.env.PROXY_SERVER || undefined,
  secret: process.env.SECRET || require('uuid/v4')(),
  siteTitle: process.env.SITE_TITLE || 'Christmas Community'
};
