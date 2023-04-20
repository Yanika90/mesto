import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imagePopup = this._popup.querySelector('.popup__image'); // картинка
    this._imageTitle = this._popup.querySelector('.popup__image-title'); // подпись;
  }

  open(title, image) {
    super.open();
    this._imageTitle.textContent = title;
    this._imagePopup.src = image;
    this._imagePopup.alt = title;
  }

  close() {
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
  }
}
