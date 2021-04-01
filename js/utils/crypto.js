import {Functions as Funct} from "./functions.js";
import {CryptoModel} from "../class/crypto.class.js";

export class Crypto {

  /**
   * Creates each table row with element data
   * @param dataCryptoToHtml
   * @param cleanHtml
   */
  static construcTableWithData(dataCryptoToHtml, cleanHtml = false) {
    let table = document.querySelector('.main-table'),
      tbody = table.querySelector('tbody');
      tbody.innerHTML = '';

    dataCryptoToHtml.map((elmt, index) => {
      let tr = document.createElement('tr')

      Funct.generateTD(tr, elmt.name, elmt.currentPrice, elmt.last24, elmt.last7d, elmt.marketCap, elmt.volume24)

      tr.dataset.idCrypto = elmt.id
      tr.dataset.indexCrypto = index + 1
      tbody.append(tr)
    })

    table.append(tbody)
  }

  /**
   *
   * @param cryptoDataList
   * @param returnedData
   * @returns {*}
   */
  static createCryptoData(cryptoDataList, returnedData) {

    for (const currency of cryptoDataList) {
      let data = new CryptoModel(currency)
      data.id = currency
      data.name = 'crypto: ' + currency
      data.description = Funct.paragraph
      data.website = "https://google.com/" + currency
      data.currentPrice = '$ ' + Funct.commafy(Funct.randomNumber(0.3, 999999999999))
      data.last24 = Funct.randomState(parseFloat(Math.random() * (100 - 1 + 1) + 1).toFixed(2));
      data.last7d = Funct.randomState(parseFloat(Math.random() * (100 - 1 + 1) + 1).toFixed(2));
      data.marketCap = '$ ' + Funct.commafy(Funct.randomNumber(0.3, 999999999999))
      data.volume24 = '$ ' + Funct.commafy(Funct.randomNumber(0.3, 999999999999))

      returnedData.push(data)
    }

    return returnedData
  }
}
