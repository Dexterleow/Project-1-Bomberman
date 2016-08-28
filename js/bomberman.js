console.log('Javascript,are you there?')

// mapLevel1
var mapLevel1 = [
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
var enemyBot1 = 3;
var enemyBot2 = 4;



// The size of each tile
var SIZE = 64;

//The number of rows and columns in the mapLevel1
var ROWS = mapLevel1.length;
var COLUMNS = mapLevel1[0].length;
