import { Popup } from "./Popup.js";
export { PopupWithImage };

class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._image = this._popup.querySelector(".popup__image");
    this._title = this._popup.querySelector(".popup__title");
  }

  open(title, url) {
    this._popup.classList.add("popup_opened");
    this._image.src = url;
    this._image.alt = title;
    this._title.textContent = title;
    document.addEventListener("keydown", (e) => this._handleEscClose(e));
    
  }
}
