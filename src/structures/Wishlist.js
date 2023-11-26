const getProductData = require('get-product-name')
const u64 = require('u64')

class Wishlist {
  static async new (username) {
    const instance = new this({ username })
    await instance.fetch()
    return instance
  }

  constructor (opts) {
    this.username = opts.username
  }

  async fetch () {
    try {
      this.doc = await _CC.usersDb.get(this.username)
    } catch {
      throw new Error(_CC.lang('WISHLIST_FETCH_FAIL'))
    }
    this.items = this.doc.wishlist
  }

  async save () {
    try {
      const { rev } = await _CC.usersDb.put(this.doc)
      this.doc._rev = rev
    } catch {
      await this.fetch()
      throw new Error(_CC.lang('WISHLIST_CONFLICT'))
    }
  }

  async get (id) {
    const item = this.items.find(item => item.id === id)
    if (!item) throw new Error(_CC.lang('WISHLIST_ITEM_MISSING'))
    return item
  }

  async itemsVisibleToUser (username) {
    const addedBySelfAtTop = async (items) => {
      return [
        ...items.filter(item => item.addedBy === this.username),
        ...items.filter(item => item.addedBy !== this.username)
      ]
    }

    if (this.username === username) {
      return this.items
        .filter(item => item.addedBy === username)
    }

    return addedBySelfAtTop(this.items)
  }

  async add ({ itemUrlOrName, suggest, note, addedBy }) {
    if (!itemUrlOrName) {
      throw new Error(_CC.lang('WISHLIST_URL_REQUIRED'))
    }

    const item = {}

    const nonFatalErrors = []

    const potentialUrl = itemUrlOrName.split(' ').pop()
    const url = parseURL(potentialUrl)
    let productData
    try {
      if (url) productData = await getProductData(url, _CC.config.proxyServer)
    } catch (err) {
      nonFatalErrors.push(err.toString())
    }

    item.id = u64.encode(new Date().getTime().toString())
    item.name = (productData ? productData.name : '')
    item.price = productData?.price
    item.image = productData?.image
    item.addedBy = addedBy
    item.pledgedBy = (addedBy === this.username || suggest ? undefined : addedBy)
    item.note = note

    if (url) item.url = url
    if (!url) item.name = itemUrlOrName

    this.items.push(item)
    await this.save()

    return { nonFatalErrors }
  }

  async remove (id) {
    const index = this.items.findIndex(item => item.id === id)
    if (index === -1) throw new Error(_CC.lang('WISHLIST_ITEM_MISSING'))
    this.items.splice(index, 1)
    await this.save()
  }

  async pledge (id, user) {
    const item = await this.get(id)
    item.pledgedBy = user
    await this.save()
  }

  async unpledge (id) {
    const item = await this.get(id)
    item.pledgedBy = undefined
    await this.save()
  }

  async move (id, places) {
    if (places === 0) throw new Error('places should never be 0')

    const index = this.items.findIndex(item => item.id === id)
    if (index === -1) throw new Error(_CC.lang('WISHLIST_ITEM_MISSING'))

    while (this.items[index + places] && this.items[index + places].addedBy !== this.username) {
      if (places < 0) {
        places--
      } else {
        places++
      }
    }
    if (index < 0 || index >= this.items.length || index + places < 0 || index + places >= this.items.length) {
      throw new Error(_CC.lang('WISHLIST_MOVE_INVALID'))
    }

    const item = this.items.splice(index, 1)[0]
    this.items.splice(index + places, 0, item)
    await this.save()
  }

  async moveTop (id) {
    const index = this.items.findIndex(item => item.id === id)
    if (index === -1) throw new Error(_CC.lang('WISHLIST_ITEM_MISSING'))

    const item = this.items.splice(index, 1)[0]
    this.items.unshift(item)
    await this.save()
  }

  async setItemData (id, data) {
    const item = await this.get(id)

    for (const key of [
      'name', 'note', 'url', 'price', 'image'
    ]) {
      if (!Object.prototype.hasOwnProperty.call(data, key)) {
        throw new Error(_CC.lang('NOTE_MISSING_PROP', key))
      }
      item[key] = data[key]
    }

    await this.save()
  }

  async refreshItemData (id) {
    const item = await this.get(id)

    if (!item.url) {
      throw new Error(_CC.lang('WISHLIST_REFRESH_NO_URL'))
    }

    const productData = await getProductData(item.url)
    if (!productData) return; // short-circuit when there's no data

    for (const key of ['name', 'price', 'image']) {
      if (productData[key]) item[key] = productData[key]
    }

    await this.save()
  }
}

function parseURL (string) {
  try {
    const url = new URL(string)
    if (_CC.config.wishlist.smile) {
      if (url.hostname === 'www.amazon.com') url.hostname = 'smile.amazon.com'
    }
    if (url) return url
  } catch {}
}

module.exports = { Wishlist }
