export const functions = [
  {
    fn: function () {
      const variable = Math.random() > 0.5 ? "Hello" : undefined;

      return variable == undefined
        ? `[Variable]: is empty; [Type]: ${typeof variable}`
        : `[Variable]: ${variable}; [Type]: ${typeof variable}`;
    },
    title: "Условия",
    description:
      "Создать переменную, узнать ее тип, добавить вывод на экран текста, в зависимости от значения (if else)",
  },
  {
    fn: function () {
      const zodiacSignsMap = new Map([
        ["aries", "Aries"],
        ["taurus", "Taurus"],
        ["gemini", "Gemini"],
        ["cancer", "Cancer"],
        ["leo", "Leo"],
        ["virgo", "Virgo"],
        ["libra", "Libra"],
        ["scorpio", "Scorpio"],
        ["sagittarius", "Sagittarius"],
        ["capricorn", "Capricorn"],
        ["aquarius", "Aquarius"],
        ["pisces", "Pisces"],
      ]);

      const select = document.createElement("select");
      select.addEventListener("change", (event) => {
        const selectedValue = event.target.value;

        switch (selectedValue) {
          case "aries":
          case "taurus":
          case "gemini":
          case "cancer":
          case "leo":
          case "virgo":
          case "libra":
          case "scorpio":
          case "sagittarius":
          case "capricorn":
          case "aquarius":
          case "pisces":
            alert(
              `Привет! Твой знак зодика - ${zodiacSignsMap.get(selectedValue)}`
            );
            break;
          default:
            alert("Выберите знак зодиака из списка!");
        }
      });

      const options = Array.from(zodiacSignsMap.entries()).map(
        ([value, displayValue]) => {
          const option = document.createElement("option");
          option.value = value;
          option.text = displayValue;
          return option;
        }
      );

      select.append(...options);

      return select;
    },
    title: "Условия 2",
    description:
      "Запросить у пользователя знак зодиака, и в зависимости от ответа выдать всплывающее окно приветствия (вместо знака зодиака, можно запросить другие данные, предполагающие несколько вариантов ответа) (switch)",
  },
  {
    fn: function () {
      const forEachLoopOutput = document.createElement("div");
      forEachLoopOutput.appendChild(document.createTextNode(`forEach: `));
      forEachLoopOutput.style.wordBreak = "break-all";

      new Array(40).fill(null).forEach((_, index) => {
        const text = document.createTextNode(`${index + 1},`);
        forEachLoopOutput.appendChild(text);
      });

      const forLoopOutput = document.createElement("div");
      forLoopOutput.appendChild(document.createTextNode(`for: `));
      forLoopOutput.style.wordBreak = "break-all";

      for (let index = 0; index < 40; index++) {
        const text = document.createTextNode(`${index + 1},`);
        forLoopOutput.appendChild(text);
      }

      const reduceOutput = document.createElement("div");
      reduceOutput.style.wordBreak = "break-all";

      const reduceOutputContent = new Array(40)
        .fill(null)
        .reduce((outputText, _, index) => {
          outputText += `${index + 1},`;
          return outputText;
        }, "reduce: ");
      reduceOutput.appendChild(document.createTextNode(reduceOutputContent));

      return [forEachLoopOutput, forLoopOutput, reduceOutput];
    },
    title: "Циклы 0",
    description:
      "Вывести все числа от 1 до 40, с использованием 3-х разных циклов",
  },
  {
    fn: function () {
      const button = document.createElement("button");
      button.textContent = "Нажми меня :)";

      button.addEventListener("click", (event) => {
        event.preventDefault();

        for (let index = 0; index < 5; index++) {
          alert("А ведь это мог быть бесконечный цикл и утечка памяти!");
        }
      });

      return button;
    },
    title: "Вирусная страница",
    description:
      "Создайте вирусную страницу с постоянно повторяющемся сообщением",
  },
  {
    fn: function () {
      const startButton = document.createElement("button");
      startButton.textContent = "Начать";
      startButton.addEventListener("click", (event) => {
        event.preventDefault();
        startGame();
      });

      function startGame(
        displayText = "Давайте поиграем в игру. Введите число больше 5, чтобы начать!"
      ) {
        const userInput = window.prompt(displayText);

        const inputValue =
          userInput && userInput.trim().length !== 0 && Number(userInput);

        if (userInput == null) {
          alert("Игра окончена!");
          return;
        }

        if (typeof inputValue != "number" || isNaN(inputValue)) {
          startGame("Эм... это не число! Давай по новой!");
          return;
        }

        if (inputValue <= 5) {
          startGame("Это число не больше 5!");
          return;
        }

        alert("Поздравляю! Вы победили!");
      }

      return startButton;
    },
    title: "Игра",
    description:
      "Запросить у пользователя любое число больше 5, в случае правильного ответа выдать окошко с поздравлением, в случае неправильного ответа вывести повторное окно с вопросом (помните, что пользователь может нажать 'отмена', помните о типах данных)",
  },
  {
    fn: function () {
      return new Array(21)
        .fill(null)
        .map((_, index) => (index > 7 && index % 2 === 0 ? index : null))
        .filter(Boolean)
        .join(", ");
    },
    title: "Четные числа",
    description: "Выведите четные числа от 8 до 20",
  },
  {
    fn: function () {
      return new Array(8)
        .fill(null)
        .map((_, index) => (index !== 5 && index % 2 !== 0 ? index : null))
        .filter(Boolean)
        .join(", ");
    },
    title: "Нечетные числа",
    description: "Выведите нечетные числа от 1 до 7, пропустив 5",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  [task1, task2, task3, task4, task5, task6, task7].forEach((task, index) =>
    task(functions[index]?.fn)
  );
});

function wrapExecutableCode(code) {
  return `(${code})()`;
}

function task1(code) {
  const task_1_EntryPoint = document.getElementById("task_1");
  const result = eval(wrapExecutableCode(code));
  task_1_EntryPoint?.appendChild(document.createTextNode(result));
}

function task2(code) {
  const task_1_2EntryPoint = document.getElementById("task_1_2");
  const select = eval(wrapExecutableCode(code));
  task_1_2EntryPoint?.appendChild(select);
}

function task3(code) {
  const task_1_3EntryPoint = document.getElementById("task_1_3");

  const [forEachLoopOutput, forLoopOutput, reduceOutput] = eval(
    wrapExecutableCode(code)
  );

  task_1_3EntryPoint?.append(
    forEachLoopOutput,
    document.createElement("br"),
    forLoopOutput,
    document.createElement("br"),
    reduceOutput
  );
}

function task4(code) {
  const task_1_4EntryPoint = document.getElementById("task_1_4");
  const button = eval(wrapExecutableCode(code));
  task_1_4EntryPoint?.appendChild(button);
}

function task5(code) {
  const task_1_5EntryPoint = document.getElementById("task_1_5");
  const button = eval(wrapExecutableCode(code));
  task_1_5EntryPoint?.appendChild(button);
}

function task6(code) {
  const task_1_6EntryPoint = document.getElementById("task_1_6");
  const output = eval(wrapExecutableCode(code));
  task_1_6EntryPoint?.appendChild(document.createTextNode(output));
}

function task7(code) {
  const task_1_7EntryPoint = document.getElementById("task_1_7");
  const output = eval(wrapExecutableCode(code));
  task_1_7EntryPoint?.appendChild(document.createTextNode(output));
}
