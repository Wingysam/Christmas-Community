function hide() {
  document.querySelectorAll('.progressbar').forEach((element) => {
    element.classList.add('hidden')
  })
  document.querySelector('#showButton').classList.remove('hidden')
  this.classList.add('hidden')
}

function show() {
  document.querySelectorAll('.progressbar').forEach((element) => {
    element.classList.remove('hidden')
  })
  document.querySelector('#hideButton').classList.remove('hidden')
  this.classList.add('hidden')
}

setTimeout(() => {
  document.querySelector('#hideButton').addEventListener('click', hide)
  document.querySelector('#showButton').addEventListener('click', show)
}, 0)
