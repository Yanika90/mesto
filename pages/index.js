const editProfileButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup');

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}
editProfileButton.addEventListener('click', function() {
    openPopup(popupEdit);
});
const editProfileCloseButton = document.querySelector('.popup__close-button');
editProfileCloseButton.addEventListener('click', function() {
    closePopup(popupEdit);
});
const userName = 'Жак-Ив Кусто';
const userAboutYourself = 'Исследователь океана';
const profileName = document.querySelector('.profile__name');
const profileAboutYourself = document.querySelector('.profile__about-yourself');
const userNameInput = document.querySelector('.popup__input_name');
userNameInput.value = userName;
const userAboutYourselfInput = document.querySelector('.popup__input_about_yourself');
userAboutYourselfInput.value = userAboutYourself;
const editProfileElements = document.querySelector('.popup__container');
const inputName = document.querySelector('.popup__input_name');
const inputAboutYourself = document.querySelector('.popup__input_about_yourself');

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileAboutYourself.textContent = inputAboutYourself.value;
    closePopup(popupEdit);
}
editProfileElements.addEventListener('submit', handleFormSubmit);