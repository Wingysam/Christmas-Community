import createDOMPurify from 'dompurify'
import express from 'express'
import { JSDOM } from 'jsdom'
import marked from 'marked'

import publicRoute from '../../middlewares/publicRoute.js'
import verifyAuth from '../../middlewares/verifyAuth.js'

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

export default function (db) {
  const router = express.Router()

  const wishlistManager = _CC.wishlistManager

  router.get('/', publicRoute(), async (req, res) => {
    const docs = await db.allDocs({ include_docs: true })
    if (global._CC.config.wishlist.singleList) {
      for (const row of docs.rows) {
        if (row.doc.admin) return res.redirect(`/wishlist/${row.doc._id}`)
      }
    }
    res.render('wishlists', { title: _CC.lang('WISHLISTS_TITLE'), users: docs.rows, totals })
  })

  async function redirectIfSingleUserMode (req, res, next) {
    const dbUser = await db.get(req.params.user)
    if (_CC.config.wishlist.singleList) {
      if (!dbUser.admin) {
        const docs = await db.allDocs({ include_docs: true })
        for (const row of docs.rows) {
          if (row.doc.admin) return res.redirect(`/wishlist/${row.doc._id}`)
        }
      }
    }
    next()
  }

  router.get('/:user', publicRoute(), redirectIfSingleUserMode, async (req, res) => {
    try {
      const wishlist = await wishlistManager.get(req.params.user)
      await wishlist.fetch()
      const items = await wishlist.itemsVisibleToUser(req.user._id)

      const compiledNotes = {}
      if (_CC.config.wishlist.note.markdown) {
        for (const item of items) {
          compiledNotes[item.id] = DOMPurify.sanitize(marked(item.note))
        }
      }

      res.render('wishlist', {
        title: _CC.lang('WISHLIST_TITLE', wishlist.username),
        name: wishlist.username,
        items,
        compiledNotes,
        sharedInfo: wishlist.doc?.info ?? {}
      })
    } catch (error) {
      req.flash('error', error)
      return res.redirect('/wishlist')
    }
  })

  router.post('/:user', verifyAuth(), async (req, res) => {
    try {
      const wishlist = await wishlistManager.get(req.params.user)

      const { nonFatalErrors } = await wishlist.add({
        itemUrlOrName: req.body.itemUrlOrName,
        suggest: req.body.suggest,
        note: req.body.note,
        price: req.body.price,
        addedBy: req.user._id
      })

      for (const error of nonFatalErrors) {
        req.flash('error', error)
      }

      req.flash('success',
        req.user._id === req.params.user
          ? _CC.lang('WISHLIST_ADDED_ITEM_TO_OWN_WISHLIST')
          : _CC.lang('WISHLIST_PLEDGED_ITEM_FOR_USER', req.params.user)
      )
    } catch (error) {
      req.flash('error', `${error}`)
    }

    res.redirect(`/wishlist/${req.params.user}`)
  })

  router.post('/:user/pledge/:itemId', verifyAuth(), async (req, res) => {
    try {
      const wishlist = await wishlistManager.get(req.params.user)
      const item = await wishlist.get(req.params.itemId)

      if (item.pledgedBy !== undefined) {
        throw new Error(_CC.lang('WISHLIST_PLEDGE_DUPLICATE'))
      }

      await wishlist.pledge(item.id, req.user._id)
    } catch (error) {
      req.flash('error', `${error}`)
    }

    res.redirect(`/wishlist/${req.params.user}`)
  })

  router.post('/:user/unpledge/:itemId', verifyAuth(), async (req, res) => {
    try {
      const wishlist = await wishlistManager.get(req.params.user)
      const item = await wishlist.get(req.params.itemId)

      const pledgedByUser = item.pledgedBy === req.user._id
      if (!pledgedByUser) {
        throw new Error(_CC.lang('WISHLIST_UNPLEDGE_GUARD'))
      }

      await wishlist.unpledge(item.id)

      req.flash('success', _CC.lang('WISHLIST_UNPLEDGE_SUCCESS'))
    } catch (error) {
      req.flash('error', `${error}`)
    }

    res.redirect(`/wishlist/${req.params.user}`)
  })

  router.post('/:user/remove/:itemId', verifyAuth(), async (req, res) => {
    try {
      const wishlist = await wishlistManager.get(req.params.user)
      const item = await wishlist.get(req.params.itemId)

      const isOwnWishlist = req.user._id === wishlist.username
      const addedByUser = item.addedBy === req.user._id
      if (!isOwnWishlist && !addedByUser) {
        throw new Error(_CC.lang('WISHLIST_REMOVE_GUARD'))
      }

      await wishlist.remove(item.id)

      req.flash('success', _CC.lang('WISHLIST_REMOVE_SUCCESS'))
    } catch (error) {
      req.flash('error', `${error}`)
    }

    res.redirect(`/wishlist/${req.params.user}`)
  })

  router.post('/:user/move/:direction/:itemId', verifyAuth(), async (req, res) => {
    try {
      if (req.user._id !== req.params.user) {
        throw new Error(_CC.lang('WISHLIST_MOVE_GUARD'))
      }

      const wishlist = await wishlistManager.get(req.params.user)

      if (req.params.direction === 'top') {
        await wishlist.moveTop(req.params.itemId)
      } else if (req.params.direction === 'bottom') {
        await wishlist.moveBottom(req.params.itemId)
      } else if (req.params.direction === 'up') {
        await wishlist.move(req.params.itemId, -1)
      } else if (req.params.direction === 'down') {
        await wishlist.move(req.params.itemId, 1)
      } else {
        throw new Error(_CC.lang('WISHLIST_MOVE_UNKNOWN_DIRECTION'))
      }

      req.flash('success', _CC.lang('WISHLIST_MOVE_SUCCESS'))
    } catch (error) {
      req.flash('error', `${error}`)
    }

    res.redirect(`/wishlist/${req.params.user}`)
  })

  router.get('/:user/note/:id', verifyAuth(), async (req, res) => {
    try {
      const wishlist = await wishlistManager.get(req.params.user)
      const item = await wishlist.get(req.params.id)
      res.render('note', { item })
    } catch (error) {
      req.flash('error', `${error}`)
      res.redirect(`/wishlist/${req.params.user}`)
    }
  })

  router.post('/:user/note/:id', verifyAuth(), async (req, res) => {
    try {
      const wishlist = await wishlistManager.get(req.params.user)
      const item = await wishlist.get(req.params.id)

      const isOwnWishlist = req.user._id === req.params.user
      const addedByUser = req.user._id === item.addedBy
      if (!isOwnWishlist && !addedByUser) {
        throw new Error(_CC.lang('NOTE_GUARD'))
      }

      await wishlist.setItemData(req.params.id, req.body)

      req.flash('success', _CC.lang('NOTE_SUCCESS'))
      res.redirect(`/wishlist/${req.params.user}`)
    } catch (error) {
      req.flash('error', `${error}`)
      res.redirect(`/wishlist/${req.params.user}/note/${req.params.id}`)
    }
  })

  router.post('/:user/refresh/:id', verifyAuth(), async (req, res) => {
    try {
      const wishlist = await wishlistManager.get(req.params.user)
      const item = await wishlist.get(req.params.id)

      const isOwnWishlist = req.user._id === req.params.user
      const addedByUser = req.user._id === item.addedBy
      if (!isOwnWishlist && !addedByUser) {
        throw new Error(_CC.lang('WISHLIST_REFRESH_GUARD'))
      }

      await wishlist.refreshItemData(item.id)

      req.flash('success', _CC.lang('WISHLIST_REFRESH_SUCCESS'))
    } catch (error) {
      req.flash('error', `${error}`)
    }

    res.redirect(`/wishlist/${req.params.user}/note/${req.params.id}`)
  })

  return router
}
