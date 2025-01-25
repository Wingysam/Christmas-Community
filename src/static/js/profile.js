document.querySelector('.upload-pfp-no-js').remove()
;(() => {
  const uploadPfp = document.querySelector('.upload-pfp-yes-js')
  uploadPfp.classList.remove('is-hidden')
  const form = uploadPfp.parentElement
  const input = uploadPfp.querySelector('input')
  input.addEventListener('change', () => {
    form.submit()
  })
})()
