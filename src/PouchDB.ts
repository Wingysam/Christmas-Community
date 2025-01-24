import PouchDB from 'pouchdb'
import config from './config/index.js'
import PouchFind from 'pouchdb-find'
PouchDB.plugin(PouchFind)

export default PouchDB.defaults({
  prefix: config.dbPrefix
})
