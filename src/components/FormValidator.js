// Валидация форм
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

export { FormValidator };
