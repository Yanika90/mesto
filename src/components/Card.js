class Card {
  constructor(
    data,
    userId,
    cardTemplateSelector,
    { handleCardClick, handleDeleteCardClick, handleLikeClick, handleLikeDeliteClick }
  ) {
    this._name = data.name;
    this._alt = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._likesId = data.likes._id; // id лайков
    this._cardId = data._id; // id карточки
    this._ownerId = data.owner._id; // id владеньца
    this._userId = userId; // id текущего пользователя
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleLikeDeliteClick = handleLikeDeliteClick;
    console.log(this._cardId);
  }

  // Создание шаблокна карточки
  _getTemplate() {
    const newCard = document
      .querySelector(this._cardTemplateSelector)
      .content.querySelector('.photo')
      .cloneNode(true);

    return newCard;
  }

  // Удаление карточки
  deleteCard() {
    this._card.remove();
    this._card = null;
  }
  // Лайк и дизлайк карточки
  isLiked() {
    return this._cardLikeButton.classList.contains('photo__like-button_active');
  }

  likeCard(count) {
    this._cardLikeCounter.textContent = count;
    this._cardLikeButton.classList.toggle('photo__like-button_active');
  }

  _setEventListeners() {
    // обработчик события: удаление карточки
    this._cardDeleteButton.addEventListener('click', () => {
      this._handleDeleteCardClick(this);
    });

    // обработчик события: нравится карточка
    this._cardLikeButton.addEventListener('click', () => {
      this._handleLikeClick(this);
    });

    // обработчик открытия просмотра изображения
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
  }

  // Создание карточки
  generateCard() {
    this._card = this._getTemplate();
    this._cardTitle = this._card.querySelector('.photo__title');
    this._cardImage = this._card.querySelector('.photo__image');
    this._cardDeleteButton = this._card.querySelector('.photo__delete-button');
    this._cardLikeButton = this._card.querySelector('.photo__like-button');
    this._cardLikeCounter = this._card.querySelector('.photo__like-count');
    this._cardTitle.textContent = this._name;
    this._cardImage.setAttribute('src', this._link);
    this._cardImage.setAttribute('alt', this._alt);
    this._cardLikeCounter.textContent = this._likes.length;

    this._setEventListeners();

    if (this._userId !== this._ownerId) {
      this._cardDeleteButton.remove();
    }

    this._likes.forEach(like => {
      if (like._id === this._userId) {
        this._cardLikeButton.classList.add('photo__like-button_active');
      }
    });

    return this._card;
  }
}

export { Card };
