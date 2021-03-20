'use strict'

//Importation of modules
//import faker from 'faker'

//Importation of Class Folder
import {Crypto} from "./class/crypto.class.js";

//Have a default list for diplaying currencies
const defaultCryptos = ['BTC', 'ETH', 'BNB', 'ADA', 'USDT', 'DOT', 'XRP', 'UNI', 'LTC', 'LINK', 'THETA', 'LUNA', 'AAVE']

let dataDefaultCrypto = []

//If default is set, save it to not repeat raw logic
//If user CTA events - modify editedCrypto
/*if(dataCrypto.length < 0) {

} else {
  let dataEditedCrypto = dataDefaultCrypto
}*/

let paragraph = 'Synergistically communicate user friendly action items via high-payoff ideas. Monotonectally architect proactive methods of empowerment without goal-oriented alignments. Rapidiously productize robust convergence with pandemic information. '

//Loop through the list of crypto
//Then create object for each
//Assign data to properties {faker - later API COINMARKET}
//Save the news data to DefaultCrypto

for (const currency of defaultCryptos) {

  let data = new Crypto(currency)
  data.name = 'crypto: ' + currency
  data.description = paragraph
  data.website = "https://google.com/" + currency
  data.currentPrice = '$ ' + commafy(randomNumber(0.3, 999999999999))
  data.last24 = randomState(parseFloat(Math.random() * (100 - 1 + 1) + 1).toFixed(2));
  data.last7d = randomState(parseFloat(Math.random() * (100 - 1 + 1) + 1).toFixed(2));
  data.marketCap = '$ ' + commafy(randomNumber(0.3, 999999999999))
  data.volume24 = '$ ' + commafy(randomNumber(0.3, 999999999999))

  dataDefaultCrypto.push(data)
}

//Front Behavior DOM actions - Treat Data
let table = document.querySelector('.main-table'),
  tbody = document.createElement('tbody');

dataDefaultCrypto.map((elmt) => {

  let tr = document.createElement('tr')

  generateTD(tr, elmt.name, elmt.currentPrice, elmt.last24, elmt.last7d, elmt.marketCap, elmt.volume24)

  tbody.append(tr)
})

table.querySelector('tbody').innerHTML = ''
table.append(tbody)
console.log(tbody);

/**
 * TODO - dynamic html map fnc
 * TODO - CTA actions
 */


/** FUNCTIONS **/

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Sets a comma every 3 digits
function commafy(num) {
  var str = num.toString().split('.');
  if (str[0].length >= 5) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  }
  if (str[1] && str[1].length >= 5) {
    str[1] = str[1].replace(/(\d{3})/g, '$1 ');
  }
  return str.join('.');
}

//Create td data for several arguments given
function generateTD(htmlTR, ...data) {

  data.map((elmt) => {
    let td = document.createElement('td')
    td.append(elmt)

    htmlTR.append(td)
  })
}

//Gives a random value negative or positive
function randomState(data) {
  let span = document.createElement('span')
  let icon = document.createElement('i')

  if (Math.round(Math.random()) === 0) {
    icon.className = 'fa fa-arrow-down'
    span.style.color = "#DC143C"

  } else {
    icon.className = 'fa fa-arrow-up'
    span.style.color = "#32CD32"
  }

  span.append(icon)
  span.append(' ' + data + '%')

  return span
}
