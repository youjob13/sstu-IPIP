function task1() {
  const task_2_1_EntryPoint = document.getElementById("task_2_1");
  task_2_1_EntryPoint.style.wordBreak = "break-all";

  const arrayFrom = Array.from({ length: 21 }, (_, index) => index * 2);

  const arrayOf = Array.of(1, 2, 3, 4, 5);

  const literal = [
    "Hello!",
    "How are you?",
    "I am fine, thank you!",
    "And you?",
  ];

  task_2_1_EntryPoint.append(
    document.createTextNode(`Array.from: ${arrayFrom}`),
    document.createElement("br"),
    document.createTextNode(`Array.of: ${arrayOf}`),
    document.createElement("br"),
    document.createTextNode(`Literal: ${literal}`)
  );
}

function task2() {
  const task_2_2_EntryPoint = document.getElementById("task_2_2");
  task_2_2_EntryPoint.style.wordBreak = "break-all";

  const arrayFrom = Array.from({ length: 5 }, (_, index) => index * 2);

  task_2_2_EntryPoint.append(document.createTextNode(`Массив: ${arrayFrom}`));

  arrayFrom[arrayFrom.length - 1] = 888;
  arrayFrom.reverse();
  arrayFrom.push(-1);
  arrayFrom.unshift(99);
  arrayFrom.splice(3, 0, 4);

  task_2_2_EntryPoint.append(
    document.createElement("br"),
    document.createTextNode(`Измененный массив: ${arrayFrom}`)
  );
}

function task3() {
  const task_2_3_EntryPoint = document.getElementById("task_2_3");
  task_2_3_EntryPoint.style.wordBreak = "break-all";
  task_2_3_EntryPoint.append(
    document.createTextNode("Наведи курсор на любой элемент!"),
    document.createElement("br"),
    document.createElement("br")
  );

  const arrayFrom = Array.from({ length: 5 });
  const resultArray = arrayFrom.map((_, index, array) => {
    const item = document.createElement("li");
    item.textContent = `Item ${index + 1}`;
    item.title = `Array length: ${array.length}`;
    return item;
  });

  task_2_3_EntryPoint.append(...resultArray);
}

function task4() {
  const task_2_4_EntryPoint = document.getElementById("task_2_4");
  task_2_4_EntryPoint.style.wordBreak = "break-all";

  for (let i = 0; i < 5; i++) {
    const item = document.createElement("li");
    item.textContent = `Item ${i + 1} has appended with "for" loop`;
    task_2_4_EntryPoint.append(item);
  }
}

function task5() {
  const task_2_5_EntryPoint = document.getElementById("task_2_5");
  task_2_5_EntryPoint.style.wordBreak = "break-all";

  const firstArray = Array.from({ length: 5 }, (_, index) => index * 2);
  const secondArray = Array.from({ length: 5 }, (_, index) => `#${index}`);
  const concatenedArray = firstArray.concat(secondArray);
  const spreadedArray = [...firstArray, ...secondArray];

  task_2_5_EntryPoint.append(
    document.createTextNode(`concat: ${concatenedArray}`),
    document.createElement("br"),
    document.createTextNode(`spread operator: ${spreadedArray}`)
  );

  const removedLastElement = spreadedArray.pop();
  const removedFirstElement = spreadedArray.shift();
  const addedToStartElement = spreadedArray.unshift("added element");

  task_2_5_EntryPoint.append(
    document.createElement("br"),
    document.createTextNode(
      `Changed array: ${spreadedArray}; 
        Removed last element: ${removedLastElement}; 
        Removed first element: ${removedFirstElement}; 
        Added first element: ${addedToStartElement}
      `
    ),
    document.createElement("br"),
    document.createTextNode(`Today date: ${new Date().toLocaleString()}`),
    document.createElement("br"),
    document.createTextNode(`Formatted today date: ${formatDate(new Date())}`)
  );
}

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

function task11() {
  const task_2_11_EntryPoint = document.getElementById("task_2_11");
  task_2_11_EntryPoint.style.wordBreak = "break-all";

  const randomNumber1 = Math.floor(Math.random() * 51);
  const randomNumber2 = Math.floor(Math.random() * 51);

  task_2_11_EntryPoint.append(
    document.createTextNode(`Random number 1: ${randomNumber1}`),
    document.createElement("br"),
    document.createTextNode(`Random number 2: ${randomNumber2}`),
    document.createElement("br"),
    document.createTextNode(`Multiply result: ${randomNumber1 * randomNumber2}`)
  );
}

document.addEventListener("DOMContentLoaded", () => {
  task1();
  task2();
  task3();
  task4();
  task5();
  task11();
});
