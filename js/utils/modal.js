//MODAL BEHAVIOR AND BTN ACTION EVENT
let modals = document.body.querySelectorAll('.modal-wrapper');
let modalForAction = document.body.querySelector('#modal-for-action');

//Event for btn action in table tr
document.body.querySelectorAll('.btn-click-action').forEach(elmt => {
  elmt.addEventListener('click', ev => {
    ev.preventDefault()
    if(ev.target.parentNode.parentNode.dataset.idCrypto) {
      modalForAction.dataset.idCrypto = ev.target.parentNode.parentNode.dataset.idCrypto
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

//Event for modal - click event on background to close modal
window.addEventListener('click', (ev) => {
  modals.forEach(modal => {
    if (ev.target === modal) {
      modal.style.display = 'none'
    }
  })
})
