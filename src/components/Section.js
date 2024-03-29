export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Добавляем карточку в DOM
  addItem(card) {
    this._container.prepend(card);
  }

  // Отрисовка каждого отдельного элемента
  renderItems(items) {
    items.forEach(item => this._renderer(item));
  }
}
