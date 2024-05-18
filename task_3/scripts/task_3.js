import { functions as functions1 } from "../../task_1/task_1.js";
import { functions as functions2 } from "../../task_2/task_2.js";
import { Storage } from "./storage.js";
import { PracticeArea } from "./practice-area.js";
import { JSTest } from "./js-test.js";
import { Wrapper } from "./common-components/wrapper.js";
import { HistoryPopup } from "./history-popup.js";

const QUESTIONS = [
  {
    question:
      "Какой цикл используется для выполнения блока кода, пока условие истинно?",
    answers: ["for", "while", "do-while", "foreach"],
    correctAnswer: "while",
  },
  {
    question: "Какой цикл гарантированно выполнится хотя бы один раз?",
    answers: ["for", "while", "do-while", "foreach"],
    correctAnswer: "do-while",
  },
  {
    question:
      "Какое ключевое слово используется для пропуска текущей итерации цикла и перехода к следующей итерации?",
    answers: ["skip", "next", "continue", "pass"],
    correctAnswer: "continue",
  },
  {
    question: "Какой цикл используется для итерации по свойствам объекта?",
    answers: ["for...in", "while", "do-while", "Object.for"],
    correctAnswer: "for...in",
  },
  {
    question:
      "Какой ключевое слово используется для выхода из цикла преждевременно?",
    answers: ["break", "continue", "end", "exit"],
    correctAnswer: "break",
  },
  {
    question: "Какое свойство возвращает количество элементов в массиве?",
    answers: ["length", "size", "count", "items"],
    correctAnswer: "length",
  },
  {
    question:
      "Какой метод добавляет один или несколько элементов в конец массива?",
    answers: ["push", "add", "append", "insert"],
    correctAnswer: "push",
  },
  {
    question: "Какой метод удаляет последний элемент из массива?",
    answers: ["pop", "remove", "delete", "shift"],
    correctAnswer: "pop",
  },
  {
    question:
      "Какой метод используется для добавления обработчика события к элементу?",
    answers: ["addEventListener", "addHandler", "listenForEvent", "bind"],
    correctAnswer: "addEventListener",
  },
  {
    question: "Какое событие происходит, когда страница полностью загружена?",
    answers: ["load", "ready", "complete", "start"],
    correctAnswer: "load",
  },
];

const ModeEnum = {
  PRACTICE: "practice",
  TEST: "test",
};

class App {
  #toggler = document.getElementById("mode-toggler");
  #practice = document.getElementById("practice");
  #userРistoryButton = document.getElementById("user-history");
  #authButton = document.getElementById("auth");
  #currentMode = ModeEnum.PRACTICE;

  #storage;
  constructor(storage) {
    this.#storage = storage;
    this.#toggler.addEventListener("click", this.#toggleMode.bind(this));
    this.#createHistoryPopup(this.#userРistoryButton, this.#storage);
    this.#auth(this.#authButton, this.#storage);
  }

  run(mode) {
    this.#clearContainer(this.#practice);

    switch (mode) {
      case ModeEnum.TEST:
        {
          this.#practice.classList.add("js-test");
          new JSTest({
            entryPoint: this.#practice,
            questions: QUESTIONS,
            storage: this.#storage,
          });
          this.#toggler.innerHTML = "Разобрать задачи";
        }
        break;
      case ModeEnum.PRACTICE:
      default:
        {
          this.#practice.classList.remove("js-test");
          new PracticeArea({
            entryPoint: this.#practice,
            functions: [...functions1, ...functions2],
            storage: this.#storage,
            onOpenTest: () => {
              this.#toggleMode();
            },
          });

          this.#toggler.innerHTML = "Начать тест";
        }
        break;
    }
  }

  #clearContainer(container) {
    container.innerHTML = "";
  }

  #toggleMode() {
    this.#currentMode =
      this.#currentMode === ModeEnum.PRACTICE
        ? ModeEnum.TEST
        : ModeEnum.PRACTICE;

    this.run(this.#currentMode);
  }

  #auth(authButton, storage) {
    this.#displayButtonName(authButton, storage);

    authButton.addEventListener("click", () => {
      const newUsername = prompt("Введите ваше имя");

      if (newUsername) {
        this.#storage.set("username", newUsername);
      }

      this.#displayButtonName(authButton, storage);
    });
  }

  #displayButtonName(authButton, storage) {
    const username = storage.get("username");

    if (username) {
      authButton.textContent = "Сменить имя";
    } else {
      authButton.textContent = "Авторизоваться";
    }
  }

  #createHistoryPopup(userРistoryButton, storage) {
    let historyPopup;

    userРistoryButton.addEventListener("click", () => {
      if (historyPopup) {
        return;
      }
      historyPopup = new HistoryPopup(storage);

      new Wrapper({
        wrapper: document.body,
        children: [historyPopup],
      });

      function closePopup(e) {
        if (
          historyPopup &&
          e.target.id !== "user-history" &&
          !historyPopup.contains(e.target)
        ) {
          historyPopup.remove();
          historyPopup = null;
          document.removeEventListener("click", closePopup);
        }
      }

      document.addEventListener("click", closePopup);
    });
  }
}

const app = new App(new Storage());
app.run();
