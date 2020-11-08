/* eslint-env browser */
function animateCSS (node, animationName) {
  return new Promise(resolve => {
    node.classList.add('animated', animationName)

    function handleAnimationEnd () {
      node.classList.remove('animated', animationName)
      node.removeEventListener('animationend', handleAnimationEnd)

      resolve()
    }

    node.addEventListener('animationend', handleAnimationEnd)
  })
}

// These move function are stolen from
// https://stackoverflow.com/a/34914096
function moveUp (element) {
  if (element.previousElementSibling) { element.parentNode.insertBefore(element, element.previousElementSibling) }
}
function moveDown (element) {
  if (element.nextElementSibling) { element.parentNode.insertBefore(element.nextElementSibling, element) }
}

function listen (element, upOrDown) {
  element.addEventListener('submit', async event => {
    try {
      event.preventDefault()

      const tr = event.currentTarget.parentElement.parentElement
      const otherTr = upOrDown === 'up' ? tr.previousSibling : tr.nextSibling

      await Promise.all([
        animateCSS(tr, 'zoomOut'),
        animateCSS(otherTr, 'zoomOut')
      ])

      tr.style.visibility = 'hidden'
      otherTr.style.visibility = 'hidden'

      const data = await fetch(`/api/wishlist/${document.querySelector('[type="data/user_id"]').textContent}/${tr.id}/move/${upOrDown}`, {
        method: 'post',
        credentials: 'include'
      })
        .then(res => res.json())

      if (data.error) throw new Error(data.error)

      upOrDown === 'up' ? moveUp(tr) : moveDown(tr)

      for (const tr of document.querySelector('tbody').children) {
        tr.querySelector('.upForm > div > div > button').disabled = !tr.previousElementSibling
        tr.querySelector('.downForm > div > div > button').disabled = !tr.nextElementSibling
      }

      tr.style.visibility = 'visible'
      otherTr.style.visibility = 'visible'

      await Promise.all([
        animateCSS(tr, 'zoomIn'),
        animateCSS(otherTr, 'zoomIn')
      ])

      return false
    } catch (error) {
      alert(error.message)
      location.reload()
      throw error // probably useless but just in case reload doesn't do anything
    }
  })
}

setTimeout(() => {
  document.querySelectorAll('.upForm').forEach(element => listen(element, 'up'))
  document.querySelectorAll('.downForm').forEach(element => listen(element, 'down'))
}, 0)
