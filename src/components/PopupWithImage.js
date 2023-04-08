import { Popup } from "./Popup.js";
export { PopupWithImage };

class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._image = this._popup.querySelector(".popup__image");
    this._title = this._popup.querySelector(".popup__title");
  }

  open(title, url) {
    super.open()
    this._image.src = url;
    this._image.alt = title;
    this._title.textContent = title;
  }
}
