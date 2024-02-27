import writeQuestion from "./writeQuestion.js";
import rds from "readline-sync";
import fs from "fs";
import { removeDuplicates, loadNameData, writeName, currentUser } from "./writeName.js";
import { deleteName } from "./remove.js";
import { gameItself } from "./answerQuestion.js";
export let nameArray = [];
export const questionArray = [];
loadNameData();

if (fs.readFileSync("questions.txt", "utf-8") === "") {
  console.log("No save data.");
} else {
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
      if (object.type === 'answer') {
        object.answers = object.answers.split(',')
      }
      questionArray.push(object);
    });
}
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
        "Interactive Quiz ver. 1.2.2\nw - write a question\nr - remove a name\nn - input your name for scoring\ns - start the game, choose the amount and start playing!\nq - quit the program\n: "
      )
    ) {
      case "w":
        questionArray.push(writeQuestion(currentUser || 'Anonymous'));
        break;
      case "n":
        writeName(rds.question('Name?: '));
        break;
      case "s":
        gameItself();
        break;
      case "r":
        deleteName(rds.question('Name?: '))
        break;
      case "q":
        exitFlag = true;
        let saveString = "";
        nameArray = [...removeDuplicates(nameArray)];
        if (questionArray.length === 0) {
          console.log('No save data! :0');
        }
        for (const object of questionArray) {
          console.log(object);

            Object.keys(object).forEach((element, key) => {
              saveString = `${saveString}${element}=${Object.values(object)[key]}||`;
            });
            saveString = `${saveString}STOP`;
          fs.writeFileSync("questions.txt", saveString, (error) => {
            if (error) {
              throw error;
            } else {
              console.log("Questions saved");
            }
          });
        }
        let nameString = '';
        if (nameArray.length === 0) {
          console.log('No save data! :3');
          console.log(nameArray);
          console.log(nameArray.length);
        }
        for (const object of nameArray) {
          console.log(object);
            nameString = `${nameString}${object.name}=${object.score}||`;
            console.log('NameString created!');
          fs.writeFileSync("names.txt", nameString, (error) => {
            if (error) {
              throw error;
            } else {
              console.log("Names saved");
            }
          })};
        break;
      default:
        console.log("Invalid letter!");
    }
  }
  return;
}

gameProgression();
