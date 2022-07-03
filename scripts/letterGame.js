function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

var letterGameDiv;
var currentWord = "";

var words = ['fabuloso', 'excelente', 'minelli', 'thriller', 'hitchcock'];
var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

var numbArray = randomIntFromInterval(0, 4);

var selectedWord = words[numbArray];

//console.log(selectedWord);

function SetPattern()
{
	if(selectedWord == 'fabuloso')
	{
		SetColorAndFont(0, 0, 0, 0); // Black
		SetColorAndFont(1, 255, 0, 0); // Red
		SetColorAndFont(2, 255, 255, 0); // Yellow
		SetColorAndFont(3, 0, 255, 0); // Green
		SetColorAndFont(4, 0, 255, 255); // Cyan
		SetColorAndFont(5, 255, 56, 152); // Pink
		SetColorAndFont(6, 0, 255, 0); // Green
		SetColorAndFont(7, 255, 0, 0); // Red
	}
	else if(selectedWord == 'excelente')
	{
		SetColorAndFont(0, 0, 255, 0); // Green
		SetColorAndFont(1, 255, 255, 0); // Yellow
		SetColorAndFont(2, 0, 0, 0); // Black
		SetColorAndFont(3, 255, 0, 0); // Red
		SetColorAndFont(4, 0, 0, 0); // Black
		SetColorAndFont(5, 255, 56, 152); // Pink
		SetColorAndFont(6, 0, 255, 0); // Green
		SetColorAndFont(7, 0, 255, 255); // Cyan
		SetColorAndFont(8, 0, 255, 0); // Green
	}
	else if(selectedWord == 'minelli')
	{
		SetColorAndFont(0, 255, 56, 152); // Pink
		SetColorAndFont(1, 255, 255, 0); // Yellow
		SetColorAndFont(2, 255, 0, 0); // Red
		SetColorAndFont(3, 0, 255, 0); // Green
		SetColorAndFont(4, 0, 255, 255); // Cyan
		SetColorAndFont(5, 255, 255, 0); // Yellow
		SetColorAndFont(6, 255, 255, 0); // Yellow
	}
	else if(selectedWord == 'hitchcock')
	{
		SetColorAndFont(0, 255, 0, 0); // Red
		SetColorAndFont(1, 255, 56, 152); // Pink
		SetColorAndFont(2, 0, 255, 0); // Green
		SetColorAndFont(3, 0, 255, 0); // Green
		SetColorAndFont(4, 0, 0, 0); // Black
		SetColorAndFont(5, 255, 255, 0); // Yellow
		SetColorAndFont(6, 0, 255, 255); // Cyan
		SetColorAndFont(7, 255, 255, 0); // Yellow
		SetColorAndFont(8, 0, 0, 0); // Black
	}
	else if(selectedWord == 'thriller')
	{
		SetColorAndFont(0, 0, 255, 0); // Green
		SetColorAndFont(1, 0, 0, 0); // Black
		SetColorAndFont(2, 0, 0, 0); // Black
		SetColorAndFont(3, 255, 255, 0); // Yellow
		SetColorAndFont(4, 255, 0, 0); // Red
		SetColorAndFont(5, 255, 56, 152); // Pink
		SetColorAndFont(6, 0, 255, 255); // Cyan
		SetColorAndFont(7, 255, 255, 0); // Yellow
	}
}

function SetColorAndFont(number, r, g, b)
{
	letterGameDiv = document.getElementById("letterGame");
	var letterDiv = letterGameDiv.querySelector("#let" + number);

	letterDiv.querySelector("#letter-box").style.backgroundColor = "rgb(" + r + ", " + g + ", " + b + ")";

	if(r == 0 && g == 0 && b == 0)
		letterDiv.querySelector("#letter-box").style.color = "white";
	else
		letterDiv.querySelector("#letter-box").style.color = "black";
}

function UpArrow(number)
{
	//console.log("click");

	letterGameDiv = document.getElementById("letterGame");
	var letterDiv = letterGameDiv.querySelector("#let" + number);

	if(letterDiv != undefined)
	{
		var letterBox = letterDiv.querySelector("#letter-box");
		var letterText = letterBox.querySelector("#letter-text");
	
		var currentIndex = LetterToAlphabetIndex(letterText.innerHTML);
	
		var index = currentIndex - 1;

		if(index < 0)
			index = alphabet.length - 1;
	
		currentWord = currentWord.replaceAt(number, alphabet[index]);
	
		//console.log(currentWord);
	
		letterText.innerHTML = alphabet[index];

		CheckIfWordIsCorrect();
	}
	else
	{
		console.log("undefined");
	}
}

function DownArrow(number)
{
	//console.log("click");

	letterGameDiv = document.getElementById("letterGame");
	var letterDiv = letterGameDiv.querySelector("#let" + number);

	if(letterDiv != undefined)
	{
		var letterBox = letterDiv.querySelector("#letter-box");
		var letterText = letterBox.querySelector("#letter-text");
	
		var currentIndex = LetterToAlphabetIndex(letterText.innerHTML);
	
		var index = currentIndex + 1;

		if(index == alphabet.length)
			index = 0;
	
		currentWord = currentWord.replaceAt(number, alphabet[index]);
	
		//console.log(currentWord);
	
		letterText.innerHTML = alphabet[index];

		CheckIfWordIsCorrect();
	}
	else
	{
		console.log("undefined");
	}
}

function CheckIfWordIsCorrect()
{
	if(currentWord == selectedWord)
		WinLetterGame();
	else
		console.log("Status of current word: " + currentWord);
}

for (var i = 0; i < selectedWord.length; i++) {
    AddLetterToHTMLBox(selectedWord.charAt(i), i);
}

var minus = 9 - selectedWord.length;
console.log(minus);

for(var i = 8; i > 8 - minus; i--)
{
	var elementToHide = document.getElementById("letterGame").querySelector(`#let` + i);
	elementToHide.style.display = 'none';
	console.log("Hidding element " + i);
}

console.log(currentWord);

SetPattern();

function GetRandomLetterOfAlphabet()
{
	var alphabetRandNumbArr = randomIntFromInterval(0, alphabet.length - 1);
	return alphabet[alphabetRandNumbArr];
}

function LetterToAlphabetIndex(letter)
{
	for(var i = 0; i < alphabet.length; i++)
	{
		if(letter == alphabet[i])
		{
			return i;
		}
	}
}

function AddLetterToHTMLBox(letter, numb)
{
	letterGameDiv = document.getElementById("letterGame");
	var randomLetter = GetRandomLetterOfAlphabet();

	//console.log(letterGameDiv.lastChild);
	var htmlEl = document.getElementById("letterGame").querySelector(`#let` + numb).querySelector(".letter-box");
	var text = htmlEl.querySelector(".letter-text");

	text.innerHTML = randomLetter;

	currentWord += randomLetter;
}

function SetWinPattern()
{
	SetColorAndFont(0, 0, 255, 0);
	SetColorAndFont(1, 0, 255, 0);
	SetColorAndFont(2, 0, 255, 0);
	SetColorAndFont(3, 0, 255, 0);
	SetColorAndFont(4, 0, 255, 0);
	SetColorAndFont(5, 0, 255, 0);
	SetColorAndFont(6, 0, 255, 0);
	SetColorAndFont(7, 0, 255, 0);
	SetColorAndFont(8, 0, 255, 0);
}

function WinLetterGame()
{
	console.log("Congrats!");
	SetWinPattern();
	window.top.postMessage('i-completed-letter-game', '*');
}