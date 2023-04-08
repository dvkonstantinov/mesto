import { Api } from "../components/Api.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupDelete } from "../components/PopupDelete.js";
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
const UploadAvatarButton = document.querySelector(".profile__image-button");
const profileName = document.querySelector('#popupEdit input[name="name"]');
const profileStatus = document.querySelector('#popupEdit input[name="status"]');

const formConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "form__input-error_active",
};

function createCard(data, template) {
  const card = new Card(
    data,
    template,
    userInfo.getUserId(),
    () => {
      popupImage.open(data.name, data.link);
    },
    deleteIconClick,
    handleLikeClick
  );
  const cardElement = card.generateCard();
  return cardElement;
}

function saveEditForm(e, dataFormValues) {
  e.preventDefault();
  popupAdd.toggleLoading(true);
  api.setUserInfo(dataFormValues.name, dataFormValues.status).then((userData) => {
    userInfo.setUserInfo(userData.name, userData.about);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupAdd.toggleLoading(false);
  });

  popupEdit.close();
}

function deleteIconClick(card) {
  popupRemove.setRemoveCard(card);
  popupRemove.open();
}

function handleLikeClick(card) {
  const cardId = card.getCardId();
  if (!card.isLiked()) {
    api.likeCard(cardId).then((responseData) => {
      const newLikeAmount = responseData.likes.length;
      card.likeToggle(newLikeAmount);
    });
  } else {
    api.dislikeCard(cardId).then((responseData) => {
      const newLikeAmount = responseData.likes.length;
      card.likeToggle(newLikeAmount);
    });
  }
}

function submitRemovePopup(e, card) {
  const cardId = card.getCardId();
  e.preventDefault();
  api
    .removeCard(cardId)
    .then(() => {
      card.removeCard();
    })
    .catch((err) => {
      console.log(err);
    });
  popupRemove.close();
}

function updateAvatar(e, dataFormValues) {
  e.preventDefault();
  popupAdd.toggleLoading(true);
  const avatarUrl = dataFormValues.avatarUrl;
  api
    .updateAvatar(avatarUrl)
    .then((incomingData) => {
      console.log(incomingData);
      userInfo.setUserAvatar(incomingData.avatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAdd.toggleLoading(false);
    });
  popupAvatar.close();
}

function saveAddForm(e, dataFormValues) {
  e.preventDefault();
  popupAdd.toggleLoading(true);
  api
    .addCard(dataFormValues.placeName, dataFormValues.placeUrl)
    .then((incomingCardData) => {
      console.log(incomingCardData);
      const cardElement = createCard(incomingCardData, "#cardTemplate");
      cardRenderer.addItem(cardElement);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAdd.toggleLoading(false);
    });
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

UploadAvatarButton.addEventListener("click", () => {
  popupAvatar.open();
});

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  statusSelector: ".profile__status",
  userAvatar: ".profile__image",
});

const popupEdit = new PopupWithForm("#popupEdit", saveEditForm);
const popupAdd = new PopupWithForm("#popupAdd", saveAddForm);
const popupAvatar = new PopupWithForm("#popupSetAvatar", updateAvatar);
const popupImage = new PopupWithImage("#popupImage");
const popupRemove = new PopupDelete("#popupRemove", submitRemovePopup);
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupImage.setEventListeners();
popupRemove.setEventListeners();
popupAvatar.setEventListeners();

const formEdit = new FormValidator(formConfig, formEditElement);
const formAdd = new FormValidator(formConfig, formAddElement);
formEdit.enableValidation();
formAdd.enableValidation();

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-63",
  headers: {
    authorization: "3a824396-4a26-49de-be67-e18c68326ddb",
    "Content-Type": "application/json",
  },
});

const cardRenderer = new Section(
  {
    items: [],
    renderer: (item) => {
      const cardElement = createCard(item, "#cardTemplate");
      cardsContainer.prepend(cardElement);
    },
  },
  ".cards"
);

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardData]) => {
    userInfo.setUserId(userData._id);
    cardRenderer.renderItems(cardData.reverse());
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setUserAvatar(userData.avatar);
  })
  .catch((err) => {
    console.log(err);
  });
