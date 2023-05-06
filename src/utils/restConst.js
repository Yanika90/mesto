const profilePopup = document.querySelector('.popup_type_edit-profile'); // профиль
const cardPopup = document.querySelector('.popup_type_add-card'); // фотокарточка
const avatarPopup = document.querySelector('.popup_type_avatar-edit'); // аватар
const profileButtonEdit = document.querySelector('.profile__edit-button'); //  редактировать профиль
const avatarButtonEdit = document.querySelector('.profile__avatar-edit'); // редактировать аватар
const popupAddCardButton = document.querySelector('.profile__add-button'); // добавить карточку
const userNameInput = document.querySelector('.popup__input_type_name'); // поле ввода "имя"
const userAboutYourselfInput = document.querySelector('.popup__input_type_about-yourself'); // поле ввода "о себе"

export {
  profilePopup,
  cardPopup,
  avatarPopup,
  profileButtonEdit,
  avatarButtonEdit,
  popupAddCardButton,
  userNameInput,
  userAboutYourselfInput
};
