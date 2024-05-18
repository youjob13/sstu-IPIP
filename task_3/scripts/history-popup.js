import { BaseElement } from "./common-components/base-element.js";
import { Wrapper } from "./common-components/wrapper.js";

export class HistoryPopup {
  #storage;
  constructor(storage) {
    this.#storage = storage;

    const username = this.#storage.get("username");

    return new Wrapper({
      tag: "div",
      classes: ["history-popup"],
      children: [
        new BaseElement({
          tag: "h3",
          content: username
            ? `История тестов для "${username}"`
            : "История тестов",
        }),
        new Wrapper({
          tag: "ul",
          children: this.#getHistory(),
        }),
      ],
    });
  }

  #getHistory() {
    const history = this.#storage.get("history") || [];

    if (!history.length) {
      return [
        new BaseElement({
          tag: "li",
          content: "Вы пока не проходили тесты",
        }),
      ];
    }

    return history.map(({ date, result }) => {
      const readebleDate = new Date(date).toLocaleString();
      return new BaseElement({
        tag: "li",
        content: `${readebleDate} - ${result}%`,
      });
    });
  }
}
