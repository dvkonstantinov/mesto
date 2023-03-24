import { Popup } from "./Popup.js";
export { PopupWithForm };

class PopupWithForm extends Popup {
  constructor(selector, submitCallback) {
    super(selector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector(".form");
    this._inputList = this._form.querySelectorAll(".form__input");
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => (this._formValues[input.name] = input.value));
    return this._formValues;
  }

  setEventListeners() {
    this._popup.addEventListener("click", (e) => {
      if (e.target.classList.contains("popup__close") || e.target == e.currentTarget) {
        this.close();
      }
    });
    this._form.addEventListener("submit", (e) => this._submitCallback(e, this._getInputValues()));
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.addEventListener("keydown", (e) => this._handleEscClose(e));
    this._form.reset();
  }
}
