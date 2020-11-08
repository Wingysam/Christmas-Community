window.onload = () => {
  const burger = document.getElementById('navBarBurger')
  const navBarMenu = document.getElementById('navBarMenu')
  burger.addEventListener('click', () => {
    burger.classList.toggle('is-active')
    navBarMenu.classList.toggle('is-active')
  })
}
