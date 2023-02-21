const popupEdit = document.querySelector('.popup'); // поп-ап

const profileButtonEdit = document.querySelector('.profile__edit-button'); // кнопка редактирования
const profileCloseButtonEdit = document.querySelector('.popup__close-button'); // кнопка закрытия поп-апа

const profileName = document.querySelector('.profile__name'); // данные профиля в строке "имя"
const profileAboutYourself = document.querySelector('.profile__about-yourself'); // данные профиля в строке "о себе"

const formElement = document.querySelector('.popup__input-form'); // форма для ввода данных

const userNameInput = document.querySelector('.popup__input_type_name'); // поле ввода "имя"
const userAboutYourselfInput = document.querySelector('.popup__input_type_about-yourself'); // поле ввода "о себе"

//функции: открытия и закрытия поп-апа (добавление и удаление класса), обработчик «отправки» формы
function openPopup(popup) {
    popup.classList.add('popup_opened');
    userNameInput.value = profileName.textContent; // имя профиля присваиваем (=) значению (.value) поля ввода имени в форме поп-апа
    userAboutYourselfInput.value = profileAboutYourself.textContent; // аналогично с "о себе"
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
    evt.preventDefault(); // отмена отправки формы
    profileName.textContent = userNameInput.value; // новое содержимое-значение (value) присваивается полю ввода имени - свойству textContent переменной 
    profileAboutYourself.textContent = userAboutYourselfInput.value; // аналогично
    closePopup(popupEdit);
}

// обработчики события: по клику открытие и закрытие, отправка данных (submit)
profileButtonEdit.addEventListener('click', function() {
    openPopup(popupEdit);
});

profileCloseButtonEdit.addEventListener('click', function() {
    closePopup(popupEdit);
});

formElement.addEventListener('submit', handleFormSubmit);