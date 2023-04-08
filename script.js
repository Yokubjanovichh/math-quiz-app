"use strict";

// variables
let result, interval, chooseElm, value1, value2, correctIndex, btnInterval;
let num1 = document.querySelector(".num-1");
let num2 = document.querySelector(".num-2");
let mainResults = { qora: 0, qizil: 0, kuk: 0 };
let gameScore = 1,
  levelTime,
  oldTime = 0,
  mainAnwes;
let toCorrectAnswers = [];

// const variables
const mathElm = document.querySelector(".math-elm");
const answer = document.querySelectorAll(".answer");
const btnStart = document.querySelector(".btnStart");
const firstSection = document.querySelector(".start");
const gameTime = document.querySelector(".game-time");
const gameLevel = document.querySelector(".game-level");
const scoreChild = document.querySelectorAll(".scoreChild");
const mathElm2 = ["+", "-", "*"];
const results = document.querySelector(".results");
const newGame = document.querySelector(".newGame");
const showResult = document.querySelector(".showResult");
const resTimeOutP = document.querySelectorAll(".resTimeOut p");
const toPosition = [];
const toOldResults = [];
const pushResult = { right: null, wrong: null };

//elements random function
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

  // save positions
  let newVariables = [value1, chooseElm, value2];
  toPosition.push([...newVariables]);
  // qiymat //eval matematik ammalarni bajarish uchun ishlatiladi
  result = eval(`${+value1}${chooseElm}${+value2}`);

  // buttonlarga qiymat berish
  // 1 - buttonlarni render qilish:
  // let btnForResult = Math.floor(Math.random() * (answer.length - 1 + 1));
  // renderda tanlangan btning textcontentiga qiymat yuborish
  // answer[btnForResult].textContent = result;
  mainAnwes = [result, result + 2, result - 2, result + 1];
  mainAnwes = mainAnwes.sort(() => Math.random() - 0.5);
  // find the correct index
  mainAnwes.filter((item, idx) => {
    if (item === result) {
      correctIndex = idx;
    }
  });
  toOldResults.push([...mainAnwes]);
  // qiymatlarni buttonlarga berish
  answer.forEach((item, idx) => {
    item.textContent = mainAnwes[idx];
  });
  findCorrectAnswer();
}

// to position
scoreChild.forEach((item, idx) => {
  item.addEventListener("click", () => {
    // show active position
    scoreChild.forEach((item) => {
      item.classList.remove("scoreChildActive");
    });
    if (idx < gameScore) item.classList.add("scoreChildActive");
    // bosilgan raundagi qiymatlarni olish
    value1 = toPosition[idx][0];
    chooseElm = toPosition[idx][1];
    value2 = toPosition[idx][2];
    mainAnwes = toOldResults[idx];
    // rountdagi qiymatlarni ekranga chiqarish
    num1.textContent = value1;
    num2.textContent = value2;
    mathElm.textContent = chooseElm;
    // bosilgan raundagi javoblarni olib ekranga chiqarish
    answer.forEach((item, idx) => {
      item.textContent = mainAnwes[idx];
    });
  });
});

scoreChild.forEach((elm, idx) => {
  elm.addEventListener("click", () => {
    if (elm.classList.contains("win") || elm.classList.contains("lose") || elm.classList.contains("timeOut")) {
      answer.forEach((item) => {
        item.style.pointerEvents = "none";
      });
    } else {
      answer.forEach((item) => {
        item.style.pointerEvents = "all";
      });
    }
    answer.forEach((item) => {
      item.classList.remove("correct");
      item.classList.remove("wrong");
    });
    if (toCorrectAnswers[idx]?.right != null) {
      answer[toCorrectAnswers[idx]?.right].classList.add("correct");
      if (toCorrectAnswers[idx]?.wrong != null) {
        answer[toCorrectAnswers[idx]?.wrong].classList.add("wrong");
      }
    }
  });
});

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
// game start section

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
    if (levelTime <= 0) {
      answer.forEach((item) => {
        item.style.pointerEvents = "all";
        item.classList.remove("correct");
        item.classList.remove("wrong");
      });

      oldTime = -1;
      ++mainResults.qora;
      scoreChild[gameScore - 1].classList.add("timeOut");
      pushResult.right = null;
      pushResult.wrong = null;
      toCorrectAnswers.push({ ...pushResult });
      console.log(toCorrectAnswers);
      clearInterval(interval);
      roundTime();
      mainFunc();
      if (gameScore <= 10) levelFunc();
    }
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
  }, 1000);
}

// round level
function levelFunc() {
  ++gameScore;
  if (gameScore <= 10) {
    gameLevel.textContent = `level: ${gameScore}/10`;
  } else {
    showMainResults();
    clearInterval(interval);
    levelTime = 10;
    gameTime.textContent = `time: 00:${levelTime}`;
    console.log(mainResults);
  }
  scoreChild.forEach((item) => {
    item.classList.remove("scoreChildActive");
  });
  scoreChild[gameScore - 1]?.classList.add("scoreChildActive");
}

// anwer larni bosganda level oshishi va vaqt yangilanishi uchun
answer.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.textContent == result) {
      oldTime = levelTime + 1;
      ++mainResults.kuk;
      clearInterval(interval);
      scoreChild[gameScore - 1].classList.add("win");
      roundTime();
      setTimeout(() => {
        levelFunc();
      }, 1000);
    } else {
      oldTime = -1;
      ++mainResults.qizil;
      clearInterval(interval);
      scoreChild[gameScore - 1].classList.add("lose");
      roundTime();
      setTimeout(() => {
        levelFunc();
      }, 1000);
    }
  });
});

// get indexes in results
answer.forEach((item, idx) => {
  item.addEventListener("click", () => {
    if (item.textContent == result) {
      pushResult.right = correctIndex;
      pushResult.wrong = null;
      toCorrectAnswers.push({ ...pushResult });
      console.log(toCorrectAnswers);
    } else {
      pushResult.right = correctIndex;
      pushResult.wrong = idx;
      toCorrectAnswers.push({ ...pushResult });
      console.log(toCorrectAnswers);
    }
  });
});

// show main results
function showMainResults() {
  showResult.classList.add("showResultFlex");
  resTimeOutP[0].textContent = ` ${mainResults.qora}/10`;
  resTimeOutP[1].textContent = ` ${mainResults.qizil}/10`;
  resTimeOutP[2].textContent = ` ${mainResults.kuk}/10`;
}

// clicking newGame btn

newGame.addEventListener("click", () => {
  showResult.classList.remove("showResultFlex");
  mainResults = { qora: 0, qizil: 0, kuk: 0 };
  toCorrectAnswers = [];
  gameScore = 0;
  oldTime = 0;
  levelFunc();
  restoreFunc();
  roundTime();
  mainFunc();
  scoreChild.forEach((item) => {
    if (item.classList.contains("win")) {
      item.classList.remove("win");
    }

    if (item.classList.contains("lose")) {
      item.classList.remove("lose");
    }

    if (item.classList.contains("timeOut")) {
      item.classList.remove("timeOut");
    }
  });
});
