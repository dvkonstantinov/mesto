const popupEdit = document.querySelector("#popupEdit");
const popupAdd = document.querySelector("#popupAdd");
const popupImage = document.querySelector("#popupImage");
const userName = document.querySelector(".profile__name");
const userStatus = document.querySelector(".profile__status");
const profileEdit = document.querySelector(".profile__edit");
const popupCloseList = document.querySelectorAll(".popup__close");
const formEdit = document.querySelector("#formEdit");
const formAdd = document.querySelector("#formAdd");
const cardLikeList = document.querySelectorAll(".card__like");
const cardRemoveList = document.querySelectorAll(".card__remove");
const cardAddBtn = document.querySelector(".profile_add");
const cardTemplate = document.querySelector("#cardTemplate").content.querySelector(".card");
const cardsContainer = document.querySelector(".cards");

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function likeCard(btnLike) {
  btnLike.classList.toggle("button_type_like_active");
}

function removeCard(card) {
  card.remove();
}

function openImage(incomingImage) {
  image = popupImage.querySelector(".popup__image");
  title = popupImage.querySelector(".popup__title");
  image.src = incomingImage.src;
  image.alt = incomingImage.alt;
  title.textContent = incomingImage.alt;
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

function loadCards(incomingCardsData) {
  newCardList = incomingCardsData.map(function (item) {
    return createCard(item["name"], item["link"]);
  });
  cardsContainer.prepend(...newCardList);
}

function saveAddForm(e) {
  e.preventDefault();
  const form = e.target;
  const placeName = form.querySelector('input[name="placeName"]');
  const placeUrl = form.querySelector('input[name="placeUrl"]');
  newCard = createCard(placeName.value, placeUrl.value);
  cardsContainer.prepend(newCard);
  closePopup(popupAdd);
  placeName.value = "";
  placeUrl.value = "";
}

function createCard(name, url) {
  const card = cardTemplate.cloneNode(true);
  const btnLike = card.querySelector(".card__like");
  const btnRemove = card.querySelector(".card__remove");
  const cardImage = card.querySelector(".card__image");
  card.querySelector(".card__image").src = url;
  card.querySelector(".card__title").textContent = name;
  card.querySelector(".card__image").alt = name;
  btnLike.addEventListener("click", () => likeCard(btnLike));
  btnRemove.addEventListener("click", () => removeCard(card));
  cardImage.addEventListener("click", () => openImage(cardImage));
  return card;
}

profileEdit.addEventListener("click", () => {
  addContextToEditForm(userName.textContent, userStatus.textContent);
  openPopup(popupEdit);
});

popupCloseList.forEach((btn) => {
  const popup = btn.closest(".popup");
  btn.addEventListener("click", () => closePopup(popup));
});

formAdd.addEventListener("submit", saveAddForm);

cardAddBtn.addEventListener("click", () => openPopup(popupAdd));

formEdit.addEventListener("submit", saveEditForm);

loadCards(initialCards);
