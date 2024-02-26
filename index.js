import writeQuestion from "./writeQuestion.js";
import rds from "readline-sync";
import fs from "fs";

export const questionArray = [];
fs.readFileSync("questions.txt", "utf-8")
  .split("STOP")
  .forEach((val) => {
    const object = {};
    if (!val) {
      console.log("Val ended!");
      return;
    }
    val.split("||").forEach((value) => {
      if (value === "STOP" || !value) {
        console.log("STOP!!!!");
        return;
      }
      object[value.split("=")[0]] = value.split("=")[1];
    });
    questionArray.push(object);
  });
console.log(questionArray);
export const playerArray = [];
export let author;

export default function gameProgression() {
  console.log(
    "---------------QQQ------------U--U------------I-----------ZZZZ--------------"
  );
  console.log(
    "--------------Q---Q-----------U--U------------I-------------Z---------------"
  );
  console.log(
    "--------------Q---Q-----------U--U------------I------------Z----------------"
  );
  console.log(
    "---------------QQQ-Q----------UUUU------------I-----------ZZZZ--------------"
  );
  let exitFlag = false;
  while (!exitFlag) {
    console.log("\n \n");
    switch (
      rds.question(
        "Interactive Quiz ver. 1.2.2\nw - write a question\nn - input your name for scoring\ns - start the game, choose the amount and start playing!\nq - quit the program\n: "
      )
    ) {
      case "w":
        questionArray.push(writeQuestion(author));
        break;
      case "n":
        break;
      case "s":
        break;
      case "q":
        exitFlag = true;
        let saveString = "";
        if (questionArray.length === 0) {
          return;
        }
        for (const object of questionArray) {
          console.log(object);
          Object.keys(object).forEach((element, key) => {
            saveString = `${saveString}${element}=${
              Object.values(object)[key]
            }||`;
          });
          saveString = `${saveString}STOP`;
        }
        fs.writeFileSync("questions.txt", saveString, (error) => {
          if (error) {
            throw error;
          } else {
            console.log("Questions saved");
          }
        });
        break;
      default:
        console.log("Invalid letter!");
    }
  }
  return;
}

gameProgression();
