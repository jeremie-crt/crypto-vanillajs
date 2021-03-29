'use strict'

//Importation of modules
//import faker from 'faker'

//Importation of Class Folder
import {Crypto as CryptoFnc} from "./utils/crypto.js";
import {Cookie as CookieFnc} from "./utils/cookie.js";
import {config} from "./config.crypto.js";

let dataDefaultCryptoList = config.defaultCryptos
let treatedData = []

const elements = {
  mainTable: document.body.querySelector('.main-table'),
  btnDecline: document.body.querySelector('#btn-decline-cookie'),
  btnAccept: document.body.querySelector('#btn-accept-cookie'),
  modalActions: document.body.querySelector('#modal-for-action'),
  modalCookie: document.body.querySelector('#modal-for-init-cookie'),
  modalRePopCookie: document.body.querySelector('#modal-for-repop-cookie'),
  modalAddNew: document.body.querySelector('#modal-add-new'),
}

//If cookie is defined
//Means that the cookie is accepted by user to keep his save of crypto data
//Use the Cookie to edit the list of crypto display
if (typeof CookieFnc.getCookie('InfoCryptoUsername') === 'string') {
  //Hide Cookie modal
  CookieFnc.agreeToCookie(elements)
  //Get Cookie info
  let checkCookie = JSON.parse(CookieFnc.getCookie('InfoCryptoUsername'))

  //Check if cookie has the right type
  if (checkCookie !== '' && typeof checkCookie === 'object') {
    let userCryptoList = checkCookie.listCrypto

    CryptoFnc.createCryptoData(userCryptoList, treatedData)
    CryptoFnc.construcTableWithData(treatedData)
  }

  //If cookie is undefined
  //let the defaultCryptoTable to display the data
  //If the user accepted the cookie, save the data setting the cookie
} else {

  if (localStorage.getItem('dataCrypto')) {
    //Get the data save to reuse it in html instead of redoing the logic data
    let retrievedData = JSON.parse(localStorage.getItem('dataCrypto'));
    //Delete the raw data and inject the html from object
    elements.mainTable.remove()
    //Update the DOM
    document.body.querySelector('.action-content-add-new').insertAdjacentHTML('afterend', retrievedData.htmlGenerated)

  } else {
    CryptoFnc.createCryptoData(dataDefaultCryptoList, treatedData)
    CryptoFnc.construcTableWithData(treatedData)

    //Save in localstorage to avoid repeat object instanciation
    let dataToLocalStorage = {
      RootListCrypto: dataDefaultCryptoList,
      htmlGenerated: elements.mainTable.outerHTML,
      generatedData: treatedData
    }

    localStorage.setItem('dataCrypto', JSON.stringify(dataToLocalStorage))
  }

  //ON DECLINE COOKIE
  CookieFnc.disagreeCookie(elements)
  //ON ACCEPT COOKIE
  elements.btnAccept.addEventListener('click', (ev) => {
    CookieFnc.saveUserInCookie(dataDefaultCryptoList, 1)
    CookieFnc.agreeToCookie(elements)
  })
}

//************* Front Behavior DOM actions - Treat Data *************//

//ADD BUTTON AT THE END OF EACH TR
let listTrElements = document.querySelectorAll('tr[data-id-crypto]')

for (let i = 0; i < listTrElements.length; i++) {
  let btnToTr = Object.assign(document.createElement('button'), {
    className: 'btn-click-action',
    textContent: 'ACTIONS'
  })

  listTrElements[i].lastElementChild.insertAdjacentElement('afterend', btnToTr)
}

//BTN DELETE
document.body.querySelector('#btn-del-crypto').addEventListener('click', (ev) => {
  if (elements.modalActions.dataset.idCrypto && typeof elements.modalActions.dataset.idCrypto === 'string') {
    let id = elements.modalActions.dataset.idCrypto
    let selector = 'tr[data-id-crypto=' + id + ']'
    let TrElement = elements.mainTable.querySelector(selector)

    //IF COOKIE IS SET - UPDATE THE DATA
    let cookieData = typeof CookieFnc.isSetCookie() === 'object' ? CookieFnc.isSetCookie() : ''
    if(cookieData) {

      let listFromCookie = cookieData
      if(listFromCookie.includes(id)) {
        listFromCookie.splice(listFromCookie.indexOf(id), 1);
        CookieFnc.saveUserInCookie(listFromCookie, 1)
      }
    }

    //DELETE ELEMENT - HIDE MODAL
    TrElement.remove()
    elements.modalActions.style.display = 'none'
  }
})

//BTN ADD TO FAV
document.body.querySelector('#btn-add-to-fav').addEventListener('click', (ev) => {
  if (elements.modalActions.dataset.idCrypto && typeof elements.modalActions.dataset.idCrypto === 'string') {
    console.log(elements.modalActions.dataset.idCrypto)
  }
})

//BTN ADD NEW
document.body.querySelectorAll('.btn-add-new').forEach(elmt => {
  elmt.addEventListener('click', (ev) => {
    ev.preventDefault()
    elements.modalAddNew.style.display = 'block'
  })
})

document.body.querySelectorAll('#btn-confirm-add-new').addEventListener('click', (ev) => {

  //IF COOKIE IS SET - UPDATE THE DATA
  let cookieData = typeof CookieFnc.isSetCookie() === 'object' ? CookieFnc.isSetCookie() : ''
  if(cookieData) {

    CookieFnc.saveUserInCookie(cookieData, 1)

  }
})

