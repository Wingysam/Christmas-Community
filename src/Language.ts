import * as nativeLanguage from './languages/en-us.js'
import config from './config/index.js'

let language
try {
  language = await import(`./languages/${config.language}.js`)
} catch (error) {
  if (error.message.startsWith('Cannot find module')) console.error(`Language ${config.language} is not supported. If you know this language and would like to translate Christmas Community, please ask for help doing so here: https://github.com/Wingysam/Christmas-Community/issues/new`)
  else console.error(`Failed to load language ${config.language} because of ${error}`)
  process.exit(1)
}

if (_CC.moment.locale(language.momentLocale) !== language.momentLocale) {
  console.error(`${_CC.moment.locale()} Failed to load language ${config.language}, moment locale missing. Valid locales: ${_CC.moment.locales().join(', ')}`)
  process.exit(1)
}

export default function lang (key, ...args) {
  const lang = language.strings[key]
  if (!lang) {
    const nativeString = nativeLanguage.strings[key] ?? key
    if (language.notTranslated) return language.notTranslated(nativeString)
    return nativeString
  }
  if (typeof lang === 'function') return lang(...args)
  return lang
}
