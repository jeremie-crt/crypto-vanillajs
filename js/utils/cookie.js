export class Cookie {

  /**
   * Create the object with the data for the new cookie
   * @param dataDefaultCryptoList
   * @param duration
   */
  static saveUserInCookie(dataDefaultCryptoList, duration) {
    //Cookies
    let userCookie = {
      user: 'username',
      accepted: true,
      date: new Date(),
      listCrypto: dataDefaultCryptoList
    }

    this.setCookie('InfoCryptoUsername', JSON.stringify(userCookie), parseInt(duration))
  }

  /**
   * Set a new cookie
   * @param nameC
   * @param valueC
   * @param expireC
   */
  static setCookie(nameC, valueC, expireC) {
    let date = new Date();
    date.setTime(date.getTime() + (expireC * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();

    document.cookie = nameC + "=" + valueC + "; " + expires + "; path=/";
  }

  /**
   * Get the cookie in Window Object
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

  static disagreeCookie(elements) {
    //Click event on btn decline - hide the man div & display the btn re-pop div
    elements.btnDecline.addEventListener('click', (e) => {
      elements.modalCookie.classList.add('hidden-cookie')
      elements.modalRePopCookie.classList.remove('hidden-cookie')
      elements.modalRePopCookie.style.display = 'block';

      setTimeout(() => {
          elements.modalCookie.style.display = 'none';
        },
        700)
    })

    //Click event on btn re-pop div - hide the re-pop div & display the the man div
    elements.modalRePopCookie.addEventListener('click', (e) => {
      elements.modalRePopCookie.classList.add('hidden-cookie')
      elements.modalCookie.classList.remove('hidden-cookie')
      elements.modalCookie.style.display = 'block';

      setTimeout(() => {
          elements.modalRePopCookie.style.display = 'none'
        },
        400)
    })
  }

  /**
   * Hide the cookie modal agreement
   * @param elements
   */
  static agreeToCookie(elements) {
    //Hide Cookie modal
    elements.modalCookie.style.display = 'none'
    elements.modalCookie.classList.add('hide-for-set')
  }

  /**
   * Returns all data from the cookie
   * @returns {boolean|any}
   */
  static getCookieData() {
    if (typeof this.getCookie('InfoCryptoUsername') === 'string') {
      //Get Cookie info
      let checkCookie = JSON.parse(this.getCookie('InfoCryptoUsername'))

      //Check if cookie has the right type
      if (checkCookie !== '' && typeof checkCookie === 'object') {

        return checkCookie

      } else {
        return false
      }
    }
  }

}
