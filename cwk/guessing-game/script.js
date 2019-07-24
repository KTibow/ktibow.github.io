// declarations
var letters = [];
var wins = 0;
var losses = 0;
var guesses = 10;
var lettersGuessed = [];
// fill list of letters to choose from
for (var i = 97; i <= 122; i += 1) {
	letters.push(String.fromCharCode(i));
}
for (i = 0; i <= 5; i += 1) {
	letters.push('e');
}
letters.push('t');
letters.push('t');
// choose letter
var myLetter = letters[Math.floor(Math.random() * 34)];
// reset for next round
function resetStuff() {
	window.myLetter = letters[Math.floor(Math.random() * 34)];
	window.guesses = 10;
	window.lettersGuessed = [];
}
// grab elements
var guessesToGo = document.getElementById("togo");
var winsElement = document.getElementById("wins");
var lossesElement = document.getElementById("losses");
var guessedElement = document.getElementById("guessed");
// handle key presses
function keyPressed() {
	var theKey = event.key.toLocaleLowerCase();
	if (theKey === myLetter) {
		wins += 1;
		alert("Good job! You guessed correctly.");
		resetStuff();
	} else {
		guesses -= 1;
		lettersGuessed.push(theKey);
		alert("Incorrect. There's a " + guesses.toString() +"/10 chance you have physic powers.");
		if (guesses == 0) {
			alert("Oh well. You're just a normal person. Try again!");
			alert("The correct answer was "+myLetter);
			resetStuff();
			losses += 1;
		}
	}
	guessesToGo.innerHTML = guesses.toString();
	guessedElement.innerHTML = lettersGuessed;
	if (letters.length == 0) {
		guessedElement.innerHTML = "None";
	}
	winsElement.innerHTML = wins.toString();
	lossesElement.innerHTML = losses.toString();
}
// set initial values
guessesToGo.innerHTML = guesses.toString();
guessedElement.innerHTML = "None";
winsElement.innerHTML = wins.toString();
lossesElement.innerHTML = losses.toString();

// when key released, run my function
window.onkeyup = keyPressed;