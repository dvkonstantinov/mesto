import { Popup } from "./Popup.js";
export { PopupWithForm };

class PopupWithForm extends Popup {
  constructor(selector, submitCallback) {
    super(selector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector(".form");
    this._inputList = this._form.querySelectorAll(".form__input");
    this._submitButton = this._form.querySelector(".form__button");
    this._defaultSubmitButtonValue = this._submitButton.textContent;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => (this._formValues[input.name] = input.value));
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      this._submitCallback(e, this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  toggleLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Загрузка...";
      return;
    }
    this._submitButton.textContent = this._defaultSubmitButtonValue;
  }
}
