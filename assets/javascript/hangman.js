// Establish word bank
var wordBank = ["acid", "alloy", "atom", "base", "bond", "compound", "buffer", "ion", "colloid", "proton", "neutron", "electron", "enthalpy", "entropy", "heat", "hydrocarbon", "isotope"];

// Randomly generate word from word bank
var i = Math.floor((Math.random() * 10));
var word = wordBank[i];

// Generate blanked out version of word
var wordLength = word.length;
var blankedWord = [""];
for (var j=1; j<=wordLength; j++) {
    blankedWord = blankedWord + "_ ";
}

// Initialize variables
var wins = 0;
var losses = 0;
var guessesRemaining = 9;
var lettersAlreadyGuessed = [];

var blankedWordNode = document.getElementById("blanked-word");
var winsNode = document.getElementById("wins");
var lossesNode = document.getElementById("losses");
var guessesRemainingNode = document.getElementById("guesses-remaining");
var lettersAlreadyGuessedNode = document.getElementById("letters-already-guessed");

// Update HTML
blankedWordNode.textContent = blankedWord;
winsNode.textContent = wins;
lossesNode.textContent = losses;
guessesRemainingNode.textContent = guessesRemaining;
lettersAlreadyGuessedNode.textContent = lettersAlreadyGuessed;


// Collect letter from user
document.onkeyup = function(event) {
    var guessedLetter = event.key;
    
    // If guessed letter hasn't already been entered by user
    if (lettersAlreadyGuessed.indexOf(guessedLetter) === -1 ) {
        
        // If guessed letter is not found in word
        if (word.indexOf(guessedLetter) === -1) {

            // Put guessedLetter in lettersAlreadyGuessed and decrement number of guesses remaining by one
            lettersAlreadyGuessed.push(guessedLetter);
            guessesRemaining = guessesRemaining - 1;

            // If out of guesses, reset game
            if (guessesRemaining === 0) {
                // Increment losses by one
                losses = losses + 1;
                // Randomly generate new word from word bank
                i = Math.floor((Math.random() * 10));
                word = wordBank[i];
                // Generate blanked out version of word
                wordLength = word.length;
                blankedWord = [""];
                for (var j=1; j<=wordLength; j++) {
                    blankedWord = blankedWord + "_ ";
                }
                // Reset number of guesses
                guessesRemaining = 9;
                // Empty list of guessed letters
                lettersAlreadyGuessed = [];
            } 

        }        

        // Guessed letter is found in word
        else {

            // Comb through word letter by letter to determine positions at which the guessed letter occurs
            for (var k=0; k<wordLength;k++) {

                // If the k-th index (i.e., the (k+1)th letter) of the word matches the guessed letter
                if (word.charAt(k) === guessedLetter) {
                    
                    // If this is the first instance of the guessed letter occurring within the word
                    if ( lettersAlreadyGuessed.indexOf(guessedLetter) === -1 ) {
                        
                        // Put guessedLetter in letters already guessed list
                        lettersAlreadyGuessed.push(guessedLetter);
                    }

                    // Fill in applicable blank spaces

                    blankedWord = blankedWord.substr(0, 2*k) + guessedLetter + " " + blankedWord.substr(2*(k+1));

                    // If all the blanks have been filled, reset game
                    if (blankedWord.indexOf("_") ===  - 1 ) {

                        // Increment wins by one
                        wins = wins + 1;
                        // Randomly generate new word from word bank
                        i = Math.floor((Math.random() * 10));
                        word = wordBank[i];
                        // Generate blanked out version of word
                        wordLength = word.length;
                        blankedWord = [""];
                        for (var j=1; j<=wordLength; j++) {
                            blankedWord = blankedWord + "_ ";
                        }
                        // Reset number of guesses
                        guessesRemaining = 9;
                        // Empty list of guessed letters
                        lettersAlreadyGuessed = [];
                    }
                }
            }


        }

        
        // Update HTML
        blankedWordNode.textContent = blankedWord;
        winsNode.textContent = wins;
        lossesNode.textContent = losses;
        guessesRemainingNode.textContent = guessesRemaining;
        lettersAlreadyGuessedNode.textContent = lettersAlreadyGuessed;
        
    }


};

