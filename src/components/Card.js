export { Card };
class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._templateSelector = templateSelector;
    this._title = data.name;
    this._alt = data.name;
    this._url = data.link;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const _cardElement = document.querySelector(this._templateSelector).content.querySelector(".card").cloneNode(true);
    return _cardElement;
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardLike = this._cardElement.querySelector(".card__like");
    this._cardRemove = this._cardElement.querySelector(".card__remove");
    this._setEventListeners();
    this._cardImage.src = this._url;
    this._cardImage.alt = this._title;
    this._cardTitle.textContent = this._title;
    return this._cardElement;
  }

  _setEventListeners() {
    this._cardLike.addEventListener("click", () => {
      this._handleLikeCard();
    });
    this._cardRemove.addEventListener("click", () => {
      this._handleRemoveCard();
    });
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._title, this._url);
    });
  }

  _handleLikeCard() {
    this._cardLike.classList.toggle("button_type_like_active");
  }

  _handleRemoveCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
}
