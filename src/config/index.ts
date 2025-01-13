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
  oidcIssuer: process.env.OIDC_ISSUER || 'https://accounts.google.com',
  oidcAuthorizationURL: process.env.OIDC_AUTHORIZATION_URL || 'https://accounts.google.com/o/oauth2/auth',
  oidcTokenURL: process.env.OIDC_TOKEN_URL || 'https://oauth2.googleapis.com/token',
  oidcUserInfoURL: process.env.OIDC_USERINFO_URL || null,
  oidcClientId: process.env.OIDC_CLIENT_ID || process.env.GOOGLE_CLIENT_ID || null,
  oidcClientSecret: process.env.OIDC_CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET || null,
  oidcProviderName: process.env.OIDC_PROVIDER_NAME || 'Google',
  oidcEnabled: false,
  rootUrl: appendSlash(process.env.ROOT_URL ?? process.env.ROOT_PATH ?? '/'),
  base: '' // automatically set below
}

if (config.guestPassword) config.wishlist.public = false
if (config.guestPassword === 'ReplaceWithYourGuestPassword') {
  console.error('Error: Guest password should be changed from default.')
  process.exit(1)
}

if ( config.oidcClientId != null && config.oidcClientSecret != null ) {
  config.oidcEnabled = true
}

// The base path is used in HTML templates rather than the fully qualified path, mostly for legacy reasons. It also has the following advantages:
//  * It saves a tiny amount of bandwidth.
//  * It allows the admin to deploy to multiple subdomains. This isn't really supported, but it's nice if the admin migrates domains on the same path (typically /), and can keep the old one around because users won't migrate immediately.
// This used to be set with ROOT_PATH, but is now calculated based on ROOT_URL, which falls back to the former if unset.
// rootUrl may be a fully-qualified `https://domain/path/`-style value, or may simply be `/`, or a subpath.
try {
  config.base = new URL(config.rootUrl).pathname
} catch {
  config.base = config.rootUrl
}

function appendSlash (path: string) {
  if (path.endsWith('/')) return path
  return path + '/'
}

export default config
