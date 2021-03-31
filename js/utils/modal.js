//MODAL BEHAVIOR AND BTN ACTION EVENT
let modals = document.body.querySelectorAll('.modal-wrapper');
let modalForAction = document.body.querySelector('#modal-for-action');

document.body.querySelectorAll('.btn-click-action').forEach(elmt => {
  elmt.addEventListener('click', ev => {
    ev.preventDefault()
    if(ev.target.parentNode.dataset.idCrypto) {
      modalForAction.dataset.idCrypto = ev.target.parentNode.dataset.idCrypto
    }
    modalForAction.style.display = 'block'
  })
})

document.body.querySelectorAll('.close-modal').forEach(elmt => {
  elmt.addEventListener('click', (ev) => {
    let modal = ev.target.parentNode.parentNode.parentNode
    modal.style.display = 'none'
  })
})

window.addEventListener('click', (ev) => {
  modals.forEach(modal => {
    if (ev.target === modal) {
      modal.style.display = 'none'
    }
  })
})
