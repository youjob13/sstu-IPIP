import { BaseElement } from "./base-element.js";
import { Control } from "./control.js";
import { Wrapper } from "./wrapper.js";

export class RedioGroup extends BaseElement {
  constructor(props) {
    const element = super({
      ...props,
      tag: "div",
      classes: [...(props?.classes ?? []), "radio-group"],
    });

    const answerElems = props.options.map((option, optionIndex) => {
      const id = `${props.name}-${optionIndex}`;

      const answerElement = new Control({
        attributes: {
          type: "radio",
          value: optionIndex,
          name: props.name,
          id,
        },
        content: option,
      });

      const lable = new BaseElement({
        tag: "label",
        attributes: {
          for: id,
        },
        styles: {
          marginLeft: "2px",
          marginRight: "10px",
        },
        content: option,
      });

      return [answerElement, lable];
    });

    element.addEventListener(props.eventType ?? "change", props.handler);

    return new Wrapper({
      wrapper: element,
      children: answerElems.flat(),
    });
  }
}
