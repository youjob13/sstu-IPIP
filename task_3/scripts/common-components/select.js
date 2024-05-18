import { BaseElement } from "./base-element.js";
import { Wrapper } from "./wrapper.js";

export class Select extends BaseElement {
  constructor(props) {
    const element = super({ ...props, tag: "select" });

    const answerElems = props.options.map((option, optionIndex) => {
      const answerElement = new BaseElement({
        tag: "option",
        attributes: {
          value: optionIndex,
        },
        content: option,
      });

      return answerElement;
    });

    element.addEventListener(props.eventType ?? "change", props.handler);

    return new Wrapper({
      wrapper: element,
      children: answerElems,
    });
  }
}
