export const functions = [
  {
    fn: function () {
      const arrayFrom = Array.from({ length: 21 }, (_, index) => index * 2);

      const arrayOf = Array.of(1, 2, 3, 4, 5);

      const literal = [
        "Hello!",
        "How are you?",
        "I am fine, thank you!",
        "And you?",
      ];
      return { arrayFrom, arrayOf, literal };
    },
    title: "Массивы 1",
    description: "Создать массив 3 разными способами",
  },
  {
    fn: function () {
      const arrayFrom = Array.from({ length: 5 }, (_, index) => index * 2);

      const changedArray = [...arrayFrom];
      arrayFrom[arrayFrom.length - 1] = 888;
      arrayFrom.reverse();
      arrayFrom.push(-1);
      arrayFrom.unshift(99);
      arrayFrom.splice(3, 0, 4);

      return { arrayFrom, changedArray };
    },
    title: "Массив: Измененный массив",
    description:
      "Выведите на экран 5 член вашего массива затем измените его значение ",
  },
  {
    fn: function () {
      const arrayFrom = Array.from({ length: 5 });

      const resultArray = arrayFrom.map((_, index, array) => {
        const item = document.createElement("li");
        item.textContent = `Item ${index + 1}`;
        item.title = `Array length: ${array.length}`;
        return item;
      });

      return resultArray;
    },
    title: "Больше массивов!",
    description:
      "Узнайте длину вашего массива и выведите ее значение при наведении на любой элемент",
  },
  {
    fn: function () {
      const items = [];
      for (let i = 0; i < 5; i++) {
        const item = document.createElement("li");
        item.textContent = `Item ${i + 1} has appended with "for" loop`;
        items.push(item);
      }
      return items;
    },
    title: "Циклы 1",
    description: "Выведите все элементы массива, используя цикл for",
  },
  {
    fn: function () {
      function formatDate(date) {
        const months = [
          "января",
          "февраля",
          "марта",
          "апреля",
          "мая",
          "июня",
          "июля",
          "августа",
          "сентября",
          "октября",
          "ноября",
          "декабря",
        ];

        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
      }

      const firstArray = Array.from({ length: 5 }, (_, index) => index * 2);
      const secondArray = Array.from({ length: 5 }, (_, index) => `#${index}`);
      const concatenedArray = firstArray.concat(secondArray);
      const spreadedArray = [...firstArray, ...secondArray];

      const copiedArray = [...spreadedArray];
      const removedLastElement = copiedArray.pop();
      const removedFirstElement = copiedArray.shift();
      const addedToStartElement = copiedArray.unshift("added element");

      return {
        concatenedArray,
        spreadedArray,
        copiedArray,
        removedLastElement,
        removedFirstElement,
        addedToStartElement,
        todayDate: new Date().toLocaleString(),
        formattedTodayDate: formatDate(new Date()),
      };
    },
    title: "Массивы + циклы",
    description: `1) создайте 2 массива. Объедините их в один и выведите на экран полученный массив <br />
    2) Удалите последний член получившегося массива и выведите это значение на экран <br />
    3) Удалите последний член получившегося массива и выведите это значение на экран <br />
    4) Добавьте новый элемент в начало вашего объединенного массива <br />
    5) Получите сегодняшнюю дату и выведите ее на экран <br />
    6) Выведите сегодняшнюю дату в формате 11 ноября 2020 года
    `,
  },
  {
    fn: function () {
      const randomNumber1 = Math.floor(Math.random() * 51);
      const randomNumber2 = Math.floor(Math.random() * 51);

      return {
        randomNumber1,
        randomNumber2,
        multiplyResult: randomNumber1 * randomNumber2,
      };
    },
    title: "Произведение случайных чисел",
    description:
      "Напишите функцию, подсчитывающую произведение двух случайных чисел в промежутке от нуля до 50",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  [task1, task2, task3, task4, task5, task11].forEach((task, index) =>
    task(functions[index].fn)
  );
});

function wrapExecutableCode(code) {
  return `(${code})()`;
}

function task1(code) {
  const task_2_1_EntryPoint = document.getElementById("task_2_1");

  const result = eval(wrapExecutableCode(code));

  task_2_1_EntryPoint?.append(
    document.createTextNode(`Array.from: ${result.arrayFrom}`),
    document.createElement("br"),
    document.createTextNode(`Array.of: ${result.arrayOf}`),
    document.createElement("br"),
    document.createTextNode(`Literal: ${result.literal}`)
  );
}

function task2(code) {
  const task_2_2_EntryPoint = document.getElementById("task_2_2");

  const result = eval(wrapExecutableCode(code));

  task_2_2_EntryPoint?.append(
    document.createTextNode(`Массив: ${result.arrayFrom}`),
    document.createElement("br"),
    document.createTextNode(`Измененный массив: ${result.changedArray}`)
  );
}

function task3(code) {
  const task_2_3_EntryPoint = document.getElementById("task_2_3");
  task_2_3_EntryPoint?.append(
    document.createTextNode("Наведи курсор на любой элемент!"),
    document.createElement("br"),
    document.createElement("br")
  );

  const result = eval(wrapExecutableCode(code));

  task_2_3_EntryPoint?.append(...result);
}

function task4(code) {
  const task_2_4_EntryPoint = document.getElementById("task_2_4");

  const result = eval(wrapExecutableCode(code));

  task_2_4_EntryPoint?.append(...result);
}

function task5(code) {
  const task_2_5_EntryPoint = document.getElementById("task_2_5");

  const {
    concatenedArray,
    spreadedArray,
    copiedArray,
    removedLastElement,
    removedFirstElement,
    addedToStartElement,
    todayDate,
    formattedTodayDate,
  } = eval(wrapExecutableCode(code));

  task_2_5_EntryPoint?.append(
    document.createTextNode(`concat: ${concatenedArray}`),
    document.createElement("br"),
    document.createTextNode(`spread operator: ${spreadedArray}`),
    document.createElement("br"),
    document.createTextNode(`Changed array: ${copiedArray};`),
    document.createElement("br"),
    document.createTextNode(`Removed last element: ${removedLastElement};`),
    document.createElement("br"),
    document.createTextNode(`Removed first element: ${removedFirstElement};`),
    document.createElement("br"),
    document.createTextNode(`Added first element: ${addedToStartElement}`),
    document.createElement("br"),
    document.createTextNode(`Today date: ${todayDate}`),
    document.createElement("br"),
    document.createTextNode(`Formatted today date: ${formattedTodayDate}`)
  );
}

function task11(code) {
  const task_2_11_EntryPoint = document.getElementById("task_2_11");

  const { randomNumber1, randomNumber2, multiplyResult } = eval(
    wrapExecutableCode(code)
  );

  task_2_11_EntryPoint?.append(
    document.createTextNode(`Random number 1: ${randomNumber1}`),
    document.createElement("br"),
    document.createTextNode(`Random number 2: ${randomNumber2}`),
    document.createElement("br"),
    document.createTextNode(`Multiply result: ${multiplyResult}`)
  );
}
