export class BaseElement {
  constructor({ tag, id, classes, attributes, title, content, styles }) {
    this.element = document.createElement(tag);
    if (id) {
      this.element.id = id;
    }

    if (title) {
      this.element.title = title;
    }

    if (styles) {
      Object.keys(styles).forEach((key) => {
        this.element.style[key] = styles[key];
      });
    }

    if (classes) {
      this.element.classList.add(...classes);
    }
    if (attributes) {
      Object.keys(attributes).forEach((key) => {
        this.element.setAttribute(key, attributes[key]);
      });
    }
    if (content) {
      this.element.append(content);
    }
    return this.element;
  }
}
