import { Popup } from "./Popup.js";
export { PopupDelete };

class PopupDelete extends Popup {
  constructor(selector, submitCallback) {
    super(selector);
    this._form = this._popup.querySelector('.form__card-remove');
    this._button = this._form.querySelector(".form__button_remove-confirm");
    this._submitCallback = submitCallback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      this._submitCallback(e, this._card);
    });
  }

  setRemoveCard(card) {
    this._card = card;
  }
}
