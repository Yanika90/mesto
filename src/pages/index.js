import './index.css';
import {
  profilePopup,
  cardPopup,
  profileButtonEdit,
  popupAddCardButton,
  userNameInput,
  userAboutYourselfInput
} from '../utils/restConst.js';
import { photoCards } from '../utils/photoCards.js';
import { Card } from '../components/Card.js';
import { config } from '../utils/configValidation.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

//------------------------------------------- ВАЛИДАЦИЯ ФОРМ ------------------------------------------------------//

const validationProfilePopup = new FormValidator(config, profilePopup); // профиль
validationProfilePopup.enableValidation();
const validationCardPopup = new FormValidator(config, cardPopup); // карточка
validationCardPopup.enableValidation();

//--------------------------------------------- КЛАССЫ ФОРМ ---------------------------------------------------//

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~  ВСЁ, ЧТО КАСАЕТСЯ ПРОФИЛЯ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ //

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

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ВСЁ, ЧТО КАСАЕТСЯ КАРТОЧЕК ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ //

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
    items: photoCards.reverse(),
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
    handleCardClick: item => {
      popupWithImage.open(item);
    }
  });
  const cardElement = newCard.generateCard();
  return cardElement;
}

const popupWithImage = new PopupWithImage('.popup_type_image-open');
popupWithImage.setEventListeners();
