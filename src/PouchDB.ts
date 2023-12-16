import PouchDB from 'pouchdb'
import config from './config/index.js'

export default PouchDB.defaults({
  prefix: config.dbPrefix
})
