export { Popup };

class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", (e) => this._handleEscClose(e));
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", (e) => this._handleEscClose(e));
  }

  _handleEscClose(e) {
    if (e.keyCode == "27") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("click", (e) => {
      if (e.target.classList.contains("popup__close") || e.target == e.currentTarget) {
        this.close();
      }
    });
  }
}
