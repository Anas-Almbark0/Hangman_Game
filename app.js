// All Select
let ContainerLetters = document.querySelector(".letters"); // Container Letters
let categoryTitle = document.querySelector(".info-bar span .category");
let trick = document.querySelector(".trick");
let lettersGuess = document.querySelector(".word-prediction .box");
// Litters
let letters = "abcdefghijklmnopqrstuvwxyz";
// Get Array From Litters
let lettersArray = Array.from(letters);
// Generate Litters
lettersArray.forEach((letter) => {
  let boxLetter = document.createElement("span"); // Create span
  let contentBoxLetter = document.createTextNode(letter); // Putting Content in The Span
  boxLetter.appendChild(contentBoxLetter);
  boxLetter.setAttribute("data-letter", letter);
  boxLetter.className = "letter"; // Add Class On Span
  ContainerLetters.appendChild(boxLetter);
});
// Object Of Word + Categories
const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};
let allKeys = Object.keys(words); // Get All Keys From Object
let randomKeys = allKeys[Math.floor(Math.random() * allKeys.length)]; // Get Random Key
let randomKeyValue = words[randomKeys];
let arrayOfKeyValue =
  randomKeyValue[Math.floor(Math.random() * randomKeyValue.length)];
let arrayOfWord = Array.from(arrayOfKeyValue);
categoryTitle.innerHTML = randomKeys; // Set Category Info
trick.innerHTML = arrayOfKeyValue; // trick (:
arrayOfWord.forEach((char) => {
  let emptyGuessSpan = document.createElement("span");
  lettersGuess.appendChild(emptyGuessSpan);
  // If Letter Is Space
  char === " "
    ? (emptyGuessSpan.className = "space")
    : (emptyGuessSpan.innerHTML = "?");
});
// Handle Clicking On Litter
let allSpans = document.querySelectorAll(".letters span");
let allSpansGuess = document.querySelectorAll(".word-prediction .box span");
// Set Wrong Attempts
let wrongAttempts = 0;
let draw = document.querySelector(".draw");
allSpans.forEach((span) => {
  let Status = false; // Set The Chose Status
  span.onclick = function () {
    if (wrongAttempts >= 8) {
      span.classList.add("display");
    }
    this.classList.add("display");
    // Get Clicked Letter
    let chooseLetter = this.dataset.letter.toLowerCase();
    let chooseWord = Array.from(arrayOfKeyValue.toLowerCase());
    chooseWord.forEach((char, WIndex) => {
      if (chooseLetter === char) {
        Status = true;
        console.log(Status);
        allSpansGuess.forEach((ele, SIndex) => {
          console.log(SIndex);
          if (WIndex === SIndex) {
            ele.innerHTML = char;
            if (ele.innerHTML != "") {
              ele.classList.add("Full");
            }
          }
        });
      }
    });
    // If The Letter Is Wrong
    if (Status !== true) {
      wrongAttempts++;
      draw.classList.add(`wrong-${wrongAttempts}`);
      if (wrongAttempts >= 8) {
        document.addEventListener("click", function (e) {
          document.querySelector(".container").style.pointerEvents = "none";
          document.querySelectorAll(".letters span").forEach((span) => {
            span.classList.add("lost");
          });
        });
        let box_lost = document.createElement("div");
        let lost = document.createElement("div");
        let playAgain = document.createElement("button");
        playAgain.className = "again";
        let contentLost = document.createTextNode(
          `Game Over, The Word Is [${arrayOfKeyValue}]`
        );
        box_lost.className = "msgLost";
        lost.appendChild(contentLost);
        playAgain.innerHTML = "Play Again";
        box_lost.appendChild(lost);
        box_lost.appendChild(playAgain);
        document.body.appendChild(box_lost);
        playAgain.onclick = function () {
          location.reload();
        };
      }
    } else {
      let rightLetters = [];
      allSpansGuess.forEach((ele) =>
        ele.classList.contains("Full") ? rightLetters.push(ele) : false
      );
      let fullGuess = Array.from(allSpansGuess);
      if (wrongAttempts < 8 && rightLetters.length === fullGuess.length) {
        allSpansGuess.forEach((span) => {
          span.classList.add("win");
        });
        setTimeout(() => {
          location.reload();
        }, 1500);
      }
    }
  };
});
