import './index.css';
import {
  profilePopup,
  cardPopup,
  avatarPopup,
  profileButtonEdit,
  avatarButtonEdit,
  popupAddCardButton,
  userNameInput,
  userAboutYourselfInput
} from '../utils/restConst.js';
import { Card } from '../components/Card.js';
import { config } from '../utils/configValidation.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/API.js';

//--------------------------------------------- API ---------------------------------------------------//
let userId;

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: 'e368c92f-c32b-427b-8564-6fade10747a3',
    'Content-Type': 'application/json'
  }
});

Promise.all([api.getUserInfo(), api.getPhotoCards()])
  .then(([userData, cardData]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData.avatar);
    cardSection.renderItems(cardData);
  })
  .catch(err => {
    console.log(`Ошибка сервера: ${err}`);
  });

//------------------------------------------- ВАЛИДАЦИЯ ФОРМ ------------------------------------------------------//

const validationProfilePopup = new FormValidator(config, profilePopup); // профиль
validationProfilePopup.enableValidation();
const validationCardPopup = new FormValidator(config, cardPopup); // карточка
validationCardPopup.enableValidation();
const validationAvatarPopup = new FormValidator(config, avatarPopup); // аватар
validationAvatarPopup.enableValidation();

//--------------------------------------------- КЛАССЫ ФОРМ ---------------------------------------------------//

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~  ВСЁ, ЧТО КАСАЕТСЯ ПРОФИЛЯ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ //

// О пользователе
const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userAboutSelector: '.profile__about-yourself',
  userAvatarSelector: '.profile__avatar'
});

// Форма профиля
const popupProfile = new PopupWithForm('.popup_type_edit-profile', {
  handleSubmitForm: data => {
    popupProfile.renderLoading(true);
    api
      .editUserInfo(data)
      .then(res => {
        userInfo.setUserInfo(res);
        popupProfile.close();
      })
      .catch(err => {
        console.log(`При редактировании профиля возникла ошибка: ${err}`);
      })
      .finally(() => {
        popupProfile.renderLoading(false);
      });
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

// Аватар
const newAvatar = new PopupWithForm('.popup_type_avatar-edit', {
  handleSubmitForm: data => {
    newAvatar.renderLoading(true);
    api
      .editUserAvatar(data)
      .then(res => {
        userInfo.setUserAvatar(res.avatar);
        newAvatar.close();
      })
      .catch(err => {
        console.log(`При изменении аватара возникла ошибка: ${err}`);
      })
      .finally(() => {
        newAvatar.renderLoading(false);
      });
  }
});

newAvatar.setEventListeners();

avatarButtonEdit.addEventListener('click', () => {
  newAvatar.open();
  validationAvatarPopup.resetFormError();
});

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ВСЁ, ЧТО КАСАЕТСЯ КАРТОЧЕК ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ //

//Фотокарточка
const popupCard = new PopupWithForm('.popup_type_add-card', {
  handleSubmitForm: ({ placeNameInput, placeLinkInput }) => {
    popupCard.renderLoading(true);
    api
      .addCard({ name: placeNameInput, link: placeLinkInput })
      .then(data => {
        cardSection.addItem(createCard(data));
        popupCard.close();
      })
      .catch(err => {
        console.log(`При добавлении карточки возникла ошибка: ${err}`);
      })
      .finally(() => {
        popupCard.renderLoading(false);
      });
  }
});

popupCard.setEventListeners();

popupAddCardButton.addEventListener('click', () => {
  popupCard.open();
  validationCardPopup.resetFormError();
});

const cardSection = new Section(
  {
    renderer: item => {
      cardSection.addItem(createCard(item));
    }
  },
  '.photos'
);

// Создаем карточку и возвращаем ее
function createCard(data) {
  const newCard = new Card(data, userId, '#cardTemplate', {
    handleCardClick: data => {
      popupWithImage.open(data);
    },
    handleDeleteCardClick: card => {
      deleteCardPopup.open();
      deleteCardPopup.setSubmitAction(() => {
        api
          .deleteCard(data)
          .then(res => {
            card.deleteCard(res);
            deleteCardPopup.close();
          })
          .catch(err => {
            console.log(`При удалении карточки возникла ошибка: ${err}`);
          });
      });
    },
    handleLikeClick: () => {
      if (!newCard.isLiked()) {
        api
          .likeCard(data._id)
          .then(data => {
            newCard.likeCard(data.likes.length);
          })
          .catch(err => {
            console.log(`При добавлении лайка возникла ошибка: ${err}`);
          });
      } else {
        api
          .dislikeCard(data._id)
          .then(data => {
            newCard.likeCard(data.likes.length);
          })
          .catch(err => {
            console.log(`При удалении лайка возникла ошибка: ${err}`);
          });
      }
    }
  });
  const cardElement = newCard.generateCard();
  return cardElement;
}

// Попап фотокарточки
const popupWithImage = new PopupWithImage('.popup_type_image-open');
popupWithImage.setEventListeners();

// Попап удаления карточки
const deleteCardPopup = new PopupWithConfirmation('.popup_type_image-delete');
deleteCardPopup.setEventListeners();
