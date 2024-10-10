const config = {
  dbPrefix: process.env.DB_PREFIX || 'dbs/',
  defaultFailureRedirect: process.env.DEFAULT_FAILURE_REDIRECT || '/login',
  port: Number(process.env.PORT) || 3000,
  dbExposePort: Number(process.env.DB_EXPOSE_PORT) || null,
  dbLogFile: process.env.DB_LOG_FILE || '/dev/null',
  proxyServer: process.env.PROXY_SERVER || undefined,
  secret: process.env.SECRET || (await import('./secret/index.js')).default,
  sessionMaxAge: Number(process.env.SESSION_MAX_AGE) || 1000 * 60 * 60 * 24 * 7,
  siteTitle: process.env.SITE_TITLE || 'Christmas Community',
  shortTitle: process.env.SHORT_TITLE || 'Christmas',
  wishlist: (await import('./wishlist/index.js')).default,
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
  customCSS: process.env.CUSTOM_CSS || null,
  updateCheck: process.env.UPDATE_CHECK !== 'false',
  googleSSOClientId: process.env.GOOGLE_CLIENT_ID || null,
  googleSSOClientSecret: process.env.GOOGLE_CLIENT_SECRET || null,
  googleSSOEnabled: false,
  googleSignInRedirect: process.env.GOOGLE_SIGNIN_REDIRECT || '/auth/google/redirect',
  googleLinkRedirect: process.env.GOOGLE_LINK_REDIRECT || '/auth/google/link/redirect'
}

if (config.guestPassword) config.wishlist.public = false
if (config.guestPassword === 'ReplaceWithYourGuestPassword') {
  console.error('Error: Guest password should be changed from default.')
  process.exit(1)
}

if (config.googleSSOClientId != null && config.googleSSOClientSecret != null) {
  config.googleSSOEnabled = true
}

export default config
