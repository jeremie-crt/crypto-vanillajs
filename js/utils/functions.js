/**
 * Utils functions -
 */
export class Functions {

  static randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  //Sets a comma every 3 digits
  static commafy(num) {
    let str = num.toString().split('.');
    if (str[0].length >= 5) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
      str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    //str.join('.')
    return str[0];
  }

  //Create td data for several arguments given
  static generateTD(htmlTR, ...data) {
    data.map((elmt, index) => {
      let td = document.createElement('td')
      td.append(elmt)

      htmlTR.append(td)
    })
  }

  //Gives a random value negative or positive
  static randomState(data) {
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

  static paragraph = 'Synergistically communicate user friendly action items via high-payoff ideas. Monotonectally architect proactive methods of empowerment without goal-oriented alignments. Rapidiously productize robust convergence with pandemic information.';
}
