class Card {
  constructor(data, cardTemplateSelector, { handleCardClick }) {
    this._title = data.title;
    this._alt = data.title;
    this._image = data.image;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
  }

  // Создание шаблокна карточки
  _getTemplate() {
    const newCard = document
      .querySelector(this._cardTemplateSelector)
      .content.querySelector('.photo')
      .cloneNode(true);

    return newCard;
  }

  // фунуция удаления карточки
  _handleDeleteButtonClick(evt) {
    const button = evt.target;
    const photo = button.closest('.photo');
    photo.remove();
  }

  // функция лайка карточки
  _handleLikeButtonClick(evt) {
    const buttonLike = evt.target;
    buttonLike.classList.toggle('photo__like-button_active');
  }

  _setEventListeners(evt) {
    // обработчик события: удаление карточки
    this._cardDeleteButton.addEventListener('click', this._handleDeleteButtonClick);

    // обработчик события: нравится карточка
    this._cardLikeButton.addEventListener('click', this._handleLikeButtonClick);

    // обработчик открытия просмотра изображения
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick({ title: this._title, image: this._image });
    });
  }

  // Создание карточки
  generateCard() {
    const card = this._getTemplate();
    this._cardTitle = card.querySelector('.photo__title');
    this._cardImage = card.querySelector('.photo__image');
    this._cardDeleteButton = card.querySelector('.photo__delete-button');
    this._cardLikeButton = card.querySelector('.photo__like-button');

    this._cardTitle.textContent = this._title;
    this._cardImage.setAttribute('src', this._image);
    this._cardImage.setAttribute('alt', this._alt);

    this._setEventListeners();

    return card;
  }
}

export { Card };
