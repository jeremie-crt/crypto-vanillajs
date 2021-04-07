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
  btnSelectAddNew: document.body.querySelector('#select-add-new'),
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
          treatedData = []
          CryptoFnc.createCryptoData(dataDefaultCryptoList, treatedData);
          CryptoFnc.constructTableWithData(treatedData);
          //Event for btn action in table tr
          updateEventBtnActions(elements.modalActions)
        }
      } else {
        //LOCALSTORAGE
        if (dataDefaultCryptoList.includes(id)) {
          dataDefaultCryptoList.splice(dataDefaultCryptoList.indexOf(id), 1);
          treatedData = []
          saveDataForLocalStorage(dataDefaultCryptoList, treatedData)
          //Event for btn action in table tr
          updateEventBtnActions(elements.modalActions)
        }
      }
      elements.modalActions.style.display = 'none'
    }
  }
})

//------BTN RESET LIST
document.body.querySelectorAll('.btn-reset-list').forEach(e => {
  e.addEventListener('click', (ev) => {
    if (isCookieSet) {
      CookieFnc.saveUserInCookie(config.defaultCryptos, 30)
      treatedData = []
      CryptoFnc.createCryptoData(config.defaultCryptos, treatedData);
      CryptoFnc.constructTableWithData(treatedData);
      //Event for btn action in table tr
      updateEventBtnActions(elements.modalActions)
    } else {
      //LOCALSTORAGE
      treatedData = []
      saveDataForLocalStorage(config.defaultCryptos, treatedData)
      //Event for btn action in table tr
      updateEventBtnActions(elements.modalActions)
    }
  })
})

//------BTN ADD TO FAV
document.body.querySelector('#btn-add-to-fav').addEventListener('click', (ev) => {
  if (elements.modalActions.dataset.idCrypto && typeof elements.modalActions.dataset.idCrypto === 'string') {
    console.log(elements.modalActions.dataset.idCrypto)
  }
})

//------BTN DELETE INFO
document.body.querySelector('#btn-delete-info').addEventListener('click', (ev) => {
  let isConfirmed = confirm('Are you sure ?')

  if(isConfirmed) {
    document.cookie = "InfoCryptoUsername={}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"
    localStorage.removeItem('dataCrypto')

  } else {
    return false;
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

//-----ADD NEW DATA PROCESS
//With input text
document.body.querySelectorAll('.btn-confirm-add-new-input').forEach(elmt => {
  elmt.addEventListener('click', (ev) => {

    let valueInput = elements.btnInputAddNew.value.toUpperCase().replace(/\s/g, '');

    if(typeof valueInput === 'string' && valueInput.length >= 3) {
      treatDataForAddNewAction(valueInput)
    } else {
      return document.body.querySelector('.error-on-confirm-add-new-input').innerHTML = 'Input confirmed with empty value. Please provide a correct value.'
    }
  })
})
//From select option
document.body.querySelectorAll('.btn-confirm-add-new-select').forEach(elmt => {
  elmt.addEventListener('click', (ev) => {

    let valueSelect = elements.btnSelectAddNew.value.toUpperCase().replace(/\s/g, '');

    if(typeof valueSelect === 'string' && valueSelect.length >= 3) {
      treatDataForAddNewAction(valueSelect)
    } else {
      return document.body.querySelector('.error-on-confirm-add-new-select').innerHTML = 'Selection confirmed with empty value. Please provide a correct option.'
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

function treatDataForAddNewAction(value) {
  //Add the new currency to the default list
  dataDefaultCryptoList.push(value)

  //IF COOKIE IS SET - UPDATE THE DATA
  if(isCookieSet) {
    CookieFnc.saveUserInCookie(dataDefaultCryptoList, 30)
    elements.modalAddNew.style.display = 'none'
    treatedData = []
    CryptoFnc.createCryptoData(dataDefaultCryptoList, treatedData)
    CryptoFnc.constructTableWithData(treatedData)
    //Event for btn action in table tr
    updateEventBtnActions(elements.modalActions)

  } else {
    treatedData = []
    saveDataForLocalStorage(dataDefaultCryptoList, treatedData)
    elements.modalAddNew.style.display = 'none'
    //Event for btn action in table tr
    updateEventBtnActions(elements.modalActions)
  }
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

//Event for btn action in table tr
function btnClickAction(modalAction) {
  document.body.querySelectorAll('.btn-click-action').forEach(elmt => {
    elmt.addEventListener('click', ev => {
      ev.preventDefault()
      if(ev.target.parentNode.parentNode.dataset.idCrypto) {
        modalAction.dataset.idCrypto = ev.target.parentNode.parentNode.dataset.idCrypto
      }
      modalAction.style.display = 'block'
    })
  })
}

//Call btn related functions
function updateEventBtnActions(modalAction) {
  addBtnActionToTR();
  //Event for btn action in table tr
  btnClickAction(modalAction)
}

//TODO - Add Favorites list - flash message once deleted info
