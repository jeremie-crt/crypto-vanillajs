'use strict'

//Importation of modules
//import faker from 'faker'

//Importation of Class Folder
import {Crypto as CryptoFnc} from "./utils/crypto.js";
import {Cookie as CookieFnc} from "./utils/cookie.js";
import {config} from "./config.crypto.js";

let dataDefaultCryptoList
let isCookieSet = false
let isLocalStorageSet = false

let cookieData = typeof CookieFnc.getCookieCryptoList() === 'object' ? CookieFnc.getCookieCryptoList() : '';

if(cookieData) {
  dataDefaultCryptoList = cookieData
  isCookieSet = true

} else if (localStorage.getItem('dataCrypto')) {
  let retrievedData = JSON.parse(localStorage.getItem('dataCrypto'));
  dataDefaultCryptoList = retrievedData.RootListCrypto
  isLocalStorageSet = true

} else {
  dataDefaultCryptoList = config.defaultCryptos
}

let treatedData = []

const elements = {
  mainTable: document.body.querySelector('.main-table'),
  btnDecline: document.body.querySelector('#btn-decline-cookie'),
  btnAccept: document.body.querySelector('#btn-accept-cookie'),
  btnInputAddNew: document.body.querySelector('#input-add-new'),
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
    CryptoFnc.createCryptoData(dataDefaultCryptoList, treatedData)
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
    saveDataForLocalStorage(dataDefaultCryptoList, treatedData)
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
addBtnActionToTR()

//------BTN DELETE
document.body.querySelector('#btn-del-crypto').addEventListener('click', (ev) => {

  if (elements.modalActions.dataset.idCrypto && typeof elements.modalActions.dataset.idCrypto === 'string') {
    let id = elements.modalActions.dataset.idCrypto
    let selector = 'tbody tr[data-id-crypto=' + id + ']'
    let TrElement = document.body.querySelector(selector)

    //IF COOKIE IS SET - UPDATE THE DATA
    let cookieData = typeof CookieFnc.isSetCookie() === 'object' ? CookieFnc.isSetCookie() : ''
    if(cookieData) {
      if(dataDefaultCryptoList.includes(id)) {
        dataDefaultCryptoList.splice(dataDefaultCryptoList.indexOf(id), 1);
        CookieFnc.saveUserInCookie(dataDefaultCryptoList, 1)
      }

    } else {
      //LOCALSTORAGE
      if(dataDefaultCryptoList.includes(id)) {
        dataDefaultCryptoList.splice(dataDefaultCryptoList.indexOf(id), 1);
        treatedData = []
        saveDataForLocalStorage(dataDefaultCryptoList, treatedData)
      }
    }
    //DELETE ELEMENT - HIDE MODAL
    TrElement.remove()
    elements.modalActions.style.display = 'none'
  }
})

//------BTN ADD TO FAV
document.body.querySelector('#btn-add-to-fav').addEventListener('click', (ev) => {
  if (elements.modalActions.dataset.idCrypto && typeof elements.modalActions.dataset.idCrypto === 'string') {
    console.log(elements.modalActions.dataset.idCrypto)
  }
})

//------BTN ADD NEW - BEHAVIOUR
document.body.querySelectorAll('.btn-add-new').forEach(elmt => {
  elmt.addEventListener('click', (ev) => {
    ev.preventDefault()

    if(elements.modalActions.style.display === 'block') {
      elements.modalActions.style.display = 'none'
    }
    elements.modalAddNew.style.display = 'block'
  })
})

//ADD NEW DATA PROCESS
document.body.querySelector('#btn-confirm-add-new').addEventListener('click', (ev) => {

  let valueInput = elements.btnInputAddNew.value.toUpperCase().replace(/\s/g, '');
  //Add the new currency to the default list
  dataDefaultCryptoList.push(valueInput)

  //IF COOKIE IS SET - UPDATE THE DATA
  let cookieData = typeof CookieFnc.isSetCookie() === 'object' ? CookieFnc.isSetCookie() : ''
  if(cookieData) {
    CookieFnc.saveUserInCookie(dataDefaultCryptoList, 1)
    elements.modalAddNew.style.display = 'none'
    treatedData = []
    CryptoFnc.createCryptoData(dataDefaultCryptoList, treatedData)
    CryptoFnc.construcTableWithData(treatedData)
    addBtnActionToTR()
  } else {
    treatedData = []
    saveDataForLocalStorage(dataDefaultCryptoList, treatedData)
    elements.modalAddNew.style.display = 'none'
  }
})

/*Function*/

function saveDataForLocalStorage(dataDefaultCryptoList, treatedData) {
  CryptoFnc.createCryptoData(dataDefaultCryptoList, treatedData)
  CryptoFnc.construcTableWithData(treatedData)
  //Save in localstorage to avoid repeat object instanciation
  let dataToLocalStorage = {
    RootListCrypto: dataDefaultCryptoList,
    htmlGenerated: document.querySelector('.main-table').outerHTML,
    generatedData: treatedData
  }

  localStorage.setItem('dataCrypto', JSON.stringify(dataToLocalStorage))
}

//ADD BUTTON AT THE END OF EACH TR
function addBtnActionToTR() {
  let listTrElements = document.querySelectorAll('tr[data-id-crypto]')

  for (let i = 0; i < listTrElements.length; i++) {
    let btnToTr = Object.assign(document.createElement('button'), {
      className: 'btn-click-action',
      textContent: 'ACTIONS'
    })

    listTrElements[i].lastElementChild.insertAdjacentElement('afterend', btnToTr)
  }
}


//TODO - Clean code - btn FOR DEFAULT DATA - Add Favorites list -
