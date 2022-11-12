const chalk = require('chalk')
const colors = { log: 'blue', success: 'green', error: 'red', warn: 'yellow' }

Object.keys(colors).forEach(
  method => // eslint-disable-line no-return-assign
    module.exports[method] =
      (type, msg) =>
        console.log(chalk.keyword(colors[method])(`[ ${type.toUpperCase()} ] ${msg}`))
)
