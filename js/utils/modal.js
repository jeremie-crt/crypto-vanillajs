//MODAL BEHAVIOR AND BTN ACTION EVENT
let modal = document.body.querySelector('.modal-wrapper');

document.body.querySelectorAll('.btn-click-action').forEach(elmt => {
  elmt.addEventListener('click', ev => {
    ev.preventDefault()
    if(ev.target.parentNode.dataset.idCrypto) {
      modal.dataset.idCrypto = ev.target.parentNode.dataset.idCrypto
    }
    modal.style.display = 'block'
  })
})

document.body.querySelector('.close-modal').addEventListener('click', (e) => {
  modal.style.display = 'none'
})

window.addEventListener('click', (ev) => {
  if (ev.target === modal) {
    modal.style.display = 'none'
  }
})
