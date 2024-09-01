let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

// in p5.js, the function runs on page load:
function setup() {
  createCanvas(canvasWidth, canvasHeight);

  // invoke any drawing functions inside of setup.
  // functions should all go between "createCanvas()" and "drawGrid()"
  draw5Circles();
  draw5RedSquares();
  draw5CirclesWhile();
  draw5CirclesFor();
  drawNCircles(30);
  drawNCirclesFlexible(10, 20, 200, 200);

  drawNShapesFlexible(30, 25, 1000, 200, "circle");
  drawNShapesFlexible(30, 25, 1200, 200, "notcircle");

  drawNShapesDirectionFlexible(5, 25, 100, 200, "notcircle", "row");

  drawGrid(canvasWidth, canvasHeight);
}

function draw5CirclesWhile() {
  let y = 200;
  noFill();
  while (y <= 400) {
    circle(500, y, 50);
    y += 50;
  }
}

function draw5CirclesFor() {
  noFill();
  for (let y = 200; y <= 400; y += 50) {
    circle(700, y, 50);
  }
}

function drawNCircles(n) {
  let y = 200;
  let end = 150 + 50 * n;
  noFill();
  while (y <= end) {
    circle(900, y, 50);
    y += 50;
  }
}
function drawNCirclesFlexible(n, size, x, y) {
  let end = y - size + size * n;
  noFill();
  while (y <= end) {
    circle(x, y, size);
    y += size;
  }
}

function drawNShapesFlexible(n, size, x, y, shape) {
  let isCircle = shape === "circle";
  let end = y - size + size * n;
  noFill();
  while (y <= end) {
    if (isCircle) {
      circle(x, y, size);
    } else {
      square(x - size / 2, y - size / 2, size);
    }
    y += size;
  }
}

function drawNShapesDirectionFlexible(n, size, x, y, shape, direction) {
  let isCircle = shape === "circle";
  let isRow = direction === "row";
  let end;
  if (isRow === true) {
    end = x - size + size * n;
  } else {
    end = y - size + size * n;
  }

  noFill();
  while ((!isRow && y <= end) || (isRow && x <= end)) {
    if (isCircle === true) {
      circle(x, y, size);
    } else {
      square(x - size / 2, y - size / 2, size);
    }
    if (isRow === true) {
      x += size;
    } else {
      y += size;
    }
  }
}

// my first function
function draw5Circles() {
  noFill();
  // fill('red');
  circle(100, 200, 50); // centerX, centerY, radius
  circle(100, 250, 50);
  circle(100, 300, 50);
  circle(100, 350, 50);
  circle(100, 400, 50);
}

function draw5RedSquares() {
  fill("red");
  square(320, 200, 50); // topLeftX, topLeftY, width
  square(320, 250, 50);
  square(320, 300, 50);
  square(320, 350, 50);
  square(320, 400, 50);
}
