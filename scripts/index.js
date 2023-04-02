import { Card, photoCards } from './Card.js';
import { FormValidator, config } from './FormValidator.js';

//Поп-апы
const popups = document.querySelectorAll('.popup'); // все поп-апы
const profilePopup = document.querySelector('.popup_type_edit-profile'); // профиль
const cardPopup = document.querySelector('.popup_type_add-card'); // фотокарточка

//Кнопки открытия и закрытия поп-апов
const profileButtonEdit = document.querySelector('.profile__edit-button'); // редактировать профиль
const popupAddCardButton = document.querySelector('.profile__add-button'); // добавить карточку
const closeButtons = document.querySelectorAll('.popup__close-button'); // все крестики

//Форма редактирования профиля
const formElementProfile = document.querySelector('.popup__input-form_type_edit-profile'); // форма для ввода данных
const profileName = document.querySelector('.profile__name'); // данные профиля в строке "имя"
const profileAboutYourself = document.querySelector('.profile__about-yourself'); // данные профиля в строке "о себе"
const userNameInput = document.querySelector('.popup__input_type_name'); // поле ввода "имя"
const userAboutYourselfInput = document.querySelector('.popup__input_type_about-yourself'); // поле ввода "о себе"

//Форма добавления карточки
const formElementCard = document.querySelector('.popup__input-form_type_add-card'); // форма для ввода данных
const placeNameInput = document.querySelector('.popup__input_type_name-place'); // название карточки
const placeLinkInput = document.querySelector('.popup__input_type_link-place'); // ссылка на картинку

//Контейнер с карточками
const cardsContainer = document.querySelector('.photos');

//Валидация форм
const validationProfilePopup = new FormValidator(config, profilePopup); // профиль
validationProfilePopup.enableValidation();
const validationCardPopup = new FormValidator(config, cardPopup); // карточка
validationCardPopup.enableValidation();

//Общие функции: открытия и закрытия поп-апов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleClosePopupEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleClosePopupEsc);
}

// Функция закрытия поп-апов по клику на оверлэй и крестики
popups.forEach(popup => {
  popup.addEventListener('mousedown', evt => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }

    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
});

// Функция закрытия поп-апов по Esc (передать слушатель в open и снять с close)
function handleClosePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

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
  validationProfilePopup.resetFormError();
});

// Обработчик «отправки» данных формы (submit)
formElementProfile.addEventListener('submit', handleProfileEdit);

// Выполнение функции создания карточки для каждого элемента (метод forEach принимает функцию в качестве аргумента)
photoCards.forEach(card => {
  addCard(card);
});

//Добавляем карточку на страницу
function addCard(card) {
  const newCard = new Card(card, '#cardTemplate');
  const cardElement = newCard.generateCard();
  cardsContainer.prepend(cardElement);
}

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

// Обработчики события для добавления карточки по клику: открытие и закрытие
popupAddCardButton.addEventListener('click', function () {
  openPopup(cardPopup);
  formElementCard.reset();
  validationCardPopup.resetFormError();
});

export { openPopup };
