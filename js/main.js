'use strict'

//Importation of modules
//import faker from 'faker'

//Importation of Class Folder
import {Crypto} from "./class/crypto.class.js";
import {Functions as Funct} from "./utils/functions.js";
import {config} from "./config.crypto.js";

let dataDefaultCrypto = []
//If default is set, save it to not repeat raw logic
//If user CTA events - modify editedCrypto
/*if(dataDefaultCrypto.length < 0) {

} else {
  let dataEditedCrypto = dataDefaultCrypto
}*/

let paragraph = 'Synergistically communicate user friendly action items via high-payoff ideas. Monotonectally architect proactive methods of empowerment without goal-oriented alignments. Rapidiously productize robust convergence with pandemic information. ';

//Loop through the list of crypto
//Then create object for each
//Assign data to properties {faker - later API COINMARKET}
//Save the news data to DefaultCrypto

//Cookies
let userCookie = {
  user: 'name',
  accepted: false,
  date: new Date(),

}

/**
 * SRC= "https://javascript.info/cookie"
 * @param name
 * @returns {string|undefined}
 */
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
let checkCookie = JSON.parse(getCookie('testForUserCookie'))

if(checkCookie !== '' && typeof checkCookie === 'object') {

}

function setCookie(nameC, valueC, expireC) {
  let date = new Date();
  date.setTime(date.getTime() + (expireC * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = nameC + "=" + valueC + "; " + expires + "; path=/";
}

setCookie('testForUserCookie', JSON.stringify(userCookie), 1)


/****** Defines object Crypto ******/

for (const currency of config.defaultCryptos) {
  let data = new Crypto(currency)
  data.id = currency
  data.name = 'crypto: ' + currency
  data.description = paragraph
  data.website = "https://google.com/" + currency
  data.currentPrice = '$ ' + Funct.commafy(Funct.randomNumber(0.3, 999999999999))
  data.last24 = Funct.randomState(parseFloat(Math.random() * (100 - 1 + 1) + 1).toFixed(2));
  data.last7d = Funct.randomState(parseFloat(Math.random() * (100 - 1 + 1) + 1).toFixed(2));
  data.marketCap = '$ ' + Funct.commafy(Funct.randomNumber(0.3, 999999999999))
  data.volume24 = '$ ' + Funct.commafy(Funct.randomNumber(0.3, 999999999999))

  dataDefaultCrypto.push(data)
}

//************* Front Behavior DOM actions - Treat Data *************//
let table = document.querySelector('.main-table'),
  tbody = document.createElement('tbody');

dataDefaultCrypto.map((elmt, index) => {
  let tr = document.createElement('tr')

  Funct.generateTD(tr, elmt.name, elmt.currentPrice, elmt.last24, elmt.last7d, elmt.marketCap, elmt.volume24)

  tr.dataset.idCrypto = elmt.id
  tr.dataset.indexCrypto = index + 1
  tbody.append(tr)
})

table.querySelector('tbody').innerHTML = ''
table.append(tbody)

//ADD BUTTON AT THE END OF EACH TR
let listTrElements = document.querySelectorAll('tr[data-id-crypto]')

for (let i = 0; i < listTrElements.length; i++) {
  let btnToTr = Object.assign(document.createElement('button'), {
    className: 'btn-click-action',
    textContent: 'ACTIONS'
  })

  listTrElements[i].lastElementChild.insertAdjacentElement('afterend', btnToTr)
}

//BTN ACTION EVENT
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
