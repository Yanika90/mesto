export default class Section {
  // Объект:
  // items — массив данных для добавления на страницу при инициализации класса;
  // renderer — функция создания и отрисовки данных на странице.
  // containerSelector - селектор контейнера, в который нужно добавлять созданные элементы.
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Принимает DOM-элемент и добавляет его в контейнер.
  // Добавляем карточку
  addItem(card) {
    this._container.prepend(card);
  }

  // Отрисовка каждого отдельного элемента
  renderItems() {
    this._renderedItems.forEach(item => this._renderer(item));
  }
}
