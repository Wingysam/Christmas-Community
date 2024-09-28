import _ from 'lodash'
import fs from 'fs/promises'
import moment from '../node_modules/moment/min/moment-with-locales.js'
import GetProductData from 'get-product-name'

const CC = {
  _,
  moment,
  GetProductData
} as any

;(global as any)._CC = CC

CC.packageJson = JSON.parse(await fs.readFile('package.json', 'utf-8'))

CC.config = (await import('./config/index.js')).default
CC.lang = (await import ('./Language.js')).default

const PouchDB = (await import('./PouchDB.js')).default
CC.usersDb = new PouchDB('users')

const { WishlistManager } = await import('./structures/WishlistManager.js')
CC.wishlistManager = new WishlistManager()

CC.updateNotice = (await import('./UpdateNotice.js')).default

export default CC
