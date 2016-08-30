console.log('Javascript,are you there?')

//Selecting the stage and output
var stage = document.querySelector("#stage");
var output = document.querySelector("#output");

//Making the hero moves
window.addEventListener("keydown", keydownHandler, false);

// mapLevel1
var map = [
  [0,0,0,1,1,0,0,0,1,0,0,0,0],
  [0,2,1,2,0,2,0,2,0,2,0,2,0],
  [0,0,1,0,1,0,1,2,1,0,0,0,0],
  [0,2,0,2,1,2,0,2,1,2,1,2,1],
  [0,0,0,0,1,1,1,1,2,0,0,0,0],
  [0,2,0,2,0,2,2,2,0,2,0,2,1],
  [0,2,0,0,0,0,0,1,1,0,0,0,0],
  [0,2,1,2,0,2,1,2,0,2,0,2,0],
  [1,1,2,0,0,0,1,1,0,1,1,0,0],
  [0,2,0,2,0,2,0,2,1,2,0,2,1],
  [1,0,0,0,1,1,1,0,2,0,1,0,0],
]; // need to take out the ghost and spider.

var gameObjects = [
  [5,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,4,0,0,0,0,0,0,0,0],
  [4,0,0,0,0,0,4,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,4,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,4],
]; // for hero & the monsters. Just for spider only.

//Map Code
var standardTile = 0;
var softWall = 1;
var hardWall = 2;
var botGhost = 3;
var botSpider = 4;
var SHIP = 5;



//The size of each cell
var SIZE = 64;

//The number of rows and columns
var ROWS = map.length;
var COLUMNS = map[0].length;

//Find the ship's and monster's start positions
var shipRow;
var shipColumn;
var botSpiderRow;
var botSpiderColumn;

for(var row = 0; row < ROWS; row++)
{
  for(var column = 0; column < COLUMNS; column++)
  {
    if(gameObjects[row][column] === SHIP)
    {
      shipRow = row;
      shipColumn = column;
    }
    if(gameObjects[row][column] === botSpider)
    {
      botSpiderRow = row;
      botSpiderColumn = column;
    }
  }
}

//Arrow key codes
var UP = 38;
var DOWN = 40;
var RIGHT = 39;
var LEFT = 37;

render();

function keydownHandler(event)
{
  switch(event.keyCode)
  {
    case UP:
	    if(shipRow > 0)
	    {
	      //Clear the ship's current cell
	      gameObjects[shipRow][shipColumn] = 0;

	      //Subract 1 from the ship's row
	      shipRow--;

	      //Apply the ship's new updated position to the array
	      gameObjects[shipRow][shipColumn] = SHIP;
	    }
	    break;

	  case DOWN:
	    if(shipRow < ROWS - 1)
	    {
	      gameObjects[shipRow][shipColumn] = 0;
	      shipRow++;
	      gameObjects[shipRow][shipColumn] = SHIP;
	    }
	    break;

	  case LEFT:
	    if(shipColumn > 0)
	    {
	      gameObjects[shipRow][shipColumn] = 0;
	      shipColumn--;
	      gameObjects[shipRow][shipColumn] = SHIP;
	    }
	    break;

	  case RIGHT:
	    if(shipColumn < COLUMNS - 1)
	    {
	      gameObjects[shipRow][shipColumn] = 0;
	      shipColumn++;
	      gameObjects[shipRow][shipColumn] = SHIP;
	    }
	    break;
  }

  //find out what kind of cell the ship is on
  switch(map[shipRow][shipColumn])
  {
    case standardTile:
    console.log("Switch is working.")
    break;

    case softWall:

    break;

    case hardWall:

    break;

    case botGhost:

    break;

    case botSpider:
    break;
  }

  //Move the monster
  moveMonster();


  //Find out if the ship is touching the monster
  if(gameObjects[shipRow][shipColumn] === botSpider)
  {
    endGame();
  }


  //Render the game
  render();
}

function moveMonster()
{
  //The 4 possible directions that the monster can move
  var UP = 1;
  var DOWN = 2;
  var LEFT = 3;
  var RIGHT = 4;

  //An array to store the valid direction that
  //the monster is allowed to move in
  var validDirections = [];

  //The final direction that the monster will move in
  var direction = undefined;

  //Find out what kinds of things are in the cells
  //that surround the monster. If the cells contain water,
  //push the corresponding direction into the validDirections array
  if(botSpiderRow > 0)
  {
    var thingAbove = map[botSpiderRow - 1][botSpiderColumn];
    if(thingAbove === standardTile)
	  {
	    validDirections.push(UP);
	  }
  }
  if(botSpiderRow < ROWS - 1)
  {
    var thingBelow = map[botSpiderRow + 1][botSpiderColumn];
    if(thingBelow === standardTile)
	  {
	    validDirections.push(DOWN);
	  }
  }
  if(botSpiderColumn > 0)
  {
    var thingToTheLeft = map[botSpiderRow][botSpiderColumn - 1];
    if(thingToTheLeft === standardTile)
	  {
	    validDirections.push(LEFT);
	  }
  }
  if(botSpiderColumn < COLUMNS - 1)
  {
    var thingToTheRight = map[botSpiderRow][botSpiderColumn + 1];
    if(thingToTheRight === standardTile)
	  {
	    validDirections.push(RIGHT);
	  }
  }

  //The validDirections array now contains 0 to 4 directions that the
  //contain WATER cells. Which of those directions will the monster
  //choose to move in?

  //If a valid direction was found, Randomly choose one of the
  //possible directions and assign it to the direction variable
  if(validDirections.length !== 0)
  {
    var randomNumber = Math.floor(Math.random() * validDirections.length);
    direction = validDirections[randomNumber];
  }

  //Move the monster in the chosen direction
  switch(direction)
  {
    case UP:
      //Clear the monster's current cell
		  gameObjects[botSpiderRow][botSpiderColumn] = 0;
		  //Subtract 1 from the monster's row
		  botSpiderRow--;
		  //Apply the monster's new updated position to the array
		  gameObjects[botSpiderRow][botSpiderColumn] = botSpider;
		  break;

	  case DOWN:
	    gameObjects[botSpiderRow][botSpiderColumn] = 0;
		  botSpiderRow++;
		  gameObjects[botSpiderRow][botSpiderColumn] = botSpider;
	    break;

	  case LEFT:
	    gameObjects[botSpiderRow][botSpiderColumn] = 0;
		  botSpiderColumn--;
		  gameObjects[botSpiderRow][botSpiderColumn] = botSpider;
	    break;

	 case RIGHT:
	    gameObjects[botSpiderRow][botSpiderColumn] = 0;
		  botSpiderColumn++;
		  gameObjects[botSpiderRow][botSpiderColumn] = botSpider;
  }
}

