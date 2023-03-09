//Поп-апа профиля
const profilePopup = document.querySelector('.popup_type_edit-profile');
//Кнопки открытия и закрытия поп-апов
const profileButtonEdit = document.querySelector('.profile__edit-button');
const popupAddCardButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close-button'); // находим все крестики
//Поля формы редактирования профиля
const formElementProfile = document.querySelector('.popup__input-form_type_edit-profile'); // форма для ввода данных
const profileName = document.querySelector('.profile__name'); // данные профиля в строке "имя"
const profileAboutYourself = document.querySelector('.profile__about-yourself'); // данные профиля в строке "о себе"
const userNameInput = document.querySelector('.popup__input_type_name'); // поле ввода "имя"
const userAboutYourselfInput = document.querySelector('.popup__input_type_about-yourself'); // поле ввода "о себе"

//Общие функции: открытия и закрытия поп-апов
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

closeButtons.forEach(button => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

// Функция редактирования профиля: перезапись данных, присвоение
function handleProfileEdit(evt) {
  evt.preventDefault(); // отмена отправки формы
  profileName.textContent = userNameInput.value; // новое содержимое-значение (value) присваивается полю ввода имени - свойству textContent переменной
  profileAboutYourself.textContent = userAboutYourselfInput.value; // аналогично
  closePopup(profilePopup);
}

// Обработчики события для профиля по клику: открытие и закрытие
profileButtonEdit.addEventListener('click', function () {
  openPopup(profilePopup);
  userNameInput.value = profileName.textContent; // имя профиля присваиваем (=) значению (.value) поля ввода имени в форме поп-апа
  userAboutYourselfInput.value = profileAboutYourself.textContent; // аналогично с "о себе"
});

// Обработчик «отправки» данных формы (submit)
formElementProfile.addEventListener('submit', handleProfileEdit);

// СПРИНТ 5
// Карточки
// Создание массива с карточками
const photoCards = [
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
  },
  {
    title: 'Медуза',
    alt: 'Медуза',
    image:
      'https://images.unsplash.com/photo-1626288937173-9506afb2fc7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
  },
  {
    title: 'Синий кит',
    alt: 'Синий кит',
    image:
      'https://images.unsplash.com/photo-1566392421529-bdba2f3d933d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'
  },
  {
    title: 'Морской котик',
    alt: 'Морской котик погружается в воду',
    image:
      'https://images.unsplash.com/photo-1504436965013-d4d16fd26afa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  }
];

// Рефакторинг карточек с помощью tamplate
const cardsContainer = document.querySelector('.photos');
// Добавление поп-апа карточки
const formElementCard = document.querySelector('.popup__input-form_type_add-card');
const cardPopup = document.querySelector('.popup_type_add-card');
const placeNameInput = document.querySelector('.popup__input_type_name-place');
const placeLinkInput = document.querySelector('.popup__input_type_link-place');
// Попап изображения
const imagePopupOpen = document.querySelector('.popup_type_image-open');
const imagePopup = document.querySelector('.popup__image');
const imageTitle = document.querySelector('.popup__image-title');
// Передаем содержимое template методом .content
const templateCard = document.querySelector('#cardTemplate').content;

// Создание карточки
const createCard = card => {
  const newCard = templateCard.cloneNode(true); // клонирование карточки
  const cardTitle = newCard.querySelector('.photo__title');
  const cardImage = newCard.querySelector('.photo__image');
  const cardDeleteButton = newCard.querySelector('.photo__delete-button');
  const cardLikeButton = newCard.querySelector('.photo__like-button');

  cardTitle.textContent = card.title;
  cardImage.setAttribute('src', card.image);
  cardImage.setAttribute('alt', card.alt);

  // обработчик события: удаление карточки
  cardDeleteButton.addEventListener('click', handleDeleteButtonClick);

  // обработчик события: нравится карточка
  cardLikeButton.addEventListener('click', handleLikeButtonClick);

  // обработчик открытия просмотра изображения
  cardImage.addEventListener('click', handleImagePopupOpen => {
    openPopup(imagePopupOpen);
    imageTitle.textContent = card.title;
    imagePopup.setAttribute('src', card.image);
    imagePopup.setAttribute('alt', card.alt);
  });

  return newCard;
};

//Добавляем карточку на страницу
const addCard = card => {
  cardsContainer.prepend(createCard(card));
};

// Выполнение функции создания карточки для каждого элемента (метод forEach принимает функцию в качестве аргумента)
photoCards.forEach(card => addCard(card));

// функция отправки данных формы добавления карточки
function handleCardAdd(evt) {
  evt.preventDefault();
  const title = placeNameInput.value;
  const image = placeLinkInput.value;
  const alt = placeNameInput.value;
  const card = { title, alt, image };
  addCard(card);
  closePopup(cardPopup);
}

// Обработчик «отправки» данных формы (submit)
formElementCard.addEventListener('submit', handleCardAdd);

// фунуция удаления карточки
function handleDeleteButtonClick(evt) {
  const button = evt.target;
  const photo = button.closest('.photo');
  photo.remove();
}

// функция лайка карточки
function handleLikeButtonClick(evt) {
  const buttonLike = evt.target;
  buttonLike.classList.toggle('photo__like-button_active');
}

// Обработчики события для добавления карточки по клику: открытие и закрытие
popupAddCardButton.addEventListener('click', function () {
  openPopup(cardPopup);
  formElementCard.reset();
});
