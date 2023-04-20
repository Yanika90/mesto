import { photoCards } from './photoCards.js';
import { Card } from './Card.js';
import { config } from './configValidation.js';
import { FormValidator } from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

//----------------------------------------------- ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ------------------------------------------------------//

//Поп-апы
const popups = document.querySelectorAll('.popup'); // все поп-апы
const profilePopup = document.querySelector('.popup_type_edit-profile'); // профиль
const cardPopup = document.querySelector('.popup_type_add-card'); // фотокарточка

//Кнопки открытия и закрытия поп-апов
const profileButtonEdit = document.querySelector('.profile__edit-button'); //  редактировать профиль
const popupAddCardButton = document.querySelector('.profile__add-button'); //  добавить карточку
const closeButtons = document.querySelectorAll('.popup__close-button'); //  все крестики
const submitButton = document.querySelectorAll('popup__save-button');

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
const cardsContainer = document.querySelector('.photos'); //

// Передаем содержимое template методом .content
const cardTemplateSelector = document.querySelector('#cardTemplate').content; //

//Попап изображения
const imagePopupOpen = document.querySelector('.popup_type_image-open'); // открытая картинка
const imagePopup = document.querySelector('.popup__image'); // картинка
const imageTitle = document.querySelector('.popup__image-title'); // подпись

//--------------------------------------------- КЛАССЫ ФОРМ --------------------------//

// О пользователе
const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userAboutSelector: '.profile__about-yourself'
});

// Форма профиля
const popupProfile = new PopupWithForm('.popup_type_edit-profile', {
  handleSubmitForm: data => {
    userInfo.setUserInfo({ name: data.userNameInput, about: data.userAboutYourselfInput });
    popupProfile.close();
  }
});

popupProfile.setEventListeners();

// Обработчики события для профиля по клику: открытие и закрытие
profileButtonEdit.addEventListener('click', function () {
  popupProfile.open();
  const userData = userInfo.getUserInfo();
  userNameInput.value = userData.name;
  userAboutYourselfInput.value = userData.about;
  validationProfilePopup.resetFormError();
});

// Фотокарточка
const popupCard = new PopupWithForm('.popup_type_add-card', {
  handleSubmitForm: data => {
    const newCard = createCard({ title: data.placeNameInput, image: data.placeLinkInput });
    cardSection.addItem(newCard);
    popupCard.close();
  }
});

popupCard.setEventListeners();

popupAddCardButton.addEventListener('click', () => {
  popupCard.open();
  validationCardPopup.resetFormError();
});

const cardSection = new Section(
  {
    items: photoCards,
    renderer: data => {
      const card = createCard(data);
      cardSection.addItem(card);
    }
  },
  '.photos'
);

cardSection.renderItems();

// Создаем карточку и возвращаем ее
function createCard(data) {
  const newCard = new Card(data, '#cardTemplate', {
    handleCardClick: ({ title, image }) => {
      popupWithImage.open({ title, image });
    }
  });
  const cardElement = newCard.generateCard();
  return cardElement;
}

const popupWithImage = new PopupWithImage('.popup_type_image-open');
popupWithImage.setEventListeners();

//------------------------------------------- ВАЛИДАЦИЯ ФОРМ ------------------------------------------------------//

const validationProfilePopup = new FormValidator(config, profilePopup); // профиль
validationProfilePopup.enableValidation();
const validationCardPopup = new FormValidator(config, cardPopup); // карточка
validationCardPopup.enableValidation();

//--------------------------------------- ОБЩИЕ ФУНКЦИИ ОТКРЫТИЯ И ЗАКРЫТИЯ ПОП-АПОВ ---------------------------------------------//

// //Функция открытия поп-апа
// function openPopup(popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', handleClosePopupEsc);
// }

// //Функция закрытия поп-апа
// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', handleClosePopupEsc);
// }

// // Функция закрытия поп-апов по клику на оверлэй и крестики
// popups.forEach(popup => {
//   popup.addEventListener('mousedown', evt => {
//     if (evt.target.classList.contains('popup_opened')) {
//       closePopup(popup);
//     }

//     if (evt.target.classList.contains('popup__close-button')) {
//       closePopup(popup);
//     }
//   });
// });

// // Функция закрытия поп-апов по Esc (передать слушатель в open и снять с close)
// function handleClosePopupEsc(evt) {
//   if (evt.key === 'Escape') {
//     const popupOpened = document.querySelector('.popup_opened');
//     closePopup(popupOpened);
//   }
// }

//----------------------------------------------- ВСЁ, ЧТО КАСАЕТСЯ ПРОФИЛЯ ------------------------------------------------------//

// Функция редактирования профиля: перезапись данных, присвоение
// function handleProfileEdit(evt) {
//   evt.preventDefault(); // отмена отправки формы
//   profileName.textContent = userNameInput.value; // новое содержимое-значение (value) присваивается полю ввода имени - свойству textContent переменной
//   profileAboutYourself.textContent = userAboutYourselfInput.value; // аналогично
//   Popup.profilePopup.close();
// }

// // Обработчики события для профиля по клику: открытие и закрытие
// profileButtonEdit.addEventListener('click', function () {
//   profilePopup.open();
//   userNameInput.value = profileName.textContent; // имя профиля присваиваем (=) значению (.value) поля ввода имени в форме поп-апа
//   userAboutYourselfInput.value = profileAboutYourself.textContent; // аналогично с "о себе"
//   validationProfilePopup.resetFormError();
// });

// // Обработчик «отправки» данных формы (submit)
// formElementProfile.addEventListener('submit', handleProfileEdit);

//----------------------------------------------- ВСЁ, ЧТО КАСАЕТСЯ КАРТОЧКИ ------------------------------------------------------//

// Отрисовка карточки для каждого элемента (метод forEach принимает функцию в качестве аргумента)
// photoCards.forEach(card => {
//   const cardElement = createCard(card);
//   cardsContainer.append(cardElement);
// });

// function renderCard(item) {
//   const card = createCard(item, '#cardTemplate', handleCardClick);
//   cardSection.addItem(card);
//   //cardsContainer.prepend(cardElement);
// }

// // Добавляем карточку на страницу
// function addCard(card) {
//   const cardElement = createCard(card);
//   cardsContainer.prepend(cardElement);
// }

// // Функция отправки данных формы добавления карточки
// function handleCardAdd(evt) {
//   evt.preventDefault();
//   const title = placeNameInput.value;
//   const image = placeLinkInput.value;
//   const alt = placeNameInput.value;
//   const card = { title, alt, image };
//   renderCard(card);
//   closePopup(cardPopup);
// }

// // Обработчик «отправки» данных формы (submit)
//formElementCard.addEventListener('submit', handleCardAdd);

// // Обработчик события для добавления карточки по клику: открытие и закрытие
// popupAddCardButton.addEventListener('click', function () {
//   openPopup(cardPopup);
//   formElementCard.reset();
//   validationCardPopup.resetFormError();
// });

// function handlePopupAddCardButton() {
//   cardPopup.open();
//   validationCardPopup.resetFormError();
// }

// popupAddCardButton.addEventListener('click', () => handlePopupAddCardButton);
