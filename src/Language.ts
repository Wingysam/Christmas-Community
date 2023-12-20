import fs from 'fs/promises'

import * as nativeLanguage from './languages/en-us.js'
import config from './config/index.js'

const validLanguages = (await fs.readdir('built/languages'))
  .map(languageFilename => languageFilename.split('.js')[0])

if (!validLanguages.includes(config.language)) {
  console.error(`Language ${config.language} is not supported. If you know this language and would like to translate Christmas Community, please ask for help doing so here: https://github.com/Wingysam/Christmas-Community/issues/new\nSupported languages: ${validLanguages.join(', ')}`)
  process.exit(1)
}

const language = await import(`./languages/${config.language}.js`)

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
