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
const result = document.getElementById("result");
let rndArray = [];
let userArray = [];
let score = 0;

for (i = 0; i < 5; i++) {
  let rndNr = getRndNr(1, 100);
  if (!rndArray.includes(rndNr)) {
    rndArray.push(rndNr);
  } else {
    i--;
  }
  rndArray = rndArray.sort(function (a, b) {
    return a - b;
  });
}
nrSpan.innerHTML = rndArray;
console.log(rndArray);
const vanishTime = setTimeout(vanish, 2000);
const promptTime = setTimeout(() => {
  userGuess();
  console.log(userArray);
}, 5000);

const printTime = setTimeout(() => {
  printNrIntoDom();
  checkResult();
}, 6000);

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
  userArray = userArray.sort(function (a, b) {
    return a - b;
  });
}

function printNrIntoDom() {
  console.log("userarray", userArray, "rndArray", rndArray);
  yourNrs.innerHTML = userArray;
  prevNrs.innerHTML = rndArray;
}

function checkResult() {
  let matchedNr = [];
  for (let i = 0; i < rndArray.length; i++) {
    if (rndArray[i] !== userArray[i]) {
      result.innerHTML = `Sorry, your score is ${score}. You correctly guessed only ${score} nrs: ${matchedNr}`;
    } else {
      matchedNr.push(userArray[i]);
      score++;
      result.innerHTML = `Congrats! Your score is ${score}. You correctly guessed these nrs: ${matchedNr}`;
    }
  }
}
