export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleClosePopupEsc.bind(this));
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleClosePopupEsc.bind(this));
  }

  // Функция закрытия поп-апов по Esc (передать слушатель в open и снять с close)
  _handleClosePopupEsc(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', evt => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }

      if (evt.target.classList.contains('popup__close-button')) {
        this.close();
      }
    });
  }
}
