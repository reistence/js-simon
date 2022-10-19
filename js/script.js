/*
Descrizione:
Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
Dopo 30 secondi i numeri spariscono e l'utente deve inserire, uno alla volta,
 i numeri che ha visto precedentemente, tramite il prompt().
Dopo che sono stati inseriti i 5 numeri, il software dice quanti e 
quali dei numeri da indovinare sono stati individuati.
*/

const nrSpan = document.getElementById("rnd-nrs");
const prevNrs = document.getElementById("prev-nrs");
const yourNrs = document.getElementById("your-nrs");
const rndArray = [];
let userArray = [];

for (i = 0; i < 5; i++) {
  let rndNr = getRndNr(1, 100);
  rndArray.push(rndNr);
}
nrSpan.innerHTML = rndArray;
console.log(rndArray);
const vanishTime = setTimeout(vanish, 2000);
const promptTime = setTimeout(() => {
  userGuess();
  console.log(userArray);
  printNrIntoDom(userArray, yourNrs);
}, 5000);

// FUNCTIONs

/**
 * Description generate rnd number in a min/max range
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function getRndNr(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function vanish() {
  nrSpan.innerHTML = "";
}

function userGuess() {
  let i = 0;
  let guessedNr;
  do {
    guessedNr = parseInt(prompt("Put in the previous given numbers: "));

    if (!isNaN(guessedNr)) {
      userArray.push(guessedNr);
      i++;
    }
  } while (i < 5);
  return userArray;
}

function printNrIntoDom(array, element) {
  element.innerHTML = array;
}
