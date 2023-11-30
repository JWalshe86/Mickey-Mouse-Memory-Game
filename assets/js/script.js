const tilesContainer = $('.tiles');
const colors = ['aqua', 'aquamarine', 'crimson', 'blue', 'dodgerblue', 'gold', 'greenyellow', 'teal'];
const colorsPicklist = [...colors, ...colors]; // spread operator: places the individual array elements into an array 
const tileCount = colorsPicklist.length;

// Game State

function buildTile(color) {
    const element = $('<div />').addClass('tile').attr('data-color', color);
    return element;
}

let revealedCount = 0;  //game starts with 0 tiles revealed
let activeTile = null;  //the tile the user has just clicked & is now looking for the next tile to match
let awaitingEndOfMove = false; //waiting for tiles to turn back to default

// Build up tiles
for (let i = 0; i < tileCount; i++){
    const randomIndex = Math.floor(Math.random() * colorsPicklist.length); //picks random int between 0-15
    const color = colorsPicklist[randomIndex] // colors assigned a random number

const tile = buildTile(color);

    colorsPicklist.splice(randomIndex, 1); //remove the selected random number, so it can't be selected more than twice
    $(tilesContainer).append(tile); //put tiles into the container
}


$( document ).ready(function() {






});