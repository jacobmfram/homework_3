// Sets initial variables
var words = ["philadelphia", "pittsburgh", "detroit", "chicago", "milwaukee", "minneapolis", "fargo", "billings", "spokane", "seattle"];
var selectedWord = "";
var wordArray = [];
var blanks = [];
var guessedWrong = [];
var numGuesses = 9;
var wins = 0;
var losses = 0;

// initialize function starts game
function initialize() {
    // Sets relevant variables to initial conditions
    numGuesses = 9;
    guessedWrong = [];
    blanks = [];
    selectedWord = words[Math.floor(words.length * Math.random())];
    wordArray = selectedWord.split("");

    // Creates array of blanks
    for (i = 0; i < wordArray.length; i++) {
        blanks.push("_")
    };

    // Prints elements to page
    document.getElementById("word").innerHTML = blanks.join(" ");
    document.getElementById("wrong").innerHTML = guessedWrong.join(" ");
    document.getElementById("num-guesses").innerHTML = numGuesses;
}

// Function that will check inputted letters against selected word
function letterCheck(guessedLetter) {
    var isLetterInWord = false;
    for (j = 0; j < wordArray.length; j++) {
        if (wordArray[j] === guessedLetter) {
            isLetterInWord = true;
        }
    } 
    if(isLetterInWord) {
        for (k = 0; k < wordArray.length; k++) {
            if (wordArray[k] === guessedLetter) {
            blanks[k] = guessedLetter;
            }
        }
    } else {
        numGuesses--;
        guessedWrong.push(guessedLetter);
    }
}

// Ends round under appropriate conditions
function roundEnd() {
    document.getElementById("wrong").innerHTML = guessedWrong.join(" ");
    document.getElementById("word").innerHTML = blanks.join(" ");
    document.getElementById("num-guesses").innerHTML = numGuesses;
    if(wordArray.toString() === blanks.toString()) {
        wins++;
        alert("Congrats! You're still on the route!");
        document.getElementById("wins").innerHTML = wins;
        initialize();
    } else if(numGuesses === 0) {
        losses++;
        document.getElementById("losses").innerHTML = losses;
        alert("Dang! You took a wrong turn!");
        initialize();
    }
}

// Calls functions
initialize();
document.onkeyup = function(event) {
    guessedLetter = String.fromCharCode(event.keyCode).toLowerCase();
    letterCheck(guessedLetter);
    setTimeout(roundEnd(), 2000);
}