const editProfileButton = document.querySelector('.profile__edit-button'); // создаем переменную кнопки редактирования
const popupEdit = document.querySelector('.popup'); // переменная редактирования поп-апа

//общая функция открытия всех поп-апов
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

//общая функция закрытия всех поп-апов
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

//создание обработчика события - нажатие на кнопку редактирования (метод)
editProfileButton.addEventListener('click', function() {
    openPopup(popupEdit);
});

const editProfileCloseButton = document.querySelector('.popup__close-button'); // переменная кнопки закрытия
//создание обработчика события - закрытие поп-апа
editProfileCloseButton.addEventListener('click', function() {
    closePopup(popupEdit);
});


//создание переменных: данных пользователя 
const userName = 'Жак-Ив Кусто';

const userAboutYourself = 'Исследователь океана';

//для полей карточочек профайла и используем метод возврата переменной по классу

const profileName = document.querySelector('.profile__name');

const profileAboutYourself = document.querySelector('.profile__about-yourself');

const userNameInput = document.querySelector('.popup__input_name');
userNameInput.value = userName; //метод присваивания значения, чтобы значения профиль = карточка

const userAboutYourselfInput = document.querySelector('.popup__input_about_yourself');
userAboutYourselfInput.value = userAboutYourself;

// создаем переменную для редактированния данных профиля
// Находим форму в DOM
const editProfileElements = document.querySelector('.popup__container'); 
// Находим поля формы в DOM
const inputName = document.querySelector('.popup__input_name');
const inputAboutYourself = document.querySelector('.popup__input_about_yourself');

// Создаем обработчик «отправки» формы (пока без отправки)
function handleFormSubmit (evt) {
        evt.preventDefault(); // эта строчка отменяет стандартную отправку формы.
        profileName.textContent = inputName.value; // textContent используем для записи в поля ввода новые значения строк
        profileAboutYourself.textContent = inputAboutYourself.value;
        closePopup(popupEdit);
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
editProfileElements.addEventListener('submit', handleFormSubmit); 