import rds from "readline-sync";
import fs from "fs";
import { nameArray } from "./index.js";

export let currentUser = 0;

export function removeDuplicates(arr) {
  let newArray = [];
  let uniqueObject = {};
  for (const i in arr) {
    uniqueObject[arr[i]["name"]] = arr[i];
  }
  for (const i in uniqueObject) {
    newArray.push(uniqueObject[i]);
  }
  return newArray;
}
export function writeName(nameU) {
  for (const name of nameArray) {
    if (name.name.toLowerCase() === nameU.toLowerCase()) {
      console.log('Name found!');
      currentUser = name;
      return;
    }
  }
  nameArray.push({
    name: nameU.toLowerCase(),
    score: 0,
  });
  console.log(nameArray);
}
export function loadNameData() {
  if (fs.readFileSync("names.txt", "utf-8") === "") {
    console.log("No save data.");
  } else {
    fs.readFileSync("names.txt", "utf-8")
      .split("||")
      .forEach((val) => {
        const object = {};
        if (!val) {
          console.log("Val ended!");
          return;
        }
        object.name = val.split("=")[0].toLowerCase();
        object.score = +val.split("=")[1];
        nameArray.push(object);
      });
  }
}
