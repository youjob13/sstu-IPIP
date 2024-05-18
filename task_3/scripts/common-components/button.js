import { BaseElement } from "./base-element.js";

export class Button extends BaseElement {
  constructor(props) {
    const element = super({ ...props, tag: "button" });

    element.addEventListener(props.eventType ?? "click", props.handler);

    return element;
  }
}
