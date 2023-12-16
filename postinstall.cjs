const fs = require('fs')

if (process.platform !== 'win32') {
  fs.symlink('../../../node_modules/bulmaswatch', './src/static/libraries/bulmaswatch', (err) => {
    if (err) console.log(err)
  })
} else {
  console.log('\x1b[31m[MANUAL ACTION REQUIRED]\x1b[0m')
  console.log('Windows requires elevated permissions to create symbolic links used by the project.\n', 'Open a Powershell terminal as an Administrator and run the following commands: ')
  console.log('\n      cd ', __dirname, '\n', String.raw`     New-Item -Path .\src\static\libraries\bulmaswatch -ItemType SymbolicLink -Value .\node_modules\bulmaswatch`, '\n')
}
