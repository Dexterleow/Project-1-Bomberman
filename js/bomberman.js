
//Get a reference to the stage and output
var stage = document.querySelector("#stage");
var output = document.querySelector("#output");

//Add a keyboard listener
window.addEventListener("keydown", keydownHandler, false);
window.setInterval(render, 500);

//The game map
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
];

//The game objects map
var gameObjects = [
  [5,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,4,0],
  [0,0,0,0,6,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,7,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
];
// change 0 to softWall and hardwall for the object to stop bumping into it.

var bombArray = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
];

//Map code
var STANDARDTILE = 0;
var SOFTWALL = 1; //softWall
var HARDWALL = 2; //hardWall
var HOME = 3;
var MONSTER = 4;
var HERO = 5; //Player Character
var MONSTER_TWO = 6;
var MONSTER_THREE = 7;
var MONSTER_FOUR = 8;
var MONSTER_FIVE = 9;
var STANDARDTILE2 = 10;
var BOMB = 11;
var Fire = 12;

//The size of each cell
var SIZE = 64;

//The number of rows and columns
var ROWS = map.length;
var COLUMNS = map[0].length;

//Find the hero's and monster's start positions
var heroRow;
var heroColumn;
var monsterRow;
var monsterColumn;
var monsterRow_Two;
var monsterColumn_Two;
var monsterRow_Three;
var monsterColumn_Three;
var bombRow
var bombColumn
// var monsterRow_Four;
// var monsterColumn_Four;
// var monsterRow_Five;
// var monsterColumn_Five;

for(var row = 0; row < ROWS; row++)
{
  for(var column = 0; column < COLUMNS; column++)
  {
    if(gameObjects[row][column] === HERO)
    {
      heroRow = row;
      heroColumn = column;
    }
    if(gameObjects[row][column] === MONSTER)
    {
      monsterRow = row;
      monsterColumn = column;
    }
    if (gameObjects[row][column] === MONSTER_TWO)
    {
      monsterRow_Two = row;
      monsterColumn_Two = column;
    }
    if (gameObjects[row][column] === MONSTER_THREE)
    {
      monsterRow_Three = row;
      monsterColumn_Three = column;
    }
  }
}


//Arrow key codes
var UP = 38; //Keycode for up
var DOWN = 40; //Keycode for down
var RIGHT = 39; //Keycode for right
var LEFT = 37; //Keycode for left
var SPACEBAR = 32; //Keycode for Spacebar

render();

function keydownHandler(event) {
  event.preventDefault()
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
      // gameObjects[heroRow][heroColumn] = HERO;

      //If the new position is not zero. Do not allow the move
      if (map[heroRow][heroColumn] > 0) //Compare tiles
      {
        heroRow++;
      };
      gameObjects[heroRow][heroColumn] = HERO;
    }
    break;

    case DOWN:
    if(heroRow < ROWS - 1)
    {
      gameObjects[heroRow][heroColumn] = 0;
      heroRow++;

      if (map[heroRow][heroColumn] > 0)
      {
        heroRow--;
      };

      gameObjects[heroRow][heroColumn] = HERO;
    }
    break;

    case LEFT:
    if(heroColumn > 0)
    {
      gameObjects[heroRow][heroColumn] = 0;
      heroColumn--;

      if (map[heroRow][heroColumn] > 0)
      {
        heroColumn++;
      };

      gameObjects[heroRow][heroColumn] = HERO;
    }
    break;

    case RIGHT:
    if(heroColumn < COLUMNS - 1)
    {
      gameObjects[heroRow][heroColumn] = 0;
      heroColumn++;

      if (map[heroRow][heroColumn] > 0)
      {
        heroColumn--;
      };


      gameObjects[heroRow][heroColumn] = HERO;
    }
    break;

    case SPACEBAR:
    {
      console.log("A Bomb has been planted.");
      placeBomb();
    }
    break;
  }

  //find out what kind of cell the hero is on
  switch(map[heroRow][heroColumn])
  {
    case STANDARDTILE:
    gameMessage = "You sail the open seas."
    break;

    case HARDWALL:
    // fight();
    break;

    case SOFTWALL:
    // trade();
    break;

    case HOME:
    // endGame();
    break;
  }

  //Move the monster.no1
  moveMonster();
  //Move the monster.no2
  moveMonster_Two();
  //Move the monster.no3
  moveMonster_Three();
  // //Move the monster.no4
  // moveMonster_Four();
  // //Move the monster.no5
  // moveMonster_Five();

  //Find out if the hero is touching the monster
  if(gameObjects[heroRow][heroColumn] === MONSTER)
  {
    endGame();
  }

  //Render the game
  render();
}

