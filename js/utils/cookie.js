export class Cookie {

  elements = {
    btnDecline : document.body.querySelector('#btn-decline-cookie'),
    btnAccept : document.body.querySelector('#btn-accept-cookie'),
    modalCookie : document.body.querySelector('#modal-for-init-cookie'),
  }

  /**
   * @param dataDefaultCrypto
   * @param duration
   */
  static saveUserInCookie(dataDefaultCrypto, duration) {
    //Cookies
    let userCookie = {
      user: 'username',
      accepted: false,
      date: new Date(),
      listCrypto: [dataDefaultCrypto]
    }

    setCookie('testForUserCookie', JSON.stringify(userCookie), parseInt(duration))
  }

  /**
   *
   * @param nameC
   * @param valueC
   * @param expireC
   */
  static setCookie(nameC, valueC, expireC) {
    let date = new Date();
    date.setTime(date.getTime() + (expireC * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = nameC + "=" + valueC + "; " + expires + "; path=/";
  }

  /**
   * regex SRC= "https://javascript.info/cookie"
   * @param name
   * @returns {string|undefined}
   */
  static getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  static disagreeCookie() {
    elements.btnDecline.addEventListener('click', (e) => {
      e.target
    })


  }

}
