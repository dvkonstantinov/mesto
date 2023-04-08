export { UserInfo };

class UserInfo {
  constructor({ nameSelector, statusSelector, userAvatar }) {
    this._nameElement = document.querySelector(nameSelector);
    this._statusElement = document.querySelector(statusSelector);
    this._avatarElement = document.querySelector(userAvatar)
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      status: this._statusElement.textContent,
    };
  }

  setUserInfo(newName, newStatus) {
    this._nameElement.textContent = newName;
    this._statusElement.textContent = newStatus;
  }

  setUserAvatar(newAvatarUrl) {
    this._avatarElement.src = newAvatarUrl
  }

  setUserId(userId) {
    this._userId = userId
  }

  getUserId() {
    return this._userId
  }
}
