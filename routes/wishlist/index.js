const createDOMPurify = require('dompurify')
const express = require('express')
const getProductName = require('get-product-name')
const { JSDOM } = require('jsdom')
const marked = require('marked')
const u64 = require('u64')

const config = require('../../config')
const publicRoute = require('../../middlewares/publicRoute')
const verifyAuth = require('../../middlewares/verifyAuth')

const window = new JSDOM('').window
const DOMPurify = createDOMPurify(window)

const totals = wishlist => {
  let unpledged = 0
  let pledged = 0
  wishlist.forEach(wishItem => {
    if (wishItem.pledgedBy) pledged += 1
    else unpledged += 1
  })
  return { unpledged, pledged }
}

const ValidURL = (string) => { // Ty SO
  try {
    const url = new URL(string)
    if (global._CC.config.wishlist.smile) {
      if (url.hostname === 'www.amazon.com') url.hostname = 'smile.amazon.com'
    }
    if (url) return url
  } catch (_) {
    return false
  }
}

module.exports = (db) => {
  const router = express.Router()

  router.get('/', publicRoute(), async (req, res) => {
    const docs = await db.allDocs({ include_docs: true })
    if (global._CC.config.wishlist.singleList) {
      for (const row of docs.rows) {
        if (row.doc.admin) return res.redirect(`/wishlist/${row.doc._id}`)
      }
    }
    res.render('wishlists', { title: _CC.lang('WISHLISTS_TITLE'), users: docs.rows, totals })
  })

  router.get('/:user', publicRoute(), async (req, res) => {
    try {
      const dbUser = await db.get(req.params.user)
      if (global._CC.config.wishlist.singleList) {
        if (!dbUser.admin) {
          const docs = await db.allDocs({ include_docs: true })
          for (const row of docs.rows) {
            if (row.doc.admin) return res.redirect(`/wishlist/${row.doc._id}`)
          }
        }
      }
      const firstCanSee = dbUser.wishlist.findIndex(element => (element.addedBy === req.params.user))
      const wishlistReverse = [...dbUser.wishlist].reverse()
      const lastCanSeeValue = wishlistReverse.find(element => (element.addedBy === req.params.user))
      const lastCanSee = dbUser.wishlist.indexOf(lastCanSeeValue)
      for (const item of dbUser.wishlist) {
        if (global._CC.config.wishlist.note.markdown) item.note = DOMPurify.sanitize(marked(item.note))
      }
      res.render('wishlist', {
        title: _CC.lang('WISHLIST_TITLE', dbUser._id),
        name: dbUser._id,
        wishlist: [
          ...dbUser.wishlist.filter(item => item.addedBy === req.params.user),
          ...dbUser.wishlist.filter(item => item.addedBy !== req.params.user)
        ],
        firstCanSee,
        lastCanSee
      })
    } catch (error) {
      req.flash('error', error)
      return res.redirect('/wishlist')
    }
  })

  router.post('/:user', verifyAuth(), async (req, res) => {
    if (!req.body.itemUrlOrName) {
      req.flash('error', _CC.lang('WISHLIST_URL_REQUIRED'))
      return res.redirect(`/wishlist/${req.params.user}`)
    }
    const potentialUrl = req.body.itemUrlOrName.split(' ').pop()
    const url = ValidURL(potentialUrl)
    const item = {}
    let productData
    try {
      if (url) productData = await getProductName(url, config.proxyServer)
    } catch (err) {
      req.flash('error', err.toString())
    }
    item.name = (productData ? productData.name : '')
    item.price = productData?.price
    item.image = productData?.image
    item.addedBy = req.user._id
    item.pledgedBy = (req.user._id === req.params.user || req.body.suggest ? undefined : req.user._id)
    item.note = req.body.note
    if (url) item.url = url
    if (!url) item.name = req.body.itemUrlOrName
    item.id = u64.encode(new Date().getTime().toString())
    const doc = await db.get(req.params.user)
    doc.wishlist.push(item)
    try {
      await db.put(doc)
    } catch {
      req.flash('error', _CC.lang('WISHLIST_CONFLICT'))
      return res.redirect(`/wishlist/${req.params.user}`)
    }
    req.flash(
      'success',
      (
        req.user._id === req.params.user
          ? 'Added item to wishlist'
          : `Pleged item for ${req.params.user}`
      )
    )
    res.redirect(`/wishlist/${req.params.user}`)
  })

  router.post('/:user/pledge/:itemId', verifyAuth(), async (req, res) => {
    const docs = await db.allDocs({ include_docs: true })
    for (let i = 0; i < docs.rows.length; i++) {
      for (let j = 0; j < docs.rows[i].doc.wishlist.length; j++) {
        if (docs.rows[i].doc.wishlist[j].id === req.params.itemId) {
          if (docs.rows[i].doc.wishlist[j].pledgedBy !== undefined) {
            req.flash('error', _CC.lang('WISHLIST_PLEDGE_DUPLICATE'))
            return res.redirect(`/wishlist/${req.params.user}`)
          }
          docs.rows[i].doc.wishlist[j].pledgedBy = req.user._id
          await db.put(docs.rows[i].doc)
          req.flash('success', _CC.lang('WISHLIST_PLEDGE_SUCCESS'))
          return res.redirect(`/wishlist/${req.params.user}`)
        }
      }
    }
  })
  router.post('/:user/unpledge/:itemId', verifyAuth(), async (req, res) => {
    const docs = await db.allDocs({ include_docs: true })
    for (let i = 0; i < docs.rows.length; i++) {
      for (let j = 0; j < docs.rows[i].doc.wishlist.length; j++) {
        if (docs.rows[i].doc.wishlist[j].id === req.params.itemId) {
          if (docs.rows[i].doc.wishlist[j].pledgedBy !== req.user._id) {
            req.flash('error', _CC.lang('WISHLIST_UNPLEDGE_GUARD'))
            return res.redirect(`/wishlist/${req.params.user}`)
          }
          docs.rows[i].doc.wishlist[j].pledgedBy = undefined
          await db.put(docs.rows[i].doc)
          req.flash('success', _CC.lang('WISHLIST_UNPLEDGE_SUCCESS'))
          return res.redirect(`/wishlist/${req.params.user}`)
        }
      }
    }
    req.flash('error', _CC.lang('WISHLIST_UNPLEDGE_MISSING'))
    return res.redirect(`/wishlist/${req.params.user}`)
  })

  router.post('/:user/remove/:itemId', verifyAuth(), async (req, res) => {
    if (req.user._id !== req.params.user) {
      req.flash('error', _CC.lang('WISHLIST_REMOVE_GUARD'))
      return res.redirect(`/wishlist/${req.params.user}`)
    }
    const doc = await db.get(req.user._id)
    for (let i = 0; i < doc.wishlist.length; i++) {
      if (doc.wishlist[i].id === req.params.itemId) {
        doc.wishlist.splice(i, 1)
        await db.put(doc)
        req.flash('success', _CC.lang('WISHLIST_REMOVE_SUCCESS'))
        return res.redirect(`/wishlist/${req.params.user}`)
      }
    }
    req.flash('error', _CC.lang('WISHLIST_REMOVE_MISSING'))
    return res.redirect(`/wishlist/${req.params.user}`)
  })

  router.post('/:user/move/:direction/:itemId', verifyAuth(), async (req, res) => {
    if (req.user._id !== req.params.user) {
      req.flash('error', _CC.lang('WISHLIST_MOVE_GUARD'))
      return res.redirect(`/wishlist/${req.params.user}`)
    }
    const doc = await db.get(req.user._id)
    let wishlist = doc.wishlist
    if (req.params.direction === 'top') {
      const item = wishlist.find(item => item.id === req.params.itemId)
      wishlist = wishlist.filter(item => item.id !== req.params.itemId)
      wishlist.unshift(item)
    } else {
      if (req.params.direction === 'up') wishlist.reverse()
      let moveFromIndex
      wishlist.forEach(wish => {
        if (wish.id === req.params.itemId) moveFromIndex = wishlist.indexOf(wish)
      })
      const moveToIndex = wishlist.findIndex(wish => (wishlist.indexOf(wish) > moveFromIndex && wish.addedBy === req.user._id))
      if (moveToIndex < 0 || moveToIndex > wishlist.length) {
        req.flash('error', _CC.lang('WISHLIST_MOVE_INVALID'))
        return res.redirect(`/wishlist/${req.params.user}`)
      }
      [wishlist[moveFromIndex], wishlist[moveToIndex]] = [wishlist[moveToIndex], wishlist[moveFromIndex]]
      if (req.params.direction === 'up') wishlist.reverse()
    }

    doc.wishlist = wishlist
    await db.put(doc)
    req.flash('success', _CC.lang('WISHLIST_MOVE_SUCCESS'))
    return res.redirect(`/wishlist/${req.params.user}`)
  })

  router.get('/:user/note/:id', verifyAuth(), async (req, res) => {
    const doc = await db.get(req.params.user)
    const item = doc.wishlist.find(item => item.id === req.params.id)
    res.render('note', { item })
  })
  router.post('/:user/note/:id', verifyAuth(), async (req, res) => {
    const doc = await db.get(req.params.user)
    const wishlist = doc.wishlist
    for (let i = 0; i < wishlist.length; i++) {
      const wishlistItem = wishlist[i]
      if (wishlistItem.id !== req.params.id) continue
      if (req.user._id !== req.params.user && req.user._id !== wishlistItem.addedBy) {
        req.flash('error', _CC.lang('NOTE_GUARD'))
        return res.redirect(`/wishlist/${req.params.user}`)
      }
      for (const type of [
        'name', 'note', 'url', 'price', 'image'
      ]) {
        if (!Object.prototype.hasOwnProperty.call(req.body, type)) {
          req.flash('error', _CC.lang('NOTE_MISSING_PROP', type))
          return res.redirect(`/wishlist/${req.params.user}/note/${req.params.id}`)
        }
        wishlistItem[type] = req.body[type]
      }
      wishlist[i] = wishlistItem
    }
    doc.wishlist = wishlist
    await db.put(doc)
    req.flash('success', _CC.lang('NOTE_SUCCESS'))
    return res.redirect(`/wishlist/${req.params.user}`)
  })
  router.post('/:user/refresh/:id', verifyAuth(), async (req, res) => {
    const doc = await db.get(req.params.user)
    const wishlist = doc.wishlist
    for (let i = 0; i < wishlist.length; i++) {
      const wishlistItem = wishlist[i]
      if (wishlistItem.id !== req.params.id) continue
      if (req.user._id !== req.params.user && req.user._id !== wishlistItem.addedBy) {
        req.flash('error', _CC.lang('WISHLIST_REFRESH_GUARD'))
        return res.redirect(`/wishlist/${req.params.user}`)
      }

      if (!wishlistItem.url) {
        req.flash('error', _CC.lang('WISHLIST_REFRESH_NO_URL'))
        return res.redirect(`/wishlist/${req.params.user}/note/${req.params.id}`)
      }

      const productData = await getProductName(wishlistItem.url)
      for (const field of ['name', 'price', 'image']) {
        if (productData[field]) wishlistItem[field] = productData[field]
      }

      wishlist[i] = wishlistItem
    }
    doc.wishlist = wishlist
    await db.put(doc)
    req.flash('success', _CC.lang('WISHLIST_REFRESH_SUCCESS'))
    return res.redirect(`/wishlist/${req.params.user}/note/${req.params.id}`)
  })
  router.post('/:user/note/remove/:id', verifyAuth(), async (req, res) => {
    const doc = await db.get(req.params.user)
    const wishlist = doc.wishlist
    for (let i = 0; i < wishlist.length; i++) {
      const wishlistItem = wishlist[i]
      if (wishlistItem.id !== req.params.id) continue
      if (req.user._id !== req.params.user && req.user._id !== wishlistItem.addedBy) {
        req.flash('error', _CC.lang('NOTE_REMOVE_GUARD'))
        return res.redirect(`/wishlist/${req.params.user}`)
      }
      if (wishlistItem.note) {
        wishlistItem.note = undefined
        wishlist[i] = wishlistItem
      } else {
        req.flash('error', _CC.lang('NOTE_REMOVE_MISSING'))
        return res.redirect(`/wishlist/${req.params.user}`)
      }
    }
    doc.wishlist = wishlist
    await db.put(doc)
    req.flash('success', _CC.lang('NOTE_REMOVE_SUCCESS'))
    return res.redirect(`/wishlist/${req.params.user}`)
  })
  return router
}
