import chalk from 'chalk'
const colors = {
  log: 'blue',
  success: 'green',
  error: 'red',
  warn: 'yellow'
} as const

const Logger: { [p in keyof typeof colors]: (type, msg) => void } = Object.fromEntries(
  Object.entries(colors).map(([method, color]) => {
    return [method, function (type, msg) {
      console.log(chalk.keyword(color)(`[ ${type.toUpperCase()} ] ${msg}`))
    }]
  })
) as any

export default Logger
