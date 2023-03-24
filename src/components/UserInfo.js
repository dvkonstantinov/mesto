export { UserInfo };

class UserInfo {
  constructor({ nameSelector, statusSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._statusElement = document.querySelector(statusSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      status: this._statusElement.textContent,
    };
  }

  setUserInfo(new_name, new_status) {
    this._nameElement.textContent = new_name;
    this._statusElement.textContent = new_status;
  }
}
