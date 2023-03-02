import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
const popupImage = document.querySelector("#popupImage");
const popupEdit = document.querySelector("#popupEdit");
const popupAdd = document.querySelector("#popupAdd");
const userName = document.querySelector(".profile__name");
const userStatus = document.querySelector(".profile__status");
const profileEdit = document.querySelector(".profile__edit");
const popups = document.querySelectorAll(".popup");
const formEditElement = document.querySelector("#formEdit");
const formAddElement = document.querySelector("#formAdd");
const cardAddBtn = document.querySelector(".profile_add");
const cardsContainer = document.querySelector(".cards");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const formConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "form__input-error_active",
};

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", (e) => keyHandler(e, popup));
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", (e) => keyHandler(e, popup));
}
function openImagePopup(new_title, new_url) {
  console.log(new_title, new_url);
  const image = popupImage.querySelector(".popup__image");
  const title = popupImage.querySelector(".popup__title");
  image.src = new_url;
  image.alt = new_title;
  title.textContent = new_title;
  openPopup(popupImage);
}

function addContextToEditForm(name, status) {
  const editName = popupEdit.querySelector('input[name="name"]');
  const editStatus = popupEdit.querySelector('input[name="status"]');
  editName.value = name;
  editStatus.value = status;
}

function saveEditForm(e) {
  e.preventDefault();
  const form = e.target;
  userName.textContent = form.querySelector('input[name="name"]').value;
  userStatus.textContent = form.querySelector('input[name="status"]').value;
  closePopup(popupEdit);
}

function createCard(data, template, callback) {
  const card = new Card(data, template, callback);
  const cardElement = card.generateCard();
  return cardElement;
}
function loadCards(incomingCardsData) {
  incomingCardsData.forEach((itemData) => {
    const cardElement = createCard(itemData, "#cardTemplate", openImagePopup);
    cardsContainer.prepend(cardElement);
  });
}

function saveAddForm(e) {
  e.preventDefault();
  const form = e.target;
  const placeName = form.querySelector('input[name="placeName"]');
  const placeUrl = form.querySelector('input[name="placeUrl"]');
  const cardData = { name: placeName.value, link: placeUrl.value };
  const cardElement = createCard(cardData, "#cardTemplate", openImagePopup);
  cardsContainer.prepend(cardElement);
  closePopup(popupAdd);
  const submitButton = form.querySelector(".form__button");
  submitButton.classList.add("form__button_disabled");
  submitButton.setAttribute("disabled", "");
  formAdd.resetForm()
}

function closePopupChoice(e, popup) {
  if (e.target.classList.contains("popup__close") || e.target == e.currentTarget) {
    closePopup(popup);
  }
}

function keyHandler(e, popup) {
  if (e.keyCode == "27") {
    closePopup(popup);
  }
}

profileEdit.addEventListener("click", () => {
  addContextToEditForm(userName.textContent, userStatus.textContent);
  formEdit.resetValidation();
  openPopup(popupEdit);
});

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (e) => closePopupChoice(e, popup));
});

cardAddBtn.addEventListener("click", () => {
  openPopup(popupAdd);
});

const formEdit = new FormValidator(formConfig, formEditElement);
const formAdd = new FormValidator(formConfig, formAddElement);
formEdit.enableValidation();
formAdd.enableValidation();

formAddElement.addEventListener("submit", saveAddForm);
formEditElement.addEventListener("submit", saveEditForm);

loadCards(initialCards);
