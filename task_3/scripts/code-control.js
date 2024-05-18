import { BaseElement } from "./common-components/base-element.js";
import { Control } from "./common-components/control.js";
import { Button } from "./common-components/button.js";
import { Wrapper } from "./common-components/wrapper.js";

class DefaultStrategy {
  getContent(result) {
    return result;
  }
}

class ObjectStrategy {
  getContent(result) {
    return Object.keys(result).reduce((wrapper, key) => {
      wrapper.append(
        document.createTextNode(`${key}: ${result[key]};`),
        document.createElement("br")
      );
      return wrapper;
    }, new Wrapper({ tag: "div" }));
  }
}

class NodeElemStrategy {
  #isArray = false;
  constructor(isArray = false) {
    this.#isArray = isArray;
  }

  getContent(result) {
    if (this.#isArray) {
      return Object.keys(result).reduce((wrapper, key) => {
        wrapper.append(result[key]);
        return wrapper;
      }, new Wrapper({ tag: "div" }));
    }

    return result;
  }
}

export class CodeControl {
  constructor(entryPointId, predefinedCode, onExecuteCode) {
    return this.#init(entryPointId, predefinedCode, onExecuteCode);
  }

  #init(entryPointId, predefinedCode, onExecuteCode) {
    return this.#createUserCodeInput({
      entryPointId,
      predefinedCode,
      onExecuteCode,
    });
  }

  #reinitContainer(containerId) {
    const output = document.getElementById(containerId);
    output.innerHTML = "";
    return output;
  }

  #createUserCodeInput({ entryPointId, predefinedCode, onExecuteCode }) {
    const codeInput = new Control({
      tag: "textarea",
      id: `control_${entryPointId}`,
      placeholder: "Введите ваш JavaScript код здесь",
      value: predefinedCode || "",
    });

    const button = new Button({
      content: "Выполнить код",
      handler: this.#executeUserCode.bind(this, entryPointId, onExecuteCode),
    });

    const output = new BaseElement({
      tag: "p",
      id: `output_${entryPointId}`,
      classes: ["code-control__output"],
    });

    const outputWrapper = new Wrapper({
      classes: ["code-control__output_wrapper"],
      content: "Результат:",
      children: [output],
    });

    return new Wrapper({
      classes: ["code-control__input_wrapper"],
      children: [codeInput, button, outputWrapper],
    });
  }

  #executeUserCode(entryPointId, onExecuteCode, event) {
    event.preventDefault();

    const code = document.getElementById(`control_${entryPointId}`).value;

    if (code.trim() === "") {
      document.getElementById(`output_${entryPointId}`).innerText =
        "Введите код для выполнения";
      return;
    }

    try {
      const output = this.#reinitContainer(`output_${entryPointId}`);

      const result = eval(`(${code})()`);
      const strategy = this.#selectCodeResultStrategy(result);
      const outputContent = strategy.getContent(result);

      output.append(outputContent);
    } catch (error) {
      console.error(error);
      output.innerText = "Ошибка: " + error.message;
    }

    onExecuteCode();
  }

  #selectCodeResultStrategy(result) {
    switch (true) {
      case Array.isArray(result) && result[0] instanceof HTMLElement:
        return new NodeElemStrategy(true);
      case Array.isArray(result) && typeof result[0] !== "object":
        return new DefaultStrategy();
      case result instanceof HTMLElement:
        return new NodeElemStrategy();
      case typeof result === "object":
        return new ObjectStrategy();
      default:
        return new DefaultStrategy();
    }
  }
}
