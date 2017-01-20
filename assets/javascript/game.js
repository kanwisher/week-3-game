var hangMan = {

usedLetters        : [], //empty array to be "pushed" to fill, will only include incorrect guesses
alphabet           : 'abcdefghijklmnopqrstuvwxyz'.split(''), //Alphabet array
lives              : 10, //number of guesses remaining
wordArray          : ["elephant", "tapir", "ocelot", "jaguar", "python", "termite", "piranha", "anaconda", "parrot", "gorilla", "bonobo", "tiger", "leopard", "cobra", "cougar", "capybara", "macaw"], //possible answer choices the computer can pick for Hangman
computerWordChoice : wordArray[Math.floor(Math.random() * wordArray.length)], //computer picks a random  word from the word bank//
underscoreArray    : [], //I have a function that places an underscores in this empty array for each letter in the word the computer selected 
wins               : 0,
losses             : 0,
keyLock            : false
}




generatePuzzle(); //sets up puzzle on initial page load
updateStats(); //sets up stats on initial page load
document.getElementById("message").innerHTML = "Press any key to get started";



document.onkeyup = function() { //if a key is pressed
    var userLetterChoice = String.fromCharCode(event.keyCode).toLowerCase(); //turn the key into a string and make it lowercase
    var message = "";
    document.getElementById("message").innerHTML = message;




    if (hangMan.keyLock === true) {




    } else if (hangMan.alphabet.indexOf(userLetterChoice) === -1) { //Run If it's not a valid letter in the alphabet
        message = "You've entered an invalid character";
        document.getElementById("message").innerHTML = message;


    } else if (hangMan.usedLetters.indexOf(userLetterChoice) > -1 || hangMan.underscoreArray.indexOf(userLetterChoice) > -1) { //Run If the letter has already been guessed incorrectly or correctly
        message = "You've already used that letter";
        document.getElementById("message").innerHTML = message;

    } else { //Run if all above statemetents are false

        for (i = 0; i < hangMan.computerWordChoice.length; i++) {

            if (hangMan.computerWordChoice.charAt(i) === userLetterChoice) { //runs through each letter of the word the computer chose, if any letter in the word  is the same as the guessed letter
                hangMan.underscoreArray[i] = userLetterChoice; //then change in the underScore array from an underscore to the guessed letter, like a replacement ( computerWordChoice.charAt(i) will always be in relation to the same position in underscoreArray[i])
                updateStats(); //update the stats so we can see the changes
            }
        }

        if (hangMan.underscoreArray.indexOf(userLetterChoice) === -1) { // Part of the final else statement. Only runs if it's an incorrect guess that hasn't been used before
            hangMan.usedLetters.push(userLetterChoice); //Push the wrong letter guess into the UsedLetters array, we can test now if these have already been guessed if they appear in the array on future guesses
            hangMan.lives -= 1; //take away a guess for being wrong
            updateStats(); //update stats so we can see the changes
        }

        if (hangMan.underscoreArray.indexOf("_") === -1) { //Run if there aren't any underscores remaining in the array. If there aren't any underscores left, then the puzzle has been solved
            
            hangMan.keyLock = true;
            message = "You win!"
            document.getElementById("message").innerHTML = message;
            ++hangMan.wins;
            document.getElementById("wins").innerHTML = "Wins: " + hangMan.wins;
            

        }

        if (hangMan.lives === 0) { //Run if guesses run out
            
            hangMan.keyLock = true;
            message = "Game Over"
            document.getElementById("message").innerHTML = message;
            ++hangMan.losses;
            document.getElementById("losses").innerHTML = "Losses: " + hangMan.losses;
            

        }

    }
};


function resetGame() {
    hangMan.usedLetters = [];
    hangMan.underscoreArray = [];
    hangMan.underscoreString = "";
    hangMan.keyLock = false; //unlocks keyboard
    hangMan.lives = 10;
    hangMan.generatePuzzle();
    updateStats();

};

function generatePuzzle() {
    hangMan.computerWordChoice = hangMan.wordArray[Math.floor(Math.random() * hangMan.wordArray.length)]; //computer selects a random word
    for (i = 0; i < hangMan.computerWordChoice.length; i++) { //creates array of underscores so I can pull their index to match with correct letters
        hangMan.underscoreArray.push("_");
    }
};


function updateStats() {
    var underscoreString = hangMan.underscoreArray.join(" "); //Sets my array as a string and adds a space inbetween each item
    document.getElementById("underScores").innerHTML = underscoreString;
    document.getElementById("usedLetters").innerHTML = "Guessed Letters: " + hangMan.usedLetters.join(" ");
    document.getElementById("lives").innerHTML = "Guesses Remaining: " + hangMan.lives;
    document.getElementById("wins").innerHTML = "Wins: " + hangMan.wins;
    document.getElementById("losses").innerHTML = "Losses: " + hangMan.losses;

};
