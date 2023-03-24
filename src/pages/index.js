import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import "./index.css";
const profileEditBtn = document.querySelector(".profile__edit");
const formEditElement = document.querySelector("#formEdit");
const formAddElement = document.querySelector("#formAdd");
const cardAddBtn = document.querySelector(".profile_add");
const cardsContainer = document.querySelector(".cards");
const profileName = document.querySelector('#popupEdit input[name="name"]');
const profileStatus = document.querySelector('#popupEdit input[name="status"]');

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

function createCard(data, template) {
  const card = new Card(data, template, () => {
    popupImage.open(data.name, data.link);
  });
  const cardElement = card.generateCard();
  return cardElement;
}

function saveEditForm(e, dataFormValues) {
  e.preventDefault();
  userInfo.setUserInfo(dataFormValues.name, dataFormValues.status);
  popupEdit.close();
}

function saveAddForm(e, dataFormValues) {
  e.preventDefault();
  const cardData = { name: dataFormValues.placeName, link: dataFormValues.placeUrl };
  const cardElement = createCard(cardData, "#cardTemplate");
  cardRenderer.addItem(cardElement);
  popupAdd.close();
  formAdd.resetValidation();
}

profileEditBtn.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileName.value = userData.name;
  profileStatus.value = userData.status;
  formEdit.resetValidation();
  popupEdit.open();
});

cardAddBtn.addEventListener("click", () => {
  popupAdd.open();
});

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  statusSelector: ".profile__status",
});

const popupEdit = new PopupWithForm("#popupEdit", saveEditForm);
const popupAdd = new PopupWithForm("#popupAdd", saveAddForm);
const popupImage = new PopupWithImage("#popupImage");
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupImage.setEventListeners();

const formEdit = new FormValidator(formConfig, formEditElement);
const formAdd = new FormValidator(formConfig, formAddElement);
formEdit.enableValidation();
formAdd.enableValidation();

const cardRenderer = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item, "#cardTemplate");
      cardsContainer.prepend(cardElement);
    },
  },
  ".cards"
);

cardRenderer.renderItems();