//Bomb
var bombPack = 10
// number of bombs
function placeBomb(){
  // if(placebomb && player.bombs != 0)
  //     map[heroColumn][heroRow].object = 2;
  {
    var bombRow1 = heroRow;
    var bombColumn1 = heroColumn;

    bombArray[bombRow1][bombColumn1] = 11;
    //placebomb = false;
    bombPack--;

    // var myImage = new Image(56, 56);
    // myImage.src = "/Users/dexterleow/Desktop/Project-1-Bomberman/img/Games-Artwork/Smoothie_Smash_Bomb.gif";
    // console.log(myImage);
    // var stage = document.getElementById('stage')
    // var player = document.getElementById('player')

    //the next two lines needs further debugging
    // player.appendChild(myImage)
    // stage.appendChild(player)
    //
    //
    // stage.appendChild(myImage)
    // <img src="/Users/dexterleow/Desktop/Project-1-Bomberman/img/Games-Artwork/Smoothie_Smash_Bomb.gif" alt="bombExploding" style="width:48px;height:48px;">

    //console.log(bombRow1,bombColumn1)
    setTimeout(function() {
      explode(bombRow1,bombColumn1);
    }, 2000);
    console.log("Bomb has been triggered");


  }
  function explode(bombRow1, bombColumn1){
    //alert('BOOM!');
    bombArray[bombRow1][bombColumn1] = 0;
    console.log("Row: ", bombRow, "Col: ", bombColumn);
    // if (map[bombRow][++bombColumn] = '0' || map[bombRow][++bombColumn]) = '1') {

    //Right
    if ((map[bombRow1][bombColumn1 + 1] < 2) && (bombColumn1 <= COLUMNS)) {
      map[bombRow1][bombColumn1 + 1] = 0;
    }

    //Useless, player cannot move to non-movable tiles
    if (map[bombRow1][bombColumn1] < 2) {
    map[bombRow1][bombColumn1] = 0; // bombed the original bomb spot
    }

    //Below
    if ((map[bombRow1 + 1][bombColumn1]  < 2) && (bombRow1 <= ROWS)) {
    map[bombRow1 + 1][bombColumn1] = 0; //bombed one tile below
    }

    //Left
    if ((map[bombRow1][bombColumn1 - 1] < 2) && (bombColumn1 >= 0)) {
    map[bombRow1][bombColumn1 - 1] = 0;
    }                                  //bombed the left tile

    //Above
    if ((map[bombRow1 - 1][bombColumn1] < 2) &&  (bombRow1 >= 0)) {
    map[bombRow1 - 1][bombColumn1] = 0 ; //bombed the above tile
    }

    console.log(map);


    bombPack++;
  }
  console.log("Change the softWall into standardTile")
}

function moveMonster() //Movement for monster.no1
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
  //that surround the monster. If the cells contain STANDARDTILE,
  //push the corresponding direction into the validDirections array
  if(monsterRow > 0)
  {
    var thingAbove = map[monsterRow - 1][monsterColumn];
    if(thingAbove === 0)
    {
      validDirections.push(UP);
    }
  }
  if(monsterRow < ROWS - 1)
  {
    var thingBelow = map[monsterRow + 1][monsterColumn];
    if(thingBelow === 0)
    {
      validDirections.push(DOWN);
    }
  }
  if(monsterColumn > 0)
  {
    var thingToTheLeft = map[monsterRow][monsterColumn - 1];
    if(thingToTheLeft === 0)
    {
      validDirections.push(LEFT);
    }
  }
  if(monsterColumn < COLUMNS - 1)
  {
    var thingToTheRight = map[monsterRow][monsterColumn + 1];
    if(thingToTheRight === 0)
    {
      validDirections.push(RIGHT);
    }
  }

  //The validDirections array now contains 0 to 4 directions that the
  //contain STANDARDTILE cells. Which of those directions will the monster
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
    gameObjects[monsterRow][monsterColumn] = 0;
    //Subtract 1 from the monster's row
    monsterRow--;
    //Apply the monster's new updated position to the array
    gameObjects[monsterRow][monsterColumn] = MONSTER;
    break;

    case DOWN:
    gameObjects[monsterRow][monsterColumn] = 0;
    monsterRow++;
    gameObjects[monsterRow][monsterColumn] = MONSTER;
    break;

    case LEFT:
    gameObjects[monsterRow][monsterColumn] = 0;
    monsterColumn--;
    gameObjects[monsterRow][monsterColumn] = MONSTER;
    break;

    case RIGHT:
    gameObjects[monsterRow][monsterColumn] = 0;
    monsterColumn++;
    gameObjects[monsterRow][monsterColumn] = MONSTER;
    console.log("monster_one moving out");
  }
}


