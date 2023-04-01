"use strict";

// variables
let result, interval, chooseElm, value1, value2, correctIndex;
let num1 = document.querySelector(".num-1");
let num2 = document.querySelector(".num-2");
let gameScore = 1;

// const variables
const mathElm = document.querySelector(".math-elm");
const answer = document.querySelectorAll(".answer");
const btnStart = document.querySelector(".btnStart");
const firstSection = document.querySelector(".start");
const gameTime = document.querySelector(".game-time");
const gameLevel = document.querySelector(".game-level");

const mathElm2 = ["+", "-", "*"];
mainFunc();
function mainFunc() {
  // random functions
  function randomNum() {
    // min and max included
    return Math.floor(Math.random() * (20 - 0 + 1) + 0);
  }

  //choose math operator
  chooseElm = mathElm2[Math.floor(Math.random() * mathElm2.length)];

  // qiymatlarni tenglash
  value1 = randomNum();
  value2 = randomNum();
  num1.textContent = value1;
  num2.textContent = value2;
  mathElm.textContent = chooseElm;

  // qiymat //eval matematik ammalarni bajarish uchun ishlatiladi
  result = eval(`${+value1}${chooseElm}${+value2}`);

  // buttonlarga qiymat berish
  // 1 - buttonlarni render qilish:
  // let btnForResult = Math.floor(Math.random() * (answer.length - 1 + 1));
  // renderda tanlangan btning textcontentiga qiymat yuborish
  // answer[btnForResult].textContent = result;

  let mainAnwes = [result, result + 2, result - 2, result + 1];
  mainAnwes = mainAnwes.sort((a, b) => Math.random() - 0.5);
  // find the correct index
  mainAnwes.filter((item, idx) => {
    if (item === result) {
      correctIndex = idx;
    }
  });

  // check correct btn
  answer.forEach((item, idx) => {
    item.textContent = mainAnwes[idx];
    item.addEventListener("click", () => {
      if (item.textContent == result) {
        item.classList.add("correct");
      } else {
        item.classList.add("wrong");
        answer[correctIndex].classList.add("correct");
      }
      answer.forEach((item) => {
        item.style.pointerEvents = "none";
      });
      setTimeout(() => {
        restoreFunc();
      }, 1000);
    });
  });
}
// function restore game
function restoreFunc() {
  mainFunc();
  answer.forEach((item) => {
    item.style.pointerEvents = "all";
    item.classList.remove("correct");
    item.classList.remove("wrong");
  });
}

// game start sevtion

// btnStart.addEventListener("click", () => {
//   firstSection.style.display = "none";
//   mainFunc();
// });

// round time
function roundTime() {
  let i = 10;
  interval = setInterval(() => {
    if (i <= 0) {
      clearInterval(interval);
      mainFunc();
      roundTime();
      gamelevel();
    }
    if (i < 10) {
      gameTime.textContent = `time: 00:0${i--}`;
    } else {
      gameTime.textContent = `time: 00:${i--}`;
    }
  }, 1000);
}
roundTime();

// round level
function gamelevel() {
  ++gameScore;
  if (gameScore <= 2) {
    gameLevel.textContent = `level: ${gameScore}/10`;
  } else {
    clearInterval(interval);
  }
}
