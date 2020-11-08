const express = require('express')

module.exports = ({ db }) => {
  const router = express.Router()

  router.get('/', (req, res) => {
    res.send({
      route: 'wishlist'
    })
  })

  router.post('/:user/:id/move/:direction', async (req, res) => {
    try {
      if (req.user._id !== req.params.user) return res.json({ error: 'Not correct user' })
      const doc = await db.get(req.user._id)
      const wishlist = doc.wishlist
      if (req.params.direction === 'up') wishlist.reverse()
      let moveFromIndex
      wishlist.forEach(wish => {
        if (wish.id === req.params.id) moveFromIndex = wishlist.indexOf(wish)
      })
      const moveToIndex = wishlist.findIndex(wish => {
        return (wishlist.indexOf(wish) > moveFromIndex && wish.addedBy === req.user._id)
      })
      if (moveToIndex < 0 || moveToIndex > wishlist.length) return res.send({ error: 'Invalid move ' })
      const original = wishlist[moveToIndex]
      wishlist[moveToIndex] = wishlist[moveFromIndex]
      wishlist[moveFromIndex] = original
      if (req.params.direction === 'up') wishlist.reverse()
      doc.wishlist = wishlist
      await db.put(doc)
      res.send({ error: false })
    } catch (error) {
      console.error(error)
      res.send({ error: error.message })
    }
  })

  return router
}
