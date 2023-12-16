import { Wishlist } from './Wishlist.js'

export class WishlistManager {
  constructor () {
    this.wishlistsCache = new Map()
  }

  async get (username) {
    const cached = this.wishlistsCache.get(username)
    if (cached) return cached

    const wishlist = await Wishlist.new(username)
    this.wishlistsCache.set(username, wishlist)
    return wishlist
  }

  async clearCache () {
    this.wishlistsCache = new Map()
  }
}
