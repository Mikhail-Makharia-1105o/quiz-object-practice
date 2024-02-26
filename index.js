const rds = require("readline-sync");

export const questionArray = [];

export default function gameProgression() {
  let exitFlag = false;
  while (!exitFlag) {
    switch (
      rds.question(
        "Interactive Quiz ver. 1.2.2\nw - write a question\nn - save your name for scoring\ns - start the game, choose the amount and start playing!\nq - quit the program\n: "
      )
    ) {
      case "w":
        break;
      case "n":
        break;
      case "s":
        break;
      case "q":
        exitFlag = true;
      default:
        console.log("Invalid letter!");
    }
  }
  return;
}
