import rds from "readline-sync";

export default function writeQuestion(author = "Anonymous") {
  console.log("Time to create your own question!");
  const questionObject = {
    category: rds.question("Category: ").toLowerCase().trim() || "Oops...",
    question: rds.question("Question: ").toLowerCase().trim() || "Oops...",
    points: +rds.question("Amount of points awarded: ") || 0,
    author: author,
  };
  const type = rds.question(
    "Choose the type!\nslider - answer is given using a number slider!\ntext - answer is written using text(non case sensitive, but has to be exact)\nanswer - answer is chosen from the provided options\n: "
  );
  switch (type) {
    case "slider":
      questionObject.type = "slider";
      console.log("Type set to slider.");
      const us = rds.question(
        "Input the correct answer(number from 1 to 100): "
      );
      if (us <= 0 || us >= 101) {
        console.log("Invalid answer.");
        return;
      } else {
        questionObject.answer = us;
      }
      break;
    case "text":
      questionObject.type = "text";
      console.log("Type set to text.");
      questionObject.answer = rds.question(
        "Input the correct answer(is not case sensitive): "
      );
      break;
    case "answer":
      questionObject.type = "answer";
      const answerArray = [];
      const amount = rds.question("How many answers?: ");
      if (amount <= 0) {
        console.log("Amount is incorrect!");
        return;
      }
      for (let i = 0; i < amount; i += 1) {
        const usans = rds.question(
          'Input a single answer! \nIf it is the right answer, follow it with " CORRECT"(note the space). \nIf several correct answers are inputted, only the first will count as the correct one, while the rest will be ignored.\n: '
        );

        if (usans.split(" ").slice(-1).join() === "CORRECT") {
          console.log("Correct answer input!");
          questionObject.answer = usans.split(" ").slice(0, -1).join();
          answerArray.push(usans.split(" ").slice(0, -1).join());
        } else {
          answerArray.push(usans);
        }
      }
      if (questionObject.answer) {
        questionObject.answers = answerArray;
        console.log("Type set to answer.");
        console.log(questionObject);
      } else {
        console.log('No answer given.');
        return;
      }
      break;
    default:
      console.log('Wrong type!');
      return;
  }
  console.log(questionObject);
  return questionObject;
}
