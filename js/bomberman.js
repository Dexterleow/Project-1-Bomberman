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
var HERO = 5;

//The number of rows and columns in the mapLevel1
var ROWS = map.length;
var COLUMNS = map[0].length;

// The size of each tile
var SIZE = 64;

//Movement of the mainHero
var heroRow;
var heroColumn;

//Movement of botSpider
var botSpiderRow;
var botSpiderColumn;

//program uses a loop to figure out where the hero is in the object array.
for(var row = 0;row < ROWS; row++)
{
  for(var column = 0; column < COLUMNS; column++)
  {
    if(gameObjects[row][column] === HERO)
    {
      heroRow = row;
      heroColumn = column;
    }
    if(gameObjects[row][column] === botSpider)
    {
      botSpiderRow = row;
      botSpiderColumn = column;
    }
  }
}

//Up, down, left,right constant keys
var UP = 38; //Keycode for up
var DOWN = 40; //Keycode for down
var RIGHT = 39; //Keycode for right
var LEFT = 37; //Keycode for left
var SPACEBAR = 32; //Keycode for Spacebar

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
    botSpiderRow++;
    gameObjects[botSpiderRow][botSpiderColumn] = botSpider;
    break;

    case LEFT:
    gameObjects[botSpiderRow][botSpiderColumn] = 0;
    botSpiderRow--;
    gameObjects[botSpiderRow][botSpiderColumn] = botSpider;
    break;

    case RIGHT:
    gameObjects[botSpiderRow][botSpiderColumn] = 0;
    botSpiderRow++;
    gameObjects[botSpiderRow][botSpiderColumn] = botSpider;
  }
}

movebotSpiderRow();

function keydownHandler(event)
{
  switch(event.keyCode)
  {
    case UP:
    if(heroRow > 0)
    {
      //Clear the hero's current cell
      gameObjects[heroRow][heroColumn] = 0;

      //Subract 1 from the hero's row
      heroRow--;

      //Apply the hero's new updated position to the array
      gameObjects[heroRow][heroColumn] = HERO;
      console.log("moving up");
    }
    break;

    case DOWN:
    if(heroRow < ROWS - 1)
    {
      gameObjects[heroRow][heroColumn] = 0;
      heroRow++;
      gameObjects[heroRow][heroColumn] = HERO;
      console.log("moving down");
    }
    break;

    case LEFT:
    if(heroColumn > 0)
    {
      gameObjects[heroRow][heroColumn] = 0;
      heroColumn--;
      gameObjects[heroRow][heroColumn] = HERO;
      console.log("moving left");
    }
    break;

    case RIGHT:
    if(heroColumn < COLUMNS - 1)
    {
      gameObjects[heroRow][heroColumn] = 0;
      heroColumn++;
      gameObjects[heroRow][heroColumn] = HERO;
      console.log("moving right");
    }
    break;

    case SPACEBAR:
    {
      console.log("A Bomb has been planted.");
      placeBomb();
    }
    break;

  }
}
//Finding out where the main hero is.   (It's off for now. will uncomment it later.)

//find out what kind of cell the hero is on
switch(map[heroRow][heroColumn])
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
  // }

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
      switch(gameObjects[row][column])
      {
        case HERO:
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

///Making the bomb.
bombobject = {} //That is all it takes to make an object.
// bombobject.blowtime = delay
// bombobject.position = mapobject
// mapobject.bomb = bombobject

function placeBomb(){

    // if(placebomb && hero.bombs != 0)
    {
        // map[heroRow][heroColumn].object = 2;
        var bombRow = [heroRow];
        var bombColumn = [heroColumn];
        // placebomb = false;
        // player.bombs--;
        // setTimeout(explode, 3000);
        console.log("Bomb has exploded")
    }
    // function explode(){
    //     alert('BOOM!');
    //     delete map[bombY][bombX].object;
    //     player.bombs++;
    // }
}
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
