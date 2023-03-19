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
