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
        if (rankNum1 === 2) tr.querySelectorAll('.topForm button').disabled = true
        else tr.querySelector('.topForm button').disabled = false
        rankEl1.textContent = rankNum1 - 1
        rankEl2.textContent = rankNum2 + 1
      } else if (upOrDown === 'down') {
        moveDown(tr)
        rankEl1.textContent = rankNum1 + 1
        rankEl2.textContent = rankNum2 - 1
      }

      for (const tr of document.querySelector('tbody').children) {
        tr.querySelector('.upForm > div > div > button').disabled = !tr.previousElementSibling
        tr.querySelector('.downForm > div > div > button').disabled = !tr.nextElementSibling
        tr.querySelector('.topForm button').disabled = false
      }
      document.querySelector('.topForm button').disabled = true

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

function priceToFloat(input) {
  let cleanedInput = input.replace(/[^\d.,-]/g, '');

  // Handle European decimal format where comma is used as decimal separator
  if (cleanedInput.includes(',')) {
    if (cleanedInput.includes('.')) {
      // If both comma and dot exist, assume dot is for thousands and comma is for decimals
      cleanedInput = cleanedInput.replace(/\./g, '').replace(',', '.');
    } else {
      // If only comma exists, replace it with a dot for decimal conversion
      cleanedInput = cleanedInput.replace(',', '.');
    }
  }
  // Parse and convert to float
  let result = parseFloat(cleanedInput);
  // Return NaN if the result is not a valid number
  return isNaN(result) ? null : result;
}

document.addEventListener('DOMContentLoaded', () => {
  let sortOrderPrice = 'asc';
  const priceArrow = document.getElementById('price-arrow');
  const sortByPrice = document.getElementById('sort-price');

  function updateArrow(column, order) {
    if (column === 'price') {
      priceArrow.className = order === 'asc' ? 'fas fa-arrow-up' : 'fas fa-arrow-down';
    }
  }

  sortByPrice.addEventListener('click', (e) => {
    e.preventDefault();

    const table = document.getElementById('wishlist-table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    sortOrderPrice = sortOrderPrice === 'asc' ? 'desc' : 'asc';

    const sortedRows = rows.sort((a,b) => {
      const priceA = priceToFloat(a.querySelector('.price').textContent)
      const priceB = priceToFloat(b.querySelector('.price').textContent)
      return sortOrderPrice === 'asc' ? priceA - priceB : priceB - priceA;
    });

    tbody.innerHTML = '';
    sortedRows.forEach(row => tbody.appendChild(row));
    updateArrow('price', sortOrderPrice);
  })
})