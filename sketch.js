// Canvas and grid set up
let grid  = 20;
let wide = 34 * grid;
let height = wide;

// Colour palette
let colour = {
  // White
  W : '#ffffff',
  // Yellow
  Y : '#f6e64b',
  // Red
  R : '#b33025',
  // Blue
  B : '#2d59b5',
  // Grey
  G : '#d8d8d8',
};

// Indices of vertical and horizontal yellow grid lines
let vLines = [1, 3, 7, 12, 21, 29, 32];
let hLines = [1, 5, 11, 13, 16, 19, 27, 32];

// Big blocks
let blocks = [
  {col: 1, row:  4, w: 1, h: 1, colour: colour.G},
  {col: 1, row: 10, w: 3, h: 3, colour: colour.R},
  {col: 1, row: 26, w: 3, h: 3, colour: colour.R},
  {col: 5, row: 22, w: 1, h: 1, colour: colour.G},
  
  {col: 9, row:  1, w: 1, h: 1, colour: colour.G},
  {col: 10, row:  4, w: 1, h: 1, colour: colour.R},
  {col: 11, row:  7, w: 3, h: 6, colour: colour.B},
  {col: 11, row:  9, w: 1, h: 2, colour: colour.R},
  {col: 11, row: 15, w: 1, h: 1, colour: colour.G},
  
  {col: 11, row: 22, w: 3, h: 3, colour: colour.R},
  {col: 11, row: 28, w: 1, h: 1, colour: colour.G},
  {col: 15, row: 28, w: 1, h: 1, colour: colour.B},
];

function setup() {
  createCanvas(wide, height);
  noStroke();
}

function draw() {
  background(colour.W);

  // Draw vertical and horizontal yellow grid lines
  fill(colour.Y);
  vLines.forEach(c => rect(c * grid, 0, grid, height));
  hLines.forEach(r => rect(0, r * grid, wide, grid));

  // Draw animate breathing dots on lines
  breathingDashesOnLines();

  // Draw animate big blocks
  barsInsideBlocks();
}

function breathingDashesOnLines() {
  // Three base colours
  let accentBase = [colour.R, colour.B, colour.G];
  let scale  = 0.15;
  let speed  = 0.015;
  let threshold = 0.55;
  
  // Vertical lines
  vLines.forEach((c) => {
    for (let r = 0; r < height / grid; r++) {
      let n = noise(c * scale, r * scale, frameCount * speed);
      if (n > threshold) {
        // The base colours are fixed in rows and columns
        let baseColour = accentBase[(c + r) % accentBase.length];
         /*
        Use lerpColor() to blend two colours to find a third colour between them.
        https://p5js.org/reference/p5/lerpColor/
        */
        // Transition between white and base colour to simulate the on and off
        let glow = lerpColor(color(colour.W), color(baseColour), n);
        fill(glow);
        rect(c * grid, r * grid, grid, grid);
      }
    }
  });
  
  // Horizontal lines
  hLines.forEach((r) => {
    for (let c = 0; c < wide / grid; c++) {
      let n = noise(c * scale, r * scale, frameCount * speed + 50);
      if (n > threshold) {
        let baseColour = accentBase[(c + r) % accentBase.length];
        let glow = lerpColor(color(colour.W), color(baseColour), n);
        fill(glow);
        rect(c * grid, r * grid, grid, grid);
      }
    }
  });
  /*
  Referencing MDN, I using JavaScript’s array.forEach() to loop 
  through the grid-index arrays because it performs the same 
  iteration as a classic for loop but is cleaner and more readable.
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
  */
}

function barsInsideBlocks(){
  // Width of each vertical bar
  let barWidth = 3;
  // Probability
  let density = 0.3;
  let speed = 0.4;

  blocks.forEach((b, i) => {
    // Draw semi-transparent base rectangle
    let baseColour = color(b.colour);
    /*
    Use setAlpha() to set the transparency of a colour
    https://p5js.org/reference/p5.Color/setAlpha/
    */
    baseColour.setAlpha(170);
    fill(baseColour);
    rect(b.col * grid, b.row * grid, b.w * grid, b.h * grid);

    // Draw vertical bars that flicker via Perlin noise
    for (let x = 0; x < b.w * grid; x += barWidth) {
      let n = noise((x + i * 100) * 0.05, frameCount * speed);
      // Decide whether to light bar
      if (n > 1 - density) {
        fill(b.colour);
        rect(b.col * grid + x, b.row * grid, barWidth, b.h * grid);
      }
    }
  });
}
