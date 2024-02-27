import rds from "readline-sync";
import { questionArray } from "./index.js";
import { currentUser } from "./writeName.js";
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
export function gameItself() {
  let gamePool = [];
  const usAnswerCategoryAmount =
    +rds.question(
      "How many categories do you want to answer the questions from? Input 0 for every category!\n: "
    ) || 0;
  for (let i = 0; i < usAnswerCategoryAmount; i += 1) {
    const usAnswerCategory = rds.question("Input your category!\n: ");
    let amount = 0;
    for (const question of questionArray) {
      if (question.category === usAnswerCategory) {
        gamePool.push(question);
        amount += 1;
      }
    }
    console.log(amount + " questions added!");
  }
  if (gamePool.length === 0) {
    console.log(
      "Either you chose every category or we were not able to find the questions! Time to add every question we have into the game pool."
    );
    for (const question of questionArray) {
      gamePool.push(question);
    }
  }
  let usAnswerQuestionAmount =
    +rds.question(
      "How many questions you would like to answer? Input 0 for every single one!\n: "
    ) || 0;
  if (usAnswerQuestionAmount > gamePool.length) {
    console.log("Too many questions chosen! Defaulting to the max amount.");
    usAnswerQuestionAmount = 0;
  } else if (usAnswerQuestionAmount < 0) {
    console.log(
      "Do you even wanna play the game?... Well, okay. Uh. Setting it to every question."
    );
    usAnswerQuestionAmount = 0;
  }
  console.log("It's time for magic!... Shuffling every question...");
  shuffleArray(gamePool);
  console.log("Picking out the best of the best...");
  console.log("Read, set, go!");
  if (usAnswerQuestionAmount === 0) {
    usAnswerQuestionAmount = gamePool.length;
  }
  for (let i = 0; i < usAnswerQuestionAmount; i += 1) {
    console.log("\n");
    console.log("Question: " + gamePool[i].question);
    console.log("Category: " + gamePool[i].category);
    console.log("Type: " + gamePool[i].type);
    let usAnswer;
    switch (gamePool[i].type) {
      case "text":
        usAnswer = rds.question(": ");
        break;
      case "slider":
        var MAX = 100;
        var MIN = 0;
        var value = 50;
        var key;
        console.log(
          "\n\n" + new Array(20).join(" ") + "[Z] <- -> [X]  FIX: [SPACE]\n"
        );
        while (true) {
          console.log(
            "\x1B[1A\x1B[K|" +
              new Array(value + 1).join("-") +
              "O" +
              new Array(MAX - value + 1).join("-") +
              "| " +
              value
          );
          key = rds.keyIn("", { hideEchoBack: true, mask: "", limit: "zx " });
          if (key === "z") {
            if (value > MIN) {
              value--;
            }
          } else if (key === "x") {
            if (value < MAX) {
              value++;
            }
          } else {
            break;
          }
        }
        console.log("\nInput value: " + value);
        usAnswer = +value;
        break;
      case "answer":
        shuffleArray(gamePool[i].answers)
        for (const answer of gamePool[i].answers) {
          console.log(gamePool[i].answers.indexOf(answer) + ": " + answer);
        }
        usAnswer = rds.question("Your answer(word): ") || "";
        break;
      default:
        console.log("Error!");
        break;
    }
    if (usAnswer == gamePool[i].answer) {
      console.log("Correct!");
      if (currentUser !== 0) {
        if (gamePool[i].points >= 0) {
          currentUser.score += +gamePool[i].points;
          console.log(currentUser);
        } 
      } else {
        console.log("Not logged in! Points are not counted!");
      }
    } else {
      console.log(usAnswer + ' was your answer!');
      console.log(gamePool[i].answer + ' was the right answer!');
      console.log('Incorrect!');
    }
  }
  console.log("That was it for this session. Thanks for playing!");
  return;
}
