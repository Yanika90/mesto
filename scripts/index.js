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
  resetFormError(config, profilePopup);
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
  clearInputError(config, cardPopup);
});

// СПРИНТ 6
// Валидация форм console.log()
// config будем использовать для замены обращения/поиска по селекторам и класса (добавляем в него все нужные элементы)
const config = {
  formSelector: '.popup__input-form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_type_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_type_active'
};

// функции показа и скрытия ошибки (передать в checkInputValidity)
const showInputError = (config, formElement, inputElement, validationMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  console.log(errorElement);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = validationMessage;
};

const hideInputError = (config, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

// проверка валидности данных
const checkInputValidity = (config, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(config, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(config, formElement, inputElement);
  }
};

// проверка валидности импутов
const hasInvalidInput = inputList => {
  return inputList.some(inputElement => {
    //Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция вернёт true
    return !inputElement.validity.valid;
  });
};

// функция для обработки состояния кнопки "сохранить"
const toggleButtonState = (config, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

// накладываем обработчики на поля форм
const setEventListeners = (config, formElement) => {
  //находим импуты
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  // находим кнопку "сохранить"
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(config, inputList, buttonElement);

  // проверяем элементы на валидность
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(config, formElement, inputElement);
      toggleButtonState(config, inputList, buttonElement);
    });
  });
};

// запуск процесса наложения валидации форм
const enableValidation = config => {
  //находим формы
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  //накладываем запрет на встроеную отправку данныйх браузером
  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    setEventListeners(config, formElement);
  });
};

// функция сброса отметок невалидности формы при повторном откритии
const resetFormError = (config, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach(inputElement => {
    hideInputError(config, formElement, inputElement);
  });
  toggleButtonState(config, inputList, buttonElement);
};

enableValidation(config);