// function endGame()
// {
//   if(map[shipRow][shipColumn] === HOME)
//   {
//     //Calculate the score
//     var score = food + gold + experience;
//
//     //Display the game message
//     gameMessage
//       = "You made it home ALIVE! " + "Final Score: " + score;
//   }
//   else if(gameObjects[shipRow][shipColumn] === MONSTER)
//   {
//     gameMessage
//       = "Your ship has been swallowed by a sea monster!";
//   }
//   else
//   {
//     //Display the game message
//     if(gold <= 0)
//     {
//       gameMessage += " You've run out of gold!";
//     }
//     else
//     {
//       gameMessage += " You've run out of food!";
//     }
//
//     gameMessage
//       += " Your crew throws you overboard!";
//   }
//
//   //Remove the keyboard listener to end the game
//   window.removeEventListener("keydown", keydownHandler, false);
// }

function render()
{
  // Clear the stage of img cells
  // from the previous turn

  if(mapLevel1.hasChildNodes())
  {
    for(var i = 0; i < ROWS * COLUMNS; i++)
    {
      stage.removeChild(stage.firstChild);
    }
  }

  //Render the game by looping through the map arrays
  for(var row = 0; row < ROWS; row++)
  {
    for(var column = 0; column < COLUMNS; column++)
    {
      //Create a img tag called cell
      var cell = document.createElement("img");

      //Set it's CSS class to "cell"
      cell.setAttribute("class", "cell");

      //Add the img tag to the <div id="stage"> tag
      stage.appendChild(cell);

      //Find the correct image for this map cell
      switch(map[row][column])
      {
        case standardTile:
        cell.src = "/Users/dexterleow/Desktop/Project-1-Bomberman/img/Games-Artwork/standardTile.png";
        break;

        case softWall:
        cell.src = "/Users/dexterleow/Desktop/Project-1-Bomberman/img/Games-Artwork/softWall.png";
        break;

        case hardWall:
        cell.src = "/Users/dexterleow/Desktop/Project-1-Bomberman/img/Games-Artwork/hardWall.png";
        break;

        case botGhost:
        cell.src = "/Users/dexterleow/Desktop/Project-1-Bomberman/img/Games-Artwork/botGhost.png";
        break;

        case botSpider:
        cell.src = "/Users/dexterleow/Desktop/Project-1-Bomberman/img/Games-Artwork/botSpider.png";
        break;
      }

      //Add the ship and monster from the gameObjects array
	    switch(gameObjects[row][column])
	    {
	      case SHIP:
        cell.src = "/Users/dexterleow/Desktop/Project-1-Bomberman/img/Games-Artwork/mainHero_front_view.png";
        break;

        case botSpider:
        cell.src = "/Users/dexterleow/Desktop/Project-1-Bomberman/img/Games-Artwork/botSpider.png";
        break;

	    }

      //Position the cell
      cell.style.top = row * SIZE + "px";
      cell.style.left = column * SIZE + "px";
    }
  }
}



//Smooth Implementation of keyPressDown
// keyisdown=false
// keydown event{
//     if(!keyisdown){
//         //This is the 'real' keydown event, the one that only happens the moment the
//         //key is pressed down. You may not need it, but this is how you construct it.
//     }
//     keyisdown=true
// }
//
// keyup event{
//     keyisdown=false
// }

// ///Making the bomb.
// bombobject = {} //That is all it takes to make an object.
// // bombobject.blowtime = delay
// // bombobject.position = mapobject
// // mapobject.bomb = bombobject
//
// function placeBomb(){
//
//     // if(placebomb && hero.bombs != 0)
//     {
//         // map[heroRow][heroColumn].object = 2;
//         var bombRow = [heroRow];
//         var bombColumn = [heroColumn];
//         // placebomb = false;
//         // player.bombs--;
//         // setTimeout(explode, 3000);
//         console.log("Bomb has exploded")
//     }
//     // function explode(){
//     //     alert('BOOM!');
//     //     delete map[bombY][bombX].object;
//     //     player.bombs++;
//     // }
// }
//
// ///Making the bomb.
// bombobject = {} //That is all it takes to make an object.
// bombobject.blowtime = currenttime + delay
// bombobject.position = mapobject
// mapobject.bomb = bombobject
//
// function placeBomb(){
//     if(placebomb && player.bombs != 0){
//         map[player.Y][player.X].object = 2;
//         var bombX = player.X;
//         var bombY = player.Y;
//         placebomb = false;
//         player.bombs--;
//         setTimeout(explode, 3000);
//     }
//     function explode(){
//         alert('BOOM!');
//         delete map[bombY][bombX].object;
//         player.bombs++;
//     }
// }
