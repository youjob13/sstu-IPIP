document.addEventListener("DOMContentLoaded", () => {
  const task1EntryPoint = document.getElementById("task_1");

  let variable = Math.random() > 0.5 ? "Hello" : undefined;

  if (variable == undefined) {
    const displayText = `[Variable]: is empty; [Type]: ${typeof variable}`;
    task1EntryPoint.innerHTML = displayText;
    console.log(displayText);
  } else {
    const displayText = `[Variable]: ${variable}; [Type]: ${typeof variable}`;
    task1EntryPoint.innerHTML = displayText;
    console.log(displayText);
  }
});
