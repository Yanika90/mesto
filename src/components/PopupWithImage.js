import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imagePopup = this._popup.querySelector('.popup__image');
    this._imageTitle = this._popup.querySelector('.popup__image-title');
  }

  open(item) {
    super.open();
    this._imageTitle.textContent = item.name;
    this._imagePopup.src = item.link;
    this._imagePopup.alt = item.name;
  }
}
