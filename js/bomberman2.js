console.log('Javascript,are you there?')

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
var mainHero = 5;

//Movement of the mainHero
var mainHeroRow;
var mainHeroColumn;

//Movement of botSpider
var botSpiderRow;
var botSpiderColumn;

//program uses a loop to figure out where the ship is in the object array.
for(var row = 0;row < ROWS; row++)
{
  for(var column = 0; column < COLUMNS;column++)
  {
    if(gameObjects[row][column] === mainHero)
    {
      mainHeroRow = row;
      mainHeroColumn = column;
    }
    if(gameObjects[row][column] === botSpider)
    {
      botSpiderRow = row;
      botSpiderColumn = column;
    }
  }
}

movebotSpiderRow();

function movebotSpiderRow()
{
  //The 4 possible directions that the monster can move
  var UP = 1;
  var DOWN = 2;
  var LEFT = 3;
  var RIGHT = 4;
  //An array to store the valid direction that the monster is allowed to move in
  var validDirections = [];
  //The final direction that the monster will move in
  var direction = undefined;
  //Find out what kinds of things are in the cells
  //that surround the monster. If the cells contain WATER,
  //push the corresponding direction (UP, DOWN, LEFT, or RIGHT) into the validDirections array
  if(botSpiderRow > 0)
  {
    var thingAbove = map[botSpiderRow - 1][botSpiderColumn];

    if(thingAbove === standardTile)
    {
      validDirections.push(UP)
    }
  }
  if(botSpiderRow < ROWS - 1)
  {
    var thingBelow = map[botSpiderRow + 1][botSpiderColumn];
    if(thingBelow === standardTile)
    {
      validDirections.push(DOWN)
    }
  }
  if(botSpiderColumn > 0)
  {
    var thingToTheLeft = map[botSpiderRow][botSpiderColumn - 1];
    if(thingToTheLeft === standardTile)
    {
      validDirections.push(LEFT)
    }
  }
  if(botSpiderColumn < COLUMNS - 1)
  {
    var thingToTheRight = map[botSpiderRow][botSpiderColumn + 1];
    if(thingToTheRight === standardTile)
    {
      validDirections.push(RIGHT)
    }
  }
  //The validDirections array now contains 0 to 4 directions that
  //contain WATER cells. Which of those directions will the monster
  //choose to move in?
  //If a valid direction was found, randomly choose one of the
  //possible directions and assign it to the direction variable
  if(validDirections.length !== 0)
  {
    var randomNumber = Math.floor(Math.random() * validDirections.length);
    direction = validDirections[randomNumber];
  }
  //Move the monster in the chosen random direction
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
    monsterRow++;
    gameObjects[botSpiderRow][botSpiderColumn] = botSpider;
    break;

    case LEFT:
    gameObjects[botSpiderRow][botSpiderColumn] = 0;
    monsterColumn--;
    gameObjects[botSpiderRow][botSpiderColumn] = botSpider;
    break;

    case RIGHT:
    gameObjects[botSpiderRow][botSpiderColumn] = 0;
    monsterColumn++;
    gameObjects[botSpiderRow][botSpiderColumn] = botSpider;
  }
}


//Selecting the stage and output
var stage = document.querySelector("#stage");
var output = document.querySelector("#output");


// The size of each tile
var SIZE = 64;

//The number of rows and columns in the mapLevel1
var ROWS = map.length;
var COLUMNS = map[0].length;

//Making the hero moves
window.addEventListener("keydown", keydownHandler, false);

//Up, down, left,right constant keys
var UP = 38; //Keycode for up
var DOWN = 40; //Keycode for down
var RIGHT = 39; //Keycode for right
var LEFT = 37; //Keycode for left


function keydownHandler(event) //for the movement of main hero
{
  switch(event.keyCode)
  {
    case UP:
    //Find out if the mainHero's move will be within the playing field
    if(mainHeroRow > 0)
    {
      //If it is, clear the mainHero's current cell
      gameObjects[mainHeroRow][mainHeroColumn] = 0;
      //Subtract 1 from the mainHero's row to move it up one row on the map
      mainHeroRow--;
      //Apply the mainHero's new updated position to the array
      gameObjects[mainHeroRow][mainHeroColumn] = mainHero;
    }
    break;

    case DOWN:
    if(mainHeroRow < ROWS - 1)
    {
      gameObjects[mainHeroRow][mainHeroColumn] = 0;
      mainHeroRow++;
      gameObjects[mainHeroRow][mainHeroColumn] = mainHero;
    }
    break;

    case LEFT:
    if(mainHeroColumn > 0)
    {
      gameObjects[mainHeroRow][mainHeroColumn] = 0;
      mainHeroColumn--;
      gameObjects[mainHeroRow][mainHeroColumn] = mainHero;
    }
    break;

    case RIGHT:
    if(mainHeroColumn < COLUMNS - 1)
    {
      gameObjects[mainHeroRow][mainHeroColumn] = 0;
      mainHeroColumn++;
      gameObjects[mainHeroRow][mainHeroColumn] = mainHero;
    }
    break;

    // var keyPressed = String.fromCharCode(event.keyCode);
    //
    // case keyPressed == "D":
    // console.log("Keys are working fine!")
    // break;
  }
  //Render the game

}

//Finding out where the main hero is.   (It's off for now. will uncomment it later.)
// switch(map[mainHeroRow][mainHeroColumn])
// {
//   case standardTile:
//   console.log("standardTile");
//   break;
//
//   case softWall:
//   console.log("softWall");
//   break;
//
//   case hardWall:
//   console.log("hardWall");
//   break;
//
//   case botGhost:
//   console.log("botGhost");
//   break;
//
//   case botSpider:
//   console.log("botSpider");
//   break;
// }


render();

function render()
{
  //Clear the stage of img tag cells from the previous turn

  // if(stage.hasChildNodes())
  // {
  //   for(var i = 0; i < ROWS * COLUMNS; i++)
  //   {
  //     stage.removeChild(stage.firstChild);
  //   }
  // }  //Will come back to it later.
  //Render the game by looping through the map arrays
  for(var row = 0; row < ROWS;row++)
  {
    for(var column = 0; column < COLUMNS;column++)
    {
      //Create an img tag called cell
      var cell = document.createElement("img");

      //Set its CSS class to "cell";
      cell.setAttribute("class","cell");

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

      //Add the mainHero from the gameObjects array
      // switch(gameObjects[row][column])
      // {
      //   case mainHero:
      //   cell.src = "/Users/dexterleow/Desktop/Project-1-Bomberman/img/Games-Artwork/mainHero_front_view.png";
      //   break;
      //
      //   case botSpider:
      //   cell.src = "/Users/dexterleow/Desktop/Project-1-Bomberman/img/Games-Artwork/botSpider.png";
      //   break;

      }

      //Position the cell
      cell.style.top = row * SIZE + "px";
      cell.style.left = column * SIZE + "px";
    }

  }
}




//Find out if the ship is touching the monster
// if(gameObjects[shipRow][shipColumn] === MONSTER)
// {
// endGame();
// }
//
// function endGame()
// {
// if(map[shipRow][shipColumn] === HOME)
// {
// //... Figure out the score
// }
// else if(gameObjects[shipRow][shipColumn] === MONSTER)
// {
// gameMessage
// = "Your ship has been swallowed by a sea monster!";
// }
// else
// {
// //... You run out of food or gold
// }
// //Remove the keyboard listener to end the game
// window.removeEventListener("keydown", keydownHandler, false);
// }
