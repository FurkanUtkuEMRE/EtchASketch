// Color constants.
NOIR = 'active-noir';
MAROON = 'active-maroon';
AQUA = 'active-aqua';

// Document wide logic to only paint when the mouse is hold down.
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

// Selectors and button events.
const container = document.querySelector('.grid-container');
const tinyButton = document.querySelector('.tiny');
const smallButton = document.querySelector('.small');
const mediumButton = document.querySelector('.medium');
const bigButton = document.querySelector('.big');
const noirButton = document.querySelector('.noir');
const maroonButton = document.querySelector('.maroon');
const aquaButton = document.querySelector('.aqua');
const eraserButton = document.querySelector('.eraser');
const clearButton = document.querySelector('.clear');

tinyButton.addEventListener('click', changeGridSize);
smallButton.addEventListener('click', changeGridSize);
mediumButton.addEventListener('click', changeGridSize);
bigButton.addEventListener('click', changeGridSize);
noirButton.addEventListener('click', chooseColor);
maroonButton.addEventListener('click', chooseColor);
aquaButton.addEventListener('click', chooseColor);
eraserButton.addEventListener('click', chooseColor);
clearButton.addEventListener('click', clearGrid);

// Deletes the previous grid and builds a new grid with given size.
function changeGridSize(event) {
  if (event.target.className === 'tiny') {
    deleteGrid();
    makeGrid(8, 8);
  } else if (event.target.className === 'small') {
    deleteGrid();
    makeGrid(16, 16);
  } else if (event.target.className === 'medium') {
    deleteGrid();
    makeGrid(32, 32);
  } else if (event.target.className === 'big') {
    deleteGrid();
    makeGrid(64, 64);
  }
}

// Global variables for colors and eraser.
let noirStatus = true;
let maroonStatus = false;
let aquaStatus = false;
let eraserStatus = false;

// Sets the color which the user chose.
function chooseColor(event) {
  if (event.target.className === 'noir') {
    noirStatus = true;
    maroonStatus = false;
    aquaStatus = false;
    eraserStatus = false;
  } else if (event.target.className === 'maroon') {
    noirStatus = false;
    maroonStatus = true;
    aquaStatus = false;
    eraserStatus = false;
  } else if (event.target.className === 'aqua') {
    noirStatus = false;
    maroonStatus = false;
    aquaStatus = true;
    eraserStatus = false;
  } else if (event.target.className === 'eraser') {
    noirStatus = false;
    maroonStatus = false;
    aquaStatus = false;
    eraserStatus = true;
  }
}

// Clears the grid.
function clearGrid() {
  const gridItems = document.querySelectorAll('.grid-item');

  gridItems.forEach((gridItem) => {
    gridItem.classList.remove(NOIR, MAROON, AQUA);
  });
}

// Creates the grid with rows and columns.
function makeGrid(rows, columns) {
  // Divides the container into rows and columns which were chosen.
  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', columns);

  // Loops over for each row and column.
  for (let i = 0; i < rows * columns; i++) {
    let gridItem = document.createElement('div');
    container.appendChild(gridItem).className = 'grid-item';
  }
  const gridItems = document.querySelectorAll('.grid-item');

  // Checks if the cursor is on top of a grid.
  gridItems.forEach((gridItem) => {
    gridItem.addEventListener('mouseover', paintGridItem);
  });

  // Checks if the grid is clicked.
  gridItems.forEach((gridItem) => {
    gridItem.addEventListener('mousedown', paintGridItem);
  });
}

// Creates the grid with rows and columns.
function deleteGrid() {
  while (container.firstChild) {
    const gridItems = document.querySelectorAll('.grid-item');

    gridItems.forEach((gridItem) => {
      container.removeChild(gridItem);
    });
  }
}

// Helper functions to add or remove classes.
function removeClass(event, className) {
  event.target.classList.remove(className);
}

function addClass(event, className) {
  event.target.classList.add(className);
}

// If a cursor is on top of a grid while the mouse is hold down, paint. Else return.
// Add or remove classes depending on the color which the user chose.
function paintGridItem(event) {
  if (event.type === 'mouseover' && !mouseDown) {
    return;
  } else if (eraserStatus) {
    removeClass(event, NOIR);
    removeClass(event, MAROON);
    removeClass(event, AQUA);
  } else if (noirStatus) {
    removeClass(event, MAROON);
    removeClass(event, AQUA);
    addClass(event, NOIR);
  } else if (maroonStatus) {
    removeClass(event, NOIR);
    removeClass(event, AQUA);
    addClass(event, MAROON);
  } else if (aquaStatus) {
    removeClass(event, NOIR);
    removeClass(event, MAROON);
    addClass(event, AQUA);
  }
}

// Build default grid.
makeGrid(32, 32);
