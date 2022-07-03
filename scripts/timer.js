var currentDatePlus2Minutes = new Date( Date.now() + 2500 * 60 );
var currentTime = Date.now();
var minutes, seconds;
var milliseconds;
var disable = true;
var timeleft;

function UpdateTimer()
{
	currentTime = Date.now();

	timeleft = currentDatePlus2Minutes - currentTime;

	const d = new Date(timeleft);

	minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
	seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
	milliseconds = d.getMilliseconds();
}

function UpdateHTML()
{
	document.querySelector(".timerS").innerHTML = "" + minutes + ":" + seconds + "." + milliseconds;
}

function Update()
{
	requestAnimationFrame(Update);

	if(disable)
	{
		UpdateTimer();
		UpdateHTML();
	}

	if(timeleft < 0)
	{
		disable = true;
		window.top.postMessage("game-over", "*");
	}
}

window.onmessage = function(e) 
{
	if (e.data == 'disable-timer') 
	{
		disable = true;
		console.log("Disabling Timer...");
		document.querySelector(".full").style.display = "none";
	}
	else if(e.data == 'enable-timer')
	{
		disable = false;
	}
}

requestAnimationFrame(Update);