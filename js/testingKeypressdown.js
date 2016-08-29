
console.log("Where am I?")

document.addEventListener("keydown",keyDownHandler, false);

function keyDownHandler(event)
{
	var keyPressed = String.fromCharCode(event.keyCode);

	if (keyPressed == "W")
	{
		// facing = "N";
		// isMoving = true;
		console.log("moving up");
	}
	else if (keyPressed == "D")
	{
		// facing = "E";
		// isMoving = true;
		console.log("moving right");
	}
	else if (keyPressed == "S")
	{
		// facing = "S";
		// isMoving = true;
		console.log("moving down");
	}
	else if (keyPressed == "A")
	{
		// facing = "W";
		// isMoving = true;
			console.log("moving left");
	}
}
