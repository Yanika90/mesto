const popupEdit = document.querySelector(".popup"); // поп-ап

const profileButtonEdit = document.querySelector(".profile__edit-button"); // кнопка редактирования
const profileCloseButtonEdit = document.querySelector(".popup__close-button"); // кнопка закрытия поп-апа

const profileName = document.querySelector(".profile__name"); // данные профиля в строке "имя"
const profileAboutYourself = document.querySelector(".profile__about-yourself"); // данные профиля в строке "о себе"

const formElement = document.querySelector(".popup__input-form"); // форма для ввода данных

const userNameInput = document.querySelector(".popup__input_type_name"); // поле ввода "имя"
const userAboutYourselfInput = document.querySelector(
    ".popup__input_type_about-yourself"
); // поле ввода "о себе"

//функции: открытия и закрытия поп-апа (добавление и удаление класса), обработчик «отправки» формы
function openPopup(popup) {
    popup.classList.add("popup_opened");
    userNameInput.value = profileName.textContent; // имя профиля присваиваем (=) значению (.value) поля ввода имени в форме поп-апа
    userAboutYourselfInput.value = profileAboutYourself.textContent; // аналогично с "о себе"
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
}

function handleFormSubmit(evt) {
    evt.preventDefault(); // отмена отправки формы
    profileName.textContent = userNameInput.value; // новое содержимое-значение (value) присваивается полю ввода имени - свойству textContent переменной
    profileAboutYourself.textContent = userAboutYourselfInput.value; // аналогично
    closePopup(popupEdit);
}

// обработчики события: по клику открытие и закрытие, отправка данных (submit)
profileButtonEdit.addEventListener("click", function () {
    openPopup(popupEdit);
});

profileCloseButtonEdit.addEventListener("click", function () {
    closePopup(popupEdit);
});

formElement.addEventListener("submit", handleFormSubmit);

// СПРИНТ 5
// Карточки
// Создание массива с карточками
const photoCards = [
    {
        title: "Морской котик",
        alt: "Морской котик погружается в воду",
        image: "https://images.unsplash.com/photo-1504436965013-d4d16fd26afa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
        title: "Синий кит",
        alt: "Синий кит",
        image: "https://images.unsplash.com/photo-1566392421529-bdba2f3d933d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
    },
    {
        title: "Медуза",
        alt: "Медуза",
        image: "https://images.unsplash.com/photo-1626288937173-9506afb2fc7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
    },
    {
        title: "Коралловый риф",
        alt: "Коралловый риф",
        image: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
    },
    {
        title: "Скат",
        alt: "Скат",
        image: "https://images.unsplash.com/photo-1582012446386-1682363c2f1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    },
    {
        title: "Морская черепаха",
        alt: "Морская черепаха",
        image: "https://images.unsplash.com/photo-1591025207163-942350e47db2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
];

// рефакторинг карточек с помощью tamplate
const cardsContainer = document.querySelector(".photos");
// создание карточки
const createCard = (card) => {
    const newCard = document
        .querySelector("#cardTemplate")
        .content.cloneNode(true);
    const cardTitle = newCard.querySelector(".photo__title");
    const cardImage = newCard.querySelector(".photo__image");
    const cardDeleteButton = newCard.querySelector(".photo__delete-button");
    const cardLikeButton = newCard.querySelector(".photo__like-button");

    cardTitle.textContent = card.title;
    cardImage.setAttribute("src", card.image);
    cardImage.setAttribute("alt", card.alt);

    // обработчик события: удаление карточки
    cardDeleteButton.addEventListener("click", handleDeleteButtonClick);
    
    // обработчик события: нравится карточка
    cardLikeButton.addEventListener("click", handleLikeButtonClick);
    
    cardsContainer.append(newCard);
};

//цикл для массива с определенной функцией (метод forEach принимает функцию в качестве аргумента)
photoCards.forEach(createCard);

// фунуция удаления карточки
 function handleDeleteButtonClick(evt) {
    const button = evt.target;
    const photo = button.closest(".photo");
    photo.remove();
}

// функция лайка карточки
function handleLikeButtonClick(evt) {
    const buttonLike = evt.target;
    buttonLike.classList.toggle("photo__like-button_active");
}

//Добавление карточки