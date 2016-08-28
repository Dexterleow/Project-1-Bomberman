console.log('Javascript,are you there?')

// mapLevel1
var map = [
  [0,0,0,1,1,0,0,0,1,0,0,0,0],
  [0,2,1,2,0,2,0,2,0,2,0,2,0],
  [0,0,1,0,1,0,1,2,1,0,0,0,0],
  [0,2,0,2,1,2,0,2,1,2,1,2,1],
  [0,0,0,0,1,1,1,1,2,0,0,0,0],
  [0,2,0,2,3,2,2,2,0,2,0,2,1],
  [3,2,0,0,0,0,4,1,1,0,0,0,0],
  [0,2,1,2,0,2,1,2,0,2,0,2,0],
  [1,1,2,0,3,0,1,1,0,1,1,0,0],
  [0,2,0,2,0,2,0,2,1,2,0,2,1],
  [1,0,0,0,1,1,1,0,2,0,1,0,4],
];

//Map Code
var standardTile = 0;
var softWall = 1;
var hardWall = 2;
var botGhost = 3;
var botSpider = 4;
var bomb = 5;

//Selecting the stage and output
var stage = document.querySelector("#stage");
var output = document.querySelector("#output");


// The size of each tile
var SIZE = 64;

//The number of rows and columns in the mapLevel1
var ROWS = map.length;
var COLUMNS = map[0].length;

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

      //Position the cell
      cell.style.top = row * SIZE + "px";
      cell.style.left = column * SIZE + "px";
    }

  }

}
