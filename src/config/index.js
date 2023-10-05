require('dotenv').config()

module.exports = {
  dbPrefix: process.env.DB_PREFIX || 'dbs/',
  defaultFailureRedirect: process.env.DEFAULT_FAILURE_REDIRECT || '/login',
  port: Number(process.env.PORT) || 3000,
  dbExposePort: Number(process.env.DB_EXPOSE_PORT) || null,
  proxyServer: process.env.PROXY_SERVER || undefined,
  secret: process.env.SECRET || require('./secret'),
  sessionMaxAge: Number(process.env.SESSION_MAX_AGE) || 1000 * 60 * 60 * 24 * 7,
  siteTitle: process.env.SITE_TITLE || 'Christmas Community',
  shortTitle: process.env.SHORT_TITLE || 'Christmas',
  wishlist: require('./wishlist'),
  base: (process.env.ROOT_PATH || '/').endsWith('/') ? (process.env.ROOT_PATH || '/') : `${process.env.ROOT_PATH}/`,
  trustProxy: process.env.TRUST_PROXY === 'true' ? true : process.env.TRUST_PROXY || 'loopback',
  bulmaswatch: (process.env.BULMASWATCH || 'default').toLowerCase(),
  pfp: process.env.PFP !== 'false',
  language: process.env.LANGUAGE?.toLowerCase() || 'en-us',
  guestPassword: process.env.GUEST_PASSWORD,
  customHtml: {
    wishlists: process.env.CUSTOM_HTML_WISHLISTS,
    login: process.env.CUSTOM_HTML_LOGIN
  },
  customCSS: process.env.CUSTOM_CSS || null
}

if (module.exports.guestPassword) module.exports.wishlist.public = false
if (module.exports.guestPassword === 'ReplaceWithYourGuestPassword') {
  console.error('Error: Guest password should be changed from default.')
  process.exit(1)
}