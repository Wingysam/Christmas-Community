const { nanoid } = require('nanoid')
const path = require('path')
const fs = require('fs')

const secretFilePath = path.join((process.env.SECRET_DIRNAME ? process.env.SECRET_DIRNAME : __dirname), 'secret.txt')

try {
  module.exports = fs.readFileSync(secretFilePath).toString()
} catch (_) {
  const secret = nanoid(128)
  fs.writeFileSync(secretFilePath, secret)
  module.exports = secret
}
