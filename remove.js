import { nameArray } from "./index.js";

export function deleteName(nameToDelete) {
    for (const name of nameArray) {
        if (name.name.toLowerCase() === nameToDelete.toLowerCase()) {
            console.log(nameArray.splice(nameArray.indexOf(nameToDelete), 1) + ' was deleted!');
        }
    }
    console.log('Name not found!');
    return;
}