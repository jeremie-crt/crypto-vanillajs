import {Functions as Funct} from "./functions.js";
import {CryptoModel} from "../class/crypto.class.js";

export class Crypto {
  /**
   * Creates each table row with element data
   * @param dataCryptoToHtml
   */
  static constructTableWithData(dataCryptoToHtml) {
    let table = document.querySelector('.main-table'),
      tbody = table.querySelector('tbody');
      tbody.innerHTML = '';

    dataCryptoToHtml.map((elmt, index) => {
      let indexPlus = parseInt(index) + 1;
      let tr = document.createElement('tr');

      let tdIndex = document.createElement('td');
      tdIndex.append('#' + indexPlus);
      tr.append(tdIndex);

      Funct.generateTD(tr, elmt.name, elmt.currentPrice, elmt.last24, elmt.last7d, elmt.marketCap, elmt.volume24);

      tr.dataset.idCrypto = elmt.id;
      tr.dataset.description = elmt.description;
      tr.dataset.indexCrypto = indexPlus;
      tbody.append(tr);
    })

    table.append(tbody);
  }

  /**
   * Create object for each value given from table parameter
   * @param cryptoDataList
   * @param returnedData
   * @returns {*}
   */
  static createCryptoData(cryptoDataList, returnedData) {
    for (const currency of cryptoDataList) {
      let data = new CryptoModel(currency);
      data.id = currency;
      data.name = currency;
      data.description = Funct.paragraph;
      data.website = "https://google.com/" + currency;
      data.currentPrice = '$' + Funct.commafy(Funct.randomNumber(0.3, 999999999999));
      data.last24 = Funct.randomState(parseFloat(Math.random() * (100 - 1 + 1) + 1).toFixed(2));
      data.last7d = Funct.randomState(parseFloat(Math.random() * (100 - 1 + 1) + 1).toFixed(2));
      data.marketCap = '$' + Funct.commafy(Funct.randomNumber(0.3, 999999999999));
      data.volume24 = '$' + Funct.commafy(Funct.randomNumber(0.3, 999999999999));

      returnedData.push(data);
    }

    return returnedData;
  }
}
