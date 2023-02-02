const popupEdit = document.querySelector(".popup_edit");
const userName = document.querySelector(".profile__name");
const userStatus = document.querySelector(".profile__status");
const profileEdit = document.querySelector(".profile__edit");
const popupCloseList = document.querySelectorAll(".popup__close");
const formEdit = document.querySelector('.form__edit')


function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function addContextToEditForm(name, status) {
  const editName = popupEdit.querySelector('input[name="name"]');
  const editStatus = popupEdit.querySelector('input[name="status"]');
  editName.value = name;
  editStatus.value = status;
}

function saveEditForm(e) {
  e.preventDefault()
  const form = e.target
  userName.textContent = form.querySelector('input[name="name"]').value;
  userStatus.textContent = form.querySelector('input[name="status"]').value;
  closePopup(popupEdit)
}


profileEdit.addEventListener("click", () => {
  addContextToEditForm(userName.textContent, userStatus.textContent)
  openPopup(popupEdit)
});

popupCloseList.forEach((btn) => {
  const popup = btn.closest('.popup')
  btn.addEventListener("click", () => closePopup(popup));
});

formEdit.addEventListener('submit', saveEditForm)
