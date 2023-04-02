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

class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
  }

  // функции показа и скрытия ошибки (передать в checkInputValidity)
  _showInputError = (inputElement, validationMessage) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = validationMessage;
  };

  _hideInputError = inputElement => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  // проверка валидности данных
  _checkInputValidity = inputElement => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  // проверка валидности импутов
  _hasInvalidInput() {
    return this._inputList.some(inputElement => {
      //Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция вернёт true
      return !inputElement.validity.valid;
    });
  }

  // функция для обработки состояния кнопки "сохранить"
  _toggleButtonState = () => {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  };

  // накладываем обработчики на поля форм
  _setEventListeners = () => {
    //находим импуты
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    // находим кнопку "сохранить"
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState();

    // проверяем элементы на валидность
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  // функция сброса отметок невалидности формы при повторном откритии
  resetFormError = () => {
    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  };

  // запуск процесса наложения валидации форм
  enableValidation = () => {
    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };
}

export { FormValidator, config };

// const config = {
//   formSelector: '.popup__input-form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__save-button',
//   inactiveButtonClass: 'popup__save-button_type_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__input-error_type_active'
// };

// // функции показа и скрытия ошибки (передать в checkInputValidity)
// const showInputError = (config, formElement, inputElement, validationMessage) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add(config.inputErrorClass);
//   errorElement.classList.add(config.errorClass);
//   errorElement.textContent = validationMessage;
// };

// const hideInputError = (config, formElement, inputElement) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(config.inputErrorClass);
//   errorElement.classList.remove(config.errorClass);
//   errorElement.textContent = '';
// };

// // проверка валидности данных
// const checkInputValidity = (config, formElement, inputElement) => {
//   if (!inputElement.validity.valid) {
//     showInputError(config, formElement, inputElement, inputElement.validationMessage);
//   } else {
//     hideInputError(config, formElement, inputElement);
//   }
// };

// // проверка валидности импутов
// const hasInvalidInput = inputList => {
//   return inputList.some(inputElement => {
//     //Если поле не валидно, колбэк вернёт true
//     // Обход массива прекратится и вся функция вернёт true
//     return !inputElement.validity.valid;
//   });
// };

// // функция для обработки состояния кнопки "сохранить"
// const toggleButtonState = (config, inputList, buttonElement) => {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add(config.inactiveButtonClass);
//     buttonElement.disabled = true;
//   } else {
//     buttonElement.classList.remove(config.inactiveButtonClass);
//     buttonElement.disabled = false;
//   }
// };

// // накладываем обработчики на поля форм
// const setEventListeners = (config, formElement) => {
//   //находим импуты
//   const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
//   // находим кнопку "сохранить"
//   const buttonElement = formElement.querySelector(config.submitButtonSelector);
//   toggleButtonState(config, inputList, buttonElement);

//   // проверяем элементы на валидность
//   inputList.forEach(inputElement => {
//     inputElement.addEventListener('input', () => {
//       checkInputValidity(config, formElement, inputElement);
//       toggleButtonState(config, inputList, buttonElement);
//     });
//   });
// };

// // запуск процесса наложения валидации форм
// const enableValidation = config => {
//   //находим формы
//   const formList = Array.from(document.querySelectorAll(config.formSelector));
//   //накладываем запрет на встроеную отправку данныйх браузером
//   formList.forEach(formElement => {
//     formElement.addEventListener('submit', evt => {
//       evt.preventDefault();
//     });
//     setEventListeners(config, formElement);
//   });
// };

// // функция сброса отметок невалидности формы при повторном откритии
// const resetFormError = (config, formElement) => {
//   const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
//   const buttonElement = formElement.querySelector(config.submitButtonSelector);

//   inputList.forEach(inputElement => {
//     hideInputError(config, formElement, inputElement);
//   });
//   toggleButtonState(config, inputList, buttonElement);
// };

// enableValidation(config);
