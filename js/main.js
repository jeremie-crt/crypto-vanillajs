'use strict'

//Importation of modules
//import faker from 'faker'

//Importation of Class Folder
import {Crypto as CryptoFnc} from "./utils/crypto.js";
import {Cookie as CookieoFnc} from "./utils/cookie.js";

import {config} from "./config.crypto.js";

let dataDefaultCrypto = []


//If cookie is defined
//Means that the cookie is accepted by user to keep his save of crypto data
//Use the editedCryptoTable to edit the list of crypto display
if(typeof CookieoFnc.getCookie('testForUserCookie') === 'string') {

  let checkCookie = JSON.parse(CookieoFnc.getCookie('testForUserCookie'))

  if(checkCookie !== '' && typeof checkCookie === 'object') {
    console.log(checkCookie);
    let userCryptoList = checkCookie.listCrypto

    let generatedData = CryptoFnc.createCryptoData(userCryptoList, returnedData)

    CryptoFnc.construcTableWithData(generatedData)
  }

  //If cookie is undefined
  //let the defaultCryptoTable to display the data
  //If the user accepted the cookie, initiate the data by setting the cookie with the editedData
} else {

  if(localStorage.getItem('dataCrypto')) {
    //Get the data save to reuse it in html instead of redoing the logic data
    let retrievedData = JSON.parse(localStorage.getItem('dataCrypto'));

    //Delete the raw data and inject the html from object
    document.body.querySelector('.main-table').remove()
    document.body.querySelector('.resume').insertAdjacentHTML('afterend', retrievedData.htmlGenerated)

  } else {

    CryptoFnc.createCryptoData(config.defaultCryptos, dataDefaultCrypto)
    //TODO - DO SOMETHING WITH VALUE SAVED ? DO RETURN ??
    let generatedData = CryptoFnc.construcTableWithData(dataDefaultCrypto)

    //Save in localstorage to avoid repeat object instanciation
    let dataToLocalStorage = {
      generatedData: generatedData ? generatedData : 'empty',
      htmlGenerated: document.body.querySelector('.main-table').outerHTML
    }

    localStorage.setItem('dataCrypto', JSON.stringify(dataToLocalStorage))
  }
}


//On accepted Cookie
//Save into cookie the defaultCryptoList






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
  if(modal.dataset.idCrypto && typeof modal.dataset.idCrypto === 'string') {
    console.log(modal.dataset.idCrypto)
  }
})

//BTN ADD TO FAV
document.body.querySelector('#btn-add-to-fav').addEventListener('click', (ev) => {
  if(modal.dataset.idCrypto && typeof modal.dataset.idCrypto === 'string') {
    console.log(modal.dataset.idCrypto)
  }
})

//BTN ADD NEW
document.body.querySelectorAll('.btn-add-new').forEach(elmt => {
  elmt.addEventListener('click', (ev) => {
    ev.preventDefault()
    if(modal.dataset.idCrypto && typeof modal.dataset.idCrypto === 'string') {
      console.log(modal.dataset.idCrypto)
    }
  })

})



