import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleSubmitForm }) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__input-form');
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
    this._submitButton = this._popupForm.querySelector('.popup__save-button');
    // console.log(this._submitButton);
    this._handleSubmitForm = handleSubmitForm;
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value;
    });
    // console.log(this._inputValues);
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', evt => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
