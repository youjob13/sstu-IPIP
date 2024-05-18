import { Wrapper } from "./common-components/wrapper.js";
import { BaseElement } from "./common-components/base-element.js";
import { RedioGroup } from "./common-components/radio-group.js";
import { Button } from "./common-components/button.js";

class Question {
  #isCorrect = null;
  constructor(question, onGiveAnswer) {
    return this.#createQuestion(question, onGiveAnswer);
  }

  #createQuestion(question, onGiveAnswer) {
    const questionTitle = new BaseElement({
      tag: "h4",
      content: question.question,
    });

    const select = new RedioGroup({
      tag: "optgroup",
      name: question.question,
      options: question.answers,
      handler: (event) => {
        this.#isCorrect =
          question.answers[event.target.value] === question.correctAnswer;

        onGiveAnswer(this.#isCorrect);
      },
    });

    return new Wrapper({
      tag: "div",
      classes: ["question-wrapper"],
      children: [questionTitle, select],
    });
  }
}

export class JSTest {
  #userAnswers = new Map();

  #entryPoint;
  #questions;
  #storage;
  constructor({ entryPoint, questions, storage }) {
    this.#entryPoint = entryPoint;
    this.#questions = questions;
    this.#storage = storage;

    this.#startTest();
  }

  #clearContainer() {
    this.#entryPoint.innerHTML = "";
  }

  #startTest() {
    this.#clearContainer();

    const questionElems = this.#questions.map(
      (question) =>
        new Question(question, (userAnswer) => {
          this.#userAnswers.set(question.question, userAnswer);
        })
    );

    const submitButton = new Button({
      content: "Закончить тест",
      handler: () => {
        this.#finishTest();
        submitButton.remove();
      },
    });

    const questionsWrapper = new Wrapper({
      tag: "div",
      children: questionElems,
    });
    new Wrapper({
      wrapper: this.#entryPoint,
      children: [questionsWrapper, submitButton],
    });
  }

  #finishTest() {
    const { correctAnswers, results } = this.#questions.reduce(
      (acc, question) => {
        const isCorrect = this.#userAnswers.get(question.question);

        const answerResult = new BaseElement({
          tag: "p",
          content: `${question.question}: ${
            isCorrect ? "правильно" : "неправильно"
          }`,
          styles: {
            color: isCorrect ? "green" : "red",
          },
        });

        acc.results.push(answerResult);
        acc.correctAnswers += isCorrect ? 1 : 0;
        return acc;
      },
      { correctAnswers: 0, results: [] }
    );

    const rightAnswersPercent = Math.round(
      (correctAnswers / this.#questions.length) * 100
    );

    const history = this.#storage.get("history") || [];
    this.#storage.set("history", [
      ...history,
      {
        date: Date.now(),
        result: rightAnswersPercent,
      },
    ]);

    const result = new BaseElement({
      tag: "p",
      content: `Вы ответили правильно на ${correctAnswers} из ${
        this.#questions.length
      } вопросов (${rightAnswersPercent}%)`,
    });

    const resetTest = new Button({
      content: "Начать сначала тест",
      handler: this.#startTest.bind(this),
    });

    new Wrapper({
      wrapper: this.#entryPoint,
      children: [result, results, resetTest].flat(),
    });
  }
}
