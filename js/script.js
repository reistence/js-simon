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

// creat an array of 5 rnd nr without clones
for (i = 0; i < 5; i++) {
  let rndNr = getRndNr(1, 100);
  if (!rndArray.includes(rndNr)) {
    rndArray.push(rndNr);
  } else {
    i--;
  }
  // sort the array in ascending order
  rndArray = rndArray.sort(function (a, b) {
    return a - b;
  });
}
// put the rndArray into nrSpan
nrSpan.innerHTML = rndArray;

//        TEST
// console.log(rndArray);

// let the rndArray into nrSpan vanish after 30s
const vanishTime = setTimeout(vanishRndNrs, 10000);

// ask the user to write the 5 nr after 31s
const promptTime = setTimeout(() => {
  userGuess();
  //          TEST
  //   console.log(userArray);
}, 11000);

// print the elements (rndArray, userArray, result) into the DOM
const printTime = setTimeout(() => {
  printNrIntoDom();
  checkResult();
}, 15000);

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

/**
 * Description empties the rnd nrs array
 */
function vanishRndNrs() {
  nrSpan.innerHTML = "";
}

/**
 * Description: asks the user 5 number; checks if the user wrote an
 * actual nr and sorts them in ascendinng order
 */
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
  // sort the array in ascending order
  userArray = userArray.sort(function (a, b) {
    return a - b;
  });
}

/**
 * Description: Prints userArray and rndArray into the according elements
 */
function printNrIntoDom() {
  //        TEST
  //   console.log("userarray", userArray, "rndArray", rndArray);
  yourNrs.innerHTML = userArray;
  prevNrs.innerHTML = rndArray;
}

/**
 * Description: check whether the user's guesses match with the rndArray and
 * updates the score accordingly
 */
function checkResult() {
  let matchedNr = [];
  for (let i = 0; i < rndArray.length; i++) {
    if (rndArray[i] !== userArray[i]) {
      result.innerHTML = `Sorry, your score is ${score}. You correctly guessed only ${score}: ${matchedNr}`;
    } else {
      matchedNr.push(userArray[i]);
      score++;
      result.innerHTML = `Congrats! Your score is ${score}. You correctly guessed these nrs: ${matchedNr}`;
    }
  }
}