function moveMonster_Two() //Movement for monster.no2
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
  //that surround the monster. If the cells contain STANDARDTILE,
  //push the corresponding direction into the validDirections array
  if(monsterRow_Two > 0)
  {
    var thingAbove = map[monsterRow_Two - 1][monsterColumn_Two];
    if(thingAbove === 0); // change this from standardtile to 0 or 1
    {
      validDirections.push(UP);
    }
  }
  if(monsterRow_Two < ROWS - 1)
  {
    var thingBelow = map[monsterRow_Two + 1][monsterColumn_Two];
    if(thingBelow === 0) // change this from standardtile to 0 or 1
    {
      validDirections.push(DOWN);
    }
  }
  if(monsterColumn_Two > 0)
  {
    var thingToTheLeft = map[monsterRow_Two][monsterColumn_Two - 1];
    if(thingToTheLeft === 0) // change this from standardtile to 0 or 1
    {
      validDirections.push(LEFT);
    }
  }
  if(monsterColumn_Two < COLUMNS - 1)
  {
    var thingToTheRight = map[monsterRow_Two][monsterColumn_Two + 1];
    if(thingToTheRight === 0) // change this from standardtile to 0 or 1
    {
      validDirections.push(RIGHT);
    }
  }

  //The validDirections array now contains 0 to 4 directions that the
  //contain STANDARDTILE cells. Which of those directions will the monster
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
    gameObjects[monsterRow_Two][monsterColumn_Two] = 0;
    //Subtract 1 from the monster's row
    monsterRow_Two--;
    //Apply the monster's new updated position to the array
    gameObjects[monsterRow_Two][monsterColumn_Two] = MONSTER_TWO;
    break;

    case DOWN:
    gameObjects[monsterRow_Two][monsterColumn_Two] = 0;
    monsterRow_Two++;
    gameObjects[monsterRow_Two][monsterColumn_Two] = MONSTER_TWO;
    break;

    case LEFT:
    gameObjects[monsterRow_Two][monsterColumn_Two] = 0;
    monsterColumn_Two--;
    gameObjects[monsterRow_Two][monsterColumn_Two] = MONSTER_TWO;
    break;

    case RIGHT:
    gameObjects[monsterRow_Two][monsterColumn_Two] = 0;
    monsterColumn_Two++;
    gameObjects[monsterRow_Two][monsterColumn_Two] = MONSTER_TWO;
    console.log("monster_two moving out");
  }
}

function moveMonster_Three() //Movement for monster.no3
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
  //that surround the monster. If the cells contain STANDARDTILE,
  //push the corresponding direction into the validDirections array
  if(monsterRow_Three > 0)
  {
    var thingAbove = map[monsterRow_Three - 1][monsterColumn_Three];
    if(thingAbove === 0);
    {
      validDirections.push(UP);
    }
  }
  if(monsterRow_Three < ROWS - 1)
  {
    var thingBelow = map[monsterRow_Three + 1][monsterColumn_Three];
    if(thingBelow === 0)
    {
      validDirections.push(DOWN);
    }
  }
  if(monsterColumn_Three > 0)
  {
    var thingToTheLeft = map[monsterRow_Three][monsterColumn_Three - 1];
    if(thingToTheLeft === 0)
    {
      validDirections.push(LEFT);
    }
  }
  if(monsterColumn_Three < COLUMNS - 1)
  {
    var thingToTheRight = map[monsterRow_Three][monsterColumn_Three + 1];
    if(thingToTheRight === 0)
    {
      validDirections.push(RIGHT);
    }
  }

  //The validDirections array now contains 0 to 4 directions that the
  //contain STANDARDTILE cells. Which of those directions will the monster
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
    gameObjects[monsterRow_Three][monsterColumn_Three] = 0;
    //Subtract 1 from the monster's row
    monsterRow_Three--;
    //Apply the monster's new updated position to the array
    gameObjects[monsterRow_Three][monsterColumn_Three] = MONSTER_THREE;
    break;

    case DOWN:
    gameObjects[monsterRow_Three][monsterColumn_Three] = 0;
    monsterRow_Three++;
    gameObjects[monsterRow_Three][monsterColumn_Three] = MONSTER_THREE;
    break;

    case LEFT:
    gameObjects[monsterRow_Three][monsterColumn_Three] = 0;
    monsterColumn_Three--;
    gameObjects[monsterRow_Three][monsterColumn_Three] = MONSTER_THREE;
    break;

    case RIGHT:
    gameObjects[monsterRow_Three][monsterColumn_Three] = 0;
    monsterColumn_Three++;
    gameObjects[monsterRow_Three][monsterColumn_Three] = MONSTER_THREE;
    console.log("monster_three moving out");
  }
}

