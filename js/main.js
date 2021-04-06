'use strict'

//Importation of modules
//import faker from 'faker'

//Importation of Class Folder
import {Crypto as CryptoFnc} from "./utils/crypto.js";
import {Cookie as CookieFnc} from "./utils/cookie.js";
import {config} from "./config.crypto.js";

let dataDefaultCryptoList;
let isCookieSet = false;
let isLocalStorageSet = false;

let cookieData = typeof CookieFnc.getCookieData() === 'object' ? CookieFnc.getCookieData() : '';
let storageData;

if (cookieData) {
  dataDefaultCryptoList = cookieData.listCrypto;
  isCookieSet = true;

} else if (localStorage.getItem('dataCrypto')) {
  storageData = JSON.parse(localStorage.getItem('dataCrypto'));
  dataDefaultCryptoList = storageData.RootListCrypto;
  isLocalStorageSet = true;

} else {
  dataDefaultCryptoList = config.defaultCryptos;
}

let treatedData = [];

const elements = {
  mainTable: document.body.querySelector('.main-table'),
  btnDecline: document.body.querySelector('#btn-decline-cookie'),
  btnAccept: document.body.querySelector('#btn-accept-cookie'),
  btnInputAddNew: document.body.querySelector('#input-add-new'),
  modalActions: document.body.querySelector('#modal-for-action'),
  modalCookie: document.body.querySelector('#modal-for-init-cookie'),
  modalRePopCookie: document.body.querySelector('#modal-for-repop-cookie'),
  modalAddNew: document.body.querySelector('#modal-add-new'),
};

//If cookie is defined
//Means that the cookie is accepted by user to keep his save of crypto data
//Use the Cookie to edit the list of crypto display
if (isCookieSet) {
  //Hide Cookie modal
  CookieFnc.agreeToCookie(elements);

  CryptoFnc.createCryptoData(dataDefaultCryptoList, treatedData);
  CryptoFnc.constructTableWithData(treatedData);

  //If cookie is undefined
  //let the defaultCryptoTable to display the data
  //If the user accepted the cookie, save the data setting the cookie
} else {

  if (isLocalStorageSet) {
    //Delete the raw data and inject the html from object
    elements.mainTable.remove();
    //Update the DOM
    document.body.querySelector('.container-content-table').insertAdjacentHTML('afterbegin', storageData.htmlGenerated);

  } else {
    saveDataForLocalStorage(dataDefaultCryptoList, treatedData);
  }

  //ON DECLINE COOKIE
  CookieFnc.disagreeCookie(elements);
  //ON ACCEPT COOKIE
  elements.btnAccept.addEventListener('click', (ev) => {
    CookieFnc.saveUserInCookie(dataDefaultCryptoList, 30);
    CookieFnc.agreeToCookie(elements);
  });
}

//************* Front Behavior DOM actions - Treat Data *************//
addBtnActionToTR();

//------BTN DELETE
document.body.querySelector('#btn-del-crypto').addEventListener('click', (ev) => {
  let isConfirmed = confirm('Are you sure ?')

  if(isConfirmed) {
    if (elements.modalActions.dataset.idCrypto && typeof elements.modalActions.dataset.idCrypto === 'string') {
      let id = elements.modalActions.dataset.idCrypto;
      let selector = 'tbody tr[data-id-crypto=' + id + ']';
      let TrElement = document.body.querySelector(selector);

      //DELETE ELEMENT - HIDE MODAL
      TrElement.remove()

      //IF COOKIE IS SET - UPDATE THE DATA
      if (isCookieSet) {
        if (dataDefaultCryptoList.includes(id)) {
          dataDefaultCryptoList.splice(dataDefaultCryptoList.indexOf(id), 1);
          CookieFnc.saveUserInCookie(dataDefaultCryptoList, 30)
        }
      } else {
        //LOCALSTORAGE
        if (dataDefaultCryptoList.includes(id)) {
          dataDefaultCryptoList.splice(dataDefaultCryptoList.indexOf(id), 1);
          treatedData = []
          saveDataForLocalStorage(dataDefaultCryptoList, treatedData)
          addBtnActionToTR();
          //TODO - FIX DELETE ACTION BTN
        }
      }
      console.log(TrElement)

      elements.modalActions.style.display = 'none'
    }
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
    if (elements.modalActions.style.display === 'block') {
      elements.modalActions.style.display = 'none'
    }
    elements.modalAddNew.style.display = 'block'
  })
})

//ADD NEW DATA PROCESS
document.body.querySelectorAll('.btn-confirm-add-new').forEach(elmt => {
  elmt.addEventListener('click', (ev) => {
    console.log(ev)
    console.log(ev.target)
    //TODO - DO SELECT VALUE

    let valueInput = elements.btnInputAddNew.value.toUpperCase().replace(/\s/g, '');
    //Add the new currency to the default list
    dataDefaultCryptoList.push(valueInput)

    //IF COOKIE IS SET - UPDATE THE DATA
    if(isCookieSet) {
      CookieFnc.saveUserInCookie(dataDefaultCryptoList, 30)
      elements.modalAddNew.style.display = 'none'
      treatedData = []
      CryptoFnc.createCryptoData(dataDefaultCryptoList, treatedData)
      CryptoFnc.constructTableWithData(treatedData)
      addBtnActionToTR()
    } else {
      treatedData = []
      saveDataForLocalStorage(dataDefaultCryptoList, treatedData)
      elements.modalAddNew.style.display = 'none'
    }
  })
})

/*Function*/
function saveDataForLocalStorage(dataDefaultCryptoList, treatedData) {
  CryptoFnc.createCryptoData(dataDefaultCryptoList, treatedData)
  CryptoFnc.constructTableWithData(treatedData)

  //Save in localstorage to avoid repeat object instances
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
    let tdElmt = document.createElement('td')
    let btnToTr = Object.assign(document.createElement('button'), {
      className: 'btn-click-action',
      textContent: 'ACTIONS',
    })

    tdElmt.append(btnToTr)
    listTrElements[i].lastElementChild.insertAdjacentElement('afterend', tdElmt)
  }
}

//TODO - CHECK DELETE -  btn FOR DEFAULT DATA - Add Favorites list -
