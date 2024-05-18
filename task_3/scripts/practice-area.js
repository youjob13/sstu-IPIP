import { CodeControl } from "./code-control.js";
import { BaseElement } from "./common-components/base-element.js";
import { Button } from "./common-components/button.js";
import { Wrapper } from "./common-components/wrapper.js";

export class PracticeArea {
  #reviewedTasks = [];
  #prevButton;
  #nextButton;

  #entryPoint;
  #functions;
  #storage;
  constructor({ entryPoint, functions, storage, onOpenTest }) {
    this.#entryPoint = entryPoint;
    this.#functions = functions;
    this.#reviewedTasks = Array.from(functions, () => false);
    this.#storage = storage;

    this.#initPracticeArea(this.#entryPoint, onOpenTest);
  }

  #initPracticeArea(entryPoint, onOpenTest) {
    const { shell, selectedTask } = this.#createShell();
    new Wrapper({ wrapper: entryPoint, children: [shell] });

    const { menu, taskSelect } = this.#createMenu(selectedTask, onOpenTest);
    new Wrapper({ wrapper: entryPoint, children: [menu] });

    const navButtons = this.#drawNavButtons(taskSelect);
    new Wrapper({ wrapper: entryPoint, children: navButtons });
  }

  #createShell() {
    const shellTitle = new BaseElement({
      tag: "h4",
      content: "Задача",
    });
    const selectedTask = new BaseElement({
      tag: "div",
      id: "practice__selected-task",
    });

    const shell = new Wrapper({
      classes: ["practice__shell"],
      children: [shellTitle, selectedTask],
    });

    return { shell, selectedTask };
  }

  #createMenu(selectedTask, onOpenTest) {
    const isReviewedMarker = new BaseElement({
      tag: "span",
      id: "is_reviewed",
    });
    const taskSelectTitle = new Wrapper({
      tag: "h4",
      content: "Выберите задачу",
      children: [isReviewedMarker],
    });
    const taskDescription = new BaseElement({
      tag: "div",
      id: "practice__description",
    });

    const createTaskDescription = this.#createTaskDescription();
    const taskSelect = new BaseElement({ tag: "select", id: "practice_menu" });
    taskSelect.addEventListener("change", (event) => {
      event.preventDefault();

      this.#redrawPractice({
        isReviewedMarker,
        selectedTask,
        taskSelect,
        createTaskDescription,
        taskDescriptionWrapper: taskDescription,
        event,
        onOpenTest,
      });
      this.#changeDisabledState(taskSelect);
    });

    const options = this.#createMenuOptions();
    taskSelect.append(...options);
    taskSelect.value = options[0].value;
    taskSelect.dispatchEvent(new Event("change"));

    return {
      menu: new Wrapper({
        classes: ["practice__menu-wrapper"],
        children: [taskSelectTitle, taskSelect, taskDescription],
      }),
      taskSelect,
    };
  }

  #reinitContainer(container, output) {
    container.innerHTML = "";
    container.append(output);
    return container;
  }

  #redrawPractice({
    isReviewedMarker,
    selectedTask,
    taskSelect,
    createTaskDescription,
    taskDescriptionWrapper,
    event,
    onOpenTest,
  }) {
    const codeShell = new CodeControl(
      "practice__selected-task",
      event.target.value,
      () => {
        this.#reviewedTasks[taskSelect.selectedIndex] = true;
        isReviewedMarker.innerHTML = "✅";

        if (this.#isAllTasksReviewed()) {
          const result = prompt("Пройдем тест?");
          if (result && !this.#storage.has("username")) {
            const username = prompt("Введите своё имя");
            this.#storage.set("username", username);
          }
          onOpenTest();
        }
      }
    );

    this.#reinitContainer(selectedTask, codeShell);

    this.#redrawTask({
      isReviewedMarker,
      taskSelect,
      createTaskDescription,
      taskDescriptionWrapper,
      event,
    });
  }

  #redrawTask({
    isReviewedMarker,
    taskSelect,
    createTaskDescription,
    taskDescriptionWrapper,
    event,
  }) {
    if (this.#reviewedTasks[taskSelect.selectedIndex]) {
      isReviewedMarker.innerHTML = "✅";
    } else {
      isReviewedMarker.innerHTML = "❌";
    }
    const description =
      createTaskDescription.find((item) => item[event.target.value])?.[
        event.target.value
      ] || "";

    taskDescriptionWrapper.innerHTML = description;
  }

  #createTaskDescription() {
    return this.#functions.map(({ fn, description }) => {
      return { [fn.toString()]: description };
    });
  }

  #createMenuOptions() {
    return this.#functions.map(({ fn, title }) => {
      const option = new BaseElement({ tag: "option" });
      option.value = fn;
      option.textContent = title;

      return option;
    });
  }

  #drawNavButtons(taskSelect) {
    this.#prevButton = new Button({
      content: "Назад",
      attributes: { disabled: true },
      handler: () => {
        const selectedIndex = taskSelect.selectedIndex;
        const isTheFirstTask = selectedIndex === 0;

        this.#changeDisabledState({
          taskSelect,
        });

        taskSelect.selectedIndex = isTheFirstTask ? 0 : selectedIndex - 1;
        taskSelect.dispatchEvent(new Event("change"));
      },
    });

    this.#nextButton = new Button({
      content: "Вперёд",
      handler: () => {
        const selectedIndex = taskSelect.selectedIndex;
        const isTheLastTask = selectedIndex === taskSelect.length - 1;

        this.#changeDisabledState(taskSelect);

        taskSelect.selectedIndex = isTheLastTask
          ? selectedIndex
          : selectedIndex + 1;
        taskSelect.dispatchEvent(new Event("change"));
      },
    });

    return [this.#prevButton, this.#nextButton];
  }

  #isAllTasksReviewed() {
    return this.#reviewedTasks.every((task) => task);
  }

  #changeDisabledState(taskSelect) {
    const selectedIndex = taskSelect.selectedIndex;
    const isTheFirstTask = selectedIndex === 0;
    const isTheLastTask = selectedIndex === taskSelect.length - 1;

    if (isTheFirstTask) {
      this.#prevButton?.setAttribute("disabled", true);
      this.#nextButton?.removeAttribute("disabled");
    } else if (isTheLastTask) {
      this.#nextButton?.setAttribute("disabled", true);
      this.#prevButton?.removeAttribute("disabled");
    } else {
      this.#prevButton?.removeAttribute("disabled");
      this.#nextButton?.removeAttribute("disabled");
    }
  }
}
