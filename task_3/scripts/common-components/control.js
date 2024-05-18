import { BaseElement } from "./base-element.js";

export class Control extends BaseElement {
  constructor(props) {
    const element = super({ ...props, tag: props.tag || "input" });

    if (props.placeholder) {
      element.placeholder = props.placeholder;
    }

    if (props.value) {
      element.value = props.value;
    }

    if (props.tag === "textarea") {
      element.rows = props.rows ?? 20;
      element.cols = props.cols ?? 50;
    }

    return element;
  }
}