function endGame()
{
  // if(map[heroRow][heroColumn] === HOME)
  // {
  //   //Calculate the score
  //   var score = food + gold + experience;
  //
  //   //Display the game message
  //   gameMessage
  //     = "You made it home ALIVE! " + "Final Score: " + score;
  // }
  // else if(gameObjects[heroRow][heroColumn] === MONSTER)
  // {
  //   gameMessage
  //     = "Your hero has been swallowed by a monster!";
  // }
  // else
  // {
  //   console.log(:)
  // }

  //Remove the keyboard listener to end the game
  window.removeEventListener("keydown", keydownHandler, false);
}

function render()
{
  //Clear the stage of img cells
  //from the previous turn

  if(stage.hasChildNodes())
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
        case STANDARDTILE:
        cell.src = "/Users/dexterleow/Desktop/Project-1-Bomberman/img/Games-Artwork/standardTile.png";
        break;

        case SOFTWALL:
        cell.src = "/Users/dexterleow/Desktop/Project-1-Bomberman/img/Games-Artwork/softWall.png";
        break;

        case HARDWALL:
        cell.src = "/Users/dexterleow/Desktop/Project-1-Bomberman/img/Games-Artwork/hardWall.png";
        break;

        // case HOME:
        //   cell.src = "../images/home.png";
        //   break;
      }

      switch(bombArray[row][column])
      {
        case BOMB:
        cell.src ="/Users/dexterleow/Desktop/Project-1-Bomberman/img/Games-Artwork/Smoothie_Smash_Bomb.gif";

        break;
        // case HOME:
        //   cell.src = "../images/home.png";
        //   break;
      }
      //Add the hero and monster from the gameObjects array
      switch(gameObjects[row][column])
      {

        case STANDARDTILE2:
        cell.src = "/Users/dexterleow/Desktop/Project-1-Bomberman/img/Games-Artwork/standardTile.png";
        break;

        case HERO:
        cell.src ="/Users/dexterleow/Desktop/Project-1-Bomberman/img/Games-Artwork/mainHero_front_view.png"

        // var parent = document.getElementById('stage')
        // var wrapper = document.createElement('div')
        // wrapper.setAttribute('id', 'player')
        //
        // parent.replaceChild(wrapper, cell)
        // wrapper.appendChild(cell)

        break;

        case MONSTER:
        cell.src = "/Users/dexterleow/Desktop/Project-1-Bomberman/img/Games-Artwork/botSpider.png";
        break;

        case MONSTER_TWO:
        cell.src = "/Users/dexterleow/Desktop/Project-1-Bomberman/img/Games-Artwork/botSpider.png";
        break;

        case MONSTER_THREE:
        cell.src = "/Users/dexterleow/Desktop/Project-1-Bomberman/img/Games-Artwork/botSpider.png";
        break;

        // case MONSTER_FOUR:
        // cell.src = "/Users/dexterleow/Desktop/Project-1-Bomberman/img/Games-Artwork/botSpider.png";
        // break;
        //
        // case MONSTER_FIVE:
        // cell.src = "/Users/dexterleow/Desktop/Project-1-Bomberman/img/Games-Artwork/botSpider.png";
        // break;
      }

      //Position the cell
      cell.style.top = row * SIZE + "px";
      cell.style.left = column * SIZE + "px";
    }
  }

  //Display the game message
  // output.innerHTML = gameMessage;
  //
  // //Display the player's food, gold, and experience
  // output.innerHTML
  //   += "<br>Gold: " + gold + ", Food: "
  //   + food + ", Experience: " + experience;
}

//collision detection.
