var buttonSequence = [];

var currentPhase = 0;
var currentButton = 0;
var phase1 = [], phase2 = [], phase3 = [], phase4 = [], phase5 = [], phase6 = [];

var stopFunctions = false;

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function ClearArray(array) 
{
	while (array.length) 
	{
		array.pop();
	}
}

function SetButtonSequence(numbArray)
{
	ClearArray(phase1);
	ClearArray(phase2);
	ClearArray(phase3);
	ClearArray(phase4);
	ClearArray(phase5);
	ClearArray(phase6);

	for(var i = 0; i < 6; i++)
	{
		for(var m = 0; m < i + 1; m++)
		{
			if(i == 0)
				phase1.push(numbArray[m]);
			else if(i == 1)
				phase2.push(numbArray[m]);
			else if(i == 2)
				phase3.push(numbArray[m]);
			else if(i == 3)
				phase4.push(numbArray[m]);
			else if(i == 4)
				phase5.push(numbArray[m]);
			else if(i == 5)
				phase6.push(numbArray[m]);
		}
	}

	console.log(phase1);
	console.log(phase2);
	console.log(phase3);
	console.log(phase4);
	console.log(phase5);
	console.log(phase6);
}

function SetSimonColors(color1, color2, color3, color4)
{
	document.querySelector("#s1").style.backgroundColor = color1;
	document.querySelector("#s2").style.backgroundColor = color2;
	document.querySelector("#s3").style.backgroundColor = color3;
	document.querySelector("#s4").style.backgroundColor = color4;
}

function SetPattern(numb)
{
	currentPhase = 0;
	currentButton = 0;
	stopFunctions = false;

	switch(numb)
	{
		case 0:
			SetSimonColors("rgb(255, 0, 0)", "rgb(0, 0, 255)", "rgb(255, 255, 0)", "rgb(0, 255, 0)");
			SetButtonSequence([3, 1, 3, 4, 2, 3]);
			break;
		case 1:
			SetSimonColors("rgb(255, 0, 0)", "rgb(0, 255, 0)", "rgb(255, 0, 255)", "rgb(0, 0, 255)");
			SetButtonSequence([1, 3, 3, 2, 4, 3]);
			break;
		case 2:
			SetSimonColors("rgb(0, 0, 255)", "rgb(255, 0, 0)", "rgb(0, 255, 0)", "rgb(0, 255, 255)");
			SetButtonSequence([1, 1, 4, 2, 1, 3]);
			break;
		case 3:
			SetSimonColors("rgb(0, 255, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 255)", "rgb(255, 0, 0)");
			SetButtonSequence([4, 2, 1, 4, 3, 3]);
			break;
		case 4:
			SetSimonColors("rgb(255, 0, 255)", "rgb(0, 255, 255)", "rgb(255, 255, 0)", "rgb(0, 255, 0)");
			SetButtonSequence([4, 1, 2, 3, 1, 2]);
			break;
	}
}

SetPattern(randomIntFromInterval(0, 4));

function GetCurrentPhase()
{
	switch(currentPhase)
	{
		case 0:
			return phase1;
			break;
		case 1:
			return phase2;
			break;
		case 2:
			return phase3;
			break;
		case 3:
			return phase4;
			break;
		case 4:
			return phase5;
			break;
		case 5:
			return phase6;
			break;
	}
}

function GameWin()
{
	console.log("Congrats! :D");
	document.querySelector("#s1").style.backgroundColor = "rgb(0, 255, 0)";
	document.querySelector("#s2").style.backgroundColor = "rgb(0, 255, 0)";
	document.querySelector("#s3").style.backgroundColor = "rgb(0, 255, 0)";
	document.querySelector("#s4").style.backgroundColor = "rgb(0, 255, 0)";
	stopFunctions = true;
	window.top.postMessage('i-completed-simon-game', '*');
}

function WhoopsRestart()
{
	stopFunctions = true;

	document.querySelector("#s1").style.backgroundColor = "red";
	document.querySelector("#s2").style.backgroundColor = "red";
	document.querySelector("#s3").style.backgroundColor = "red";
	document.querySelector("#s4").style.backgroundColor = "red";

	setTimeout(function () 
	{
    	SetPattern(randomIntFromInterval(0, 4));    
    }, 
    1000);
}

function ButtonClick(numb)
{
	if(!stopFunctions)
	{
		var phase = GetCurrentPhase();
		if(phase[currentButton] == numb)
		{
			console.log("Correct!");
			if(currentButton + 1 >= phase.length)
			{
				currentPhase++;
				currentButton = 0;
				console.log("Phase Changed to " + currentPhase);
	
				if(currentPhase >= 6)
					GameWin();
			}
			else
				currentButton++;
		}
		else
		{
			console.log("Whoops :c");
			WhoopsRestart();
		}
	}
}