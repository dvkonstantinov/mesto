export { Card };
class Card {
  constructor(data, templateSelector, currentUserId, handleCardClick, handleIconRemoveClick, handleLikeClick) {
    this._templateSelector = templateSelector;
    this._title = data.name;
    this._alt = data.name;
    this._url = data.link;
    this._cardId = data._id
    this._ownerId = data.owner._id
    this._likes = data.likes
    this._likeAmount = data.likes.length;
    this._handleCardClick = handleCardClick;
    this._handleIconRemoveClick = handleIconRemoveClick
    this._handleLikeClick = handleLikeClick
    this._userId = currentUserId
  }

  _getTemplate() {
    const _cardElement = document.querySelector(this._templateSelector).content.querySelector(".card").cloneNode(true);
    return _cardElement;
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardLikeAmount = this._cardElement.querySelector(".card__like-amount");
    this._cardLike = this._cardElement.querySelector(".card__like");
    this._cardRemove = this._cardElement.querySelector(".card__remove");
    if (this._userId != this._ownerId) {
      this._cardRemove.remove()
    }
    this._likes.forEach(el => {
      if (el._id == this._userId) {
        this._cardLike.classList.toggle("button_type_like_active");
      }
    });
    this._setEventListeners();
    this._cardImage.src = this._url;
    this._cardImage.alt = this._title;
    this._cardTitle.textContent = this._title;
    this._cardLikeAmount.textContent = this._likeAmount;
    return this._cardElement;
  }

  _setEventListeners() {
    this._cardLike.addEventListener("click", () => {
      this._handleLikeClick(this)
    });
    this._cardRemove.addEventListener("click", () => {
      this._handleIconRemoveClick(this);
    });
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._title, this._url);
    });
  }

  likeToggle(newLikeAmount) {
    this._likeAmount = newLikeAmount
    this._cardLikeAmount.textContent = this._likeAmount;
    this._cardLike.classList.toggle("button_type_like_active");
  }

  isLiked() {
    return this._cardLike.classList.contains("button_type_like_active")
  }

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getCardId() {
    return this._cardId
  }
}
