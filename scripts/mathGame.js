var mathSymb = [];
var mathNumb = [];
var mathSymbResult = "";
var mathNumbResult = 0;

function SetMathPattern(number)
{
	switch(number)
	{
		case 0:
			mathSymb = ["+", "*", "/"];
			mathNumb = [1, 3, 2];

			mathSymbResult = "-";
			mathNumbResult = 1.5;
			break;
		case 1:
			mathSymb = ["-", "*", "+"];
			mathNumb = [2, 4, 9];
			
			mathSymbResult = "/";
			mathNumbResult = 0;
			break;
		case 2:
			mathSymb = ["*", "+", "-"];
			mathNumb = [3, 9, 12];
			
			mathSymbResult = "+";
			mathNumbResult = 3;
			break;
		case 3:
			mathSymb = ["+", "/", "/"];
			mathNumb = [24, 2, 3];
			
			mathSymbResult = "*";
			mathNumbResult = 0;
			break;
		case 4:
			mathSymb = ["-", "+", "-"];
			mathNumb = [8, 10, 9];
			
			mathSymbResult = "+";
			mathNumbResult = 7;
			break;
		case 5:
			mathSymb = ["+", "-", "/"];
			mathNumb = [180, 65, 2];
			
			mathSymbResult = "-";
			mathNumbResult = 57.5;
			break;
		case 6:
			mathSymb = ["-", "+", "-"];
			mathNumb = [1.2, 9.3, 7.1];
			
			mathSymbResult = "-";
			mathNumbResult = 1;
			break;
		case 7:
			mathSymb = ["*", "*", "*"];
			mathNumb = [63, 45, 609];
			
			mathSymbResult = "+";
			mathNumbResult = 0;
			break;
		case 8:
			mathSymb = ["+", "+", "+"];
			mathNumb = [60, 40, 53];
			
			mathSymbResult = "-";
			mathNumbResult = 153;
			break;
	}
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

SetMathPattern(randomIntFromInterval(0, 8));

var box1 = document.querySelector("#b1");
var box2 = document.querySelector("#b2");
var box3 = document.querySelector("#b3");

box1.querySelector(".symbol").innerHTML = mathSymb[0];
box2.querySelector(".symbol").innerHTML = mathSymb[1];
box3.querySelector(".symbol").innerHTML = mathSymb[2];

box1.querySelector(".number").innerHTML = mathNumb[0];
box2.querySelector(".number").innerHTML = mathNumb[1];
box3.querySelector(".number").innerHTML = mathNumb[2];

var localWin = false;
var isSymbolTrue = false;
var isNumberTrue = false;

function ChangeBoxColorToWin(box, isRes)
{
	box.style.backgroundColor = "rgb(0, 255, 0)";
	box.style.color = "black";
	box.style.border = "1px solid black";

	if(!isRes)
	{
		box.querySelector(".symbol").style.color = "black";
		box.querySelector(".number").style.color = "black";
	}
	else
	{
		box.querySelector(".result").style.color = "black";
		box.querySelector(".result").style.border = "1px solid black";
		box.querySelector(".number-result").style.color = "black";
		box.querySelector(".number-result").style.border = "1px solid black";
	}
}

function WinGame()
{
	console.log("Congrats! :D");
	ChangeBoxColorToWin(box1, false);
	ChangeBoxColorToWin(box2, false);
	ChangeBoxColorToWin(box3, false);
	ChangeBoxColorToWin(document.querySelector("#bRes"), true);

	window.top.postMessage('i-completed-math-game', '*');
	localWin = true;
}

function CheckForWin()
{
	if(isSymbolTrue && isNumberTrue)
		WinGame();
}

function CheckForSymbol(v)
{
	console.log(v);
	isSymbolTrue = v == mathSymbResult;

	CheckForWin();
}

function CheckForNumber(v)
{
	console.log(v);
	var numb = parseFloat(v);
	isNumberTrue = numb == mathNumbResult;

	CheckForWin();
}

function OnSymbolChange(value)
{
	console.log("Changing Symbol...");
	CheckForSymbol(value);
}

function OnNumberChange(value)
{
	console.log("Changing Number...");
	CheckForNumber(value);
}

var symbResInput = document.querySelector(".result");
var numbResInput = document.querySelector(".number-result");

var lastSymbResInput = symbResInput.value;
var lastNumbResInput = numbResInput.value;

function Update()
{
	requestAnimationFrame(Update);

	if(lastSymbResInput != symbResInput.value)
	{
		OnSymbolChange(symbResInput.value);
		lastSymbResInput = symbResInput.value;
	}

	if(lastNumbResInput != numbResInput.value)
	{
		OnNumberChange(numbResInput.value);
		lastNumbResInput = numbResInput.value;
	}
}

requestAnimationFrame(Update);