import { BaseElement } from "./base-element.js";

export class Wrapper {
  constructor({ wrapper, tag, classes, children, content }) {
    if (wrapper != null && wrapper instanceof HTMLElement) {
      wrapper.append(...children);
      return wrapper;
    }

    const element = new BaseElement({ tag: tag || "div", classes, content });

    if (children) {
      element.append(...children);
    }

    return element;
  }
}
