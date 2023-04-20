export default class UserInfo {
  constructor({ userNameSelector, userAboutSelector }) {
    this._userNameInput = document.querySelector(userNameSelector);
    this._userAboutYourselfInput = document.querySelector(userAboutSelector);
  }

  getUserInfo() {
    return {
      name: this._userNameInput.textContent,
      about: this._userAboutYourselfInput.textContent
    };
  }

  setUserInfo(data) {
    this._userNameInput.textContent = data.name;
    this._userAboutYourselfInput.textContent = data.about;
  }
}
