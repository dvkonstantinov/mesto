export { Section };

class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems(items) {
    this._items = items
    this._items.forEach((item) => {
      const cardElement = this._renderer(item);
    });
  }

  addItem(item) {
    this._container.prepend(item);
  }
}
