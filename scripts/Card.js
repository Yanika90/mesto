//Массив с карточками
const photoCards = [
  {
    title: 'Морской котик',
    alt: 'Морской котик погружается в воду',
    image:
      'https://images.unsplash.com/photo-1504436965013-d4d16fd26afa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    title: 'Синий кит',
    alt: 'Синий кит',
    image:
      'https://images.unsplash.com/photo-1566392421529-bdba2f3d933d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'
  },
  {
    title: 'Медуза',
    alt: 'Медуза',
    image:
      'https://images.unsplash.com/photo-1626288937173-9506afb2fc7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
  },
  {
    title: 'Морская черепаха',
    alt: 'Морская черепаха',
    image:
      'https://images.unsplash.com/photo-1591025207163-942350e47db2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    title: 'Скат',
    alt: 'Скат',
    image:
      'https://images.unsplash.com/photo-1582012446386-1682363c2f1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
  },
  {
    title: 'Коралловый риф',
    alt: 'Коралловый риф',
    image:
      'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
  }
];

class Card {
  constructor(data, cardTemplateSelector, handleCardClick) {
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
      this._handleCardClick(this._title, this._image);
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

export { Card, photoCards };
