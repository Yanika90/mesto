// config будем использовать для замены обращения/поиска по селекторам и класса (добавляем в него все нужные элементы)
export const config = {
  formSelector: '.popup__input-form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_type_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_type_active'
};
