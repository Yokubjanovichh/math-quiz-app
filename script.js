"use strict";

// variables
let result, interval, chooseElm, value1, value2, correctIndex, btnInterval;
let num1 = document.querySelector(".num-1");
let num2 = document.querySelector(".num-2");
let gameScore = 1,
  levelTime,
  oldTime = 0;

// const variables
const mathElm = document.querySelector(".math-elm");
const answer = document.querySelectorAll(".answer");
const btnStart = document.querySelector(".btnStart");
const firstSection = document.querySelector(".start");
const gameTime = document.querySelector(".game-time");
const gameLevel = document.querySelector(".game-level");
const scoreChild = document.querySelectorAll(".scoreChild");
const mathElm2 = ["+", "-", "*"];

// mainFunc();

function mainFunc() {
  // random element
  function randomNum() {
    return Math.floor(Math.random() * (20 + 1));
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
  mainAnwes = mainAnwes.sort(() => Math.random() - 0.5);
  // find the correct index
  mainAnwes.filter((item, idx) => {
    if (item === result) {
      correctIndex = idx;
    }
  });

  // qiymatlarni buttonlarga berish
  answer.forEach((item, idx) => {
    item.textContent = mainAnwes[idx];
  });
  findCorrectAnswer();
}

// check correct btn
function findCorrectAnswer() {
  answer.forEach((item) => {
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
      clearInterval(btnInterval);
      btnInterval = setTimeout(() => {
        if (gameScore <= 10) {
          restoreFunc();
          mainFunc();
        }
        console.log("hello");
      }, 1000);
    });
  });
}
// function restore game
function restoreFunc() {
  answer.forEach((item) => {
    if (gameScore <= 10) {
      item.style.pointerEvents = "all";
    } else {
      item.style.pointerEvents = "none";
    }
    item.classList.remove("correct");
    item.classList.remove("wrong");
  });
}
// game start sevtion

btnStart.addEventListener("click", () => {
  roundTime();
  firstSection.style.display = "none";
  mainFunc();
});

// round time
function roundTime() {
  levelTime = 10;
  levelTime += oldTime;
  interval = setInterval(() => {
    let minutes = "00",
      seconds;
    if (levelTime >= 60) {
      minutes = Math.floor(levelTime / 60, 10);
      minutes = minutes < 10 ? "0" + minutes : minutes;
    }
    levelTime--;
    seconds = Math.floor(levelTime % 60, 10);
    seconds = seconds < 10 ? "0" + seconds : seconds;
    gameTime.textContent = `time: ${minutes}:${seconds}`;
    if (levelTime <= 0) {
      oldTime = -2;
      scoreChild[gameScore - 1].classList.add("timeOut");
      clearInterval(interval);
      roundTime();
      mainFunc();
      levelFunc();
    }
  }, 1000);
}

// round level
function levelFunc() {
  ++gameScore;
  if (gameScore <= 10) {
    gameLevel.textContent = `level: ${gameScore}/10`;
  } else {
    clearInterval(interval);
    levelTime = 10;
    gameTime.textContent = `time: 00:${levelTime}`;
  }
}

// anwer larni bosganda level oshishi va vaqt yangilanishi uchun
answer.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.textContent == result) {
      oldTime = levelTime;
      clearInterval(interval);
      scoreChild[gameScore - 1].classList.add("win");
      roundTime();
      setTimeout(() => {
        levelFunc();
      }, 1000);
    } else {
      oldTime = -2;
      clearInterval(interval);
      scoreChild[gameScore - 1].classList.add("lose");
      roundTime();
      setTimeout(() => {
        levelFunc();
      }, 1000);
    }
  });
});
