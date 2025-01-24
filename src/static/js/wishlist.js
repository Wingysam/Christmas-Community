/* eslint-env browser */
async function animateCSS (node, animationName) {
  return await new Promise(resolve => {
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
      const numItems = tr.parentElement.rows.length

      const res = fetch(`/api/wishlist/${document.querySelector('[type="data/user_id"]').textContent}/${tr.id}/move/${upOrDown}`, {
        method: 'post',
        credentials: 'include'
      })

      await Promise.all([
        animateCSS(tr, 'zoomOut'),
        animateCSS(otherTr, 'zoomOut')
      ])

      tr.style.visibility = 'hidden'
      otherTr.style.visibility = 'hidden'

      const data = await (await res).json()
      if (data.error) throw new Error(data.error)

      const rankEl1 = tr.querySelector('.rank')
      const rankNum1 = Number(rankEl1.textContent)
      const rankEl2 = otherTr.querySelector('.rank')
      const rankNum2 = Number(rankEl2.textContent)
      if (upOrDown === 'up') {
        moveUp(tr)
        rankEl1.textContent = rankNum1 - 1
        rankEl2.textContent = rankNum2 + 1
      } else if (upOrDown === 'down') {
        moveDown(tr)
        rankEl1.textContent = rankNum1 + 1
        rankEl2.textContent = rankNum2 - 1
      }

      for (const tr of document.querySelector('tbody.wishlist-items').children) {
        const rank = Number(tr.querySelector('.rank').textContent)
        tr.querySelector('.upForm > div > div > button').disabled = rank === 1
        tr.querySelector('.topForm > div > div > button').disabled = rank === 1
        tr.querySelector('.downForm > div > div > button').disabled = rank === numItems
        tr.querySelector('.bottomForm > div > div > button').disabled = rank === numItems
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
  document.querySelectorAll('.upForm').forEach(element => { listen(element, 'up') })
  document.querySelectorAll('.downForm').forEach(element => { listen(element, 'down') })
}, 0)

function priceToFloat (input) {
  let cleanedInput = input.replace(/[^\d.,-]/g, '')

  // Handle European decimal format where comma is used as decimal separator
  if (cleanedInput.includes(',')) {
    if (cleanedInput.includes('.')) {
      // If both comma and dot exist, assume dot is for thousands and comma is for decimals
      cleanedInput = cleanedInput.replace(/\./g, '').replace(',', '.')
    } else {
      // If only comma exists, replace it with a dot for decimal conversion
      cleanedInput = cleanedInput.replace(',', '.')
    }
  }
  // Parse and convert to float
  const result = parseFloat(cleanedInput)
  // Return NaN if the result is not a valid number
  return isNaN(result) ? null : result
}

document.addEventListener('DOMContentLoaded', () => {
  let sortBy = 'rank'
  const priceArrow = document.getElementById('price-arrow')
  const sortByPrice = document.getElementById('sort-price')

  function updateArrow (column, order) {
    if (column === 'price') {
      priceArrow.className = order === 'rank' ? '' : 'fas fa-arrow-down'
    }
  }

  sortByPrice.parentElement.addEventListener('click', (e) => {
    e.preventDefault()

    const table = document.getElementById('wishlist-table')
    const tbody = table.querySelector('tbody')
    const rows = Array.from(tbody.querySelectorAll('tr'))
    sortBy = sortBy === 'rank' ? 'price' : 'rank'

    const sortedRows = rows.sort((a, b) => {
      if (sortBy === 'rank') {
        const rankA = Number(a.querySelector('.rank').textContent)
        const rankB = Number(b.querySelector('.rank').textContent)
        return rankA - rankB
      } else if (sortBy === 'price') {
        const priceA = priceToFloat(a.querySelector('.price').textContent)
        const priceB = priceToFloat(b.querySelector('.price').textContent)
        return priceB - priceA
      } else {
        throw new Error('Invalid sort order')
      }
    })

    tbody.innerHTML = ''
    sortedRows.forEach(row => tbody.appendChild(row))
    updateArrow('price', sortBy)
  })
})
