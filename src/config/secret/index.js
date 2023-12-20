import { nanoid } from 'nanoid'
import path from 'path'
import fs from 'fs'
import mkdirp from 'mkdirp'

const secretFilePath = path.join((process.env.SECRET_DIRNAME ? process.env.SECRET_DIRNAME : 'dbs'), 'secret.txt')

let secret

try {
  secret = fs.readFileSync(secretFilePath).toString()
} catch (_) {
  secret = nanoid(128)
  await mkdirp(path.join(secretFilePath, '..'))
  fs.writeFileSync(secretFilePath, secret)
}

export default secret
