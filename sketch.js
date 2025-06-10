let grid  = 20;
let wide = 34 * grid;
let height = wide;

// Colour palette
let colour = {
  W : '#ffffff',
  Y : '#f6e64b',
  R : '#b33025',
  B : '#2d59b5',
  G : '#d8d8d8',
};

// Yellow grid lines
let vLines = [1, 3, 7, 12, 21, 29, 32];
let hLines = [1, 5, 11, 13, 16, 19, 27, 32];

// Blocks
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

  // Draw lines
  fill(colour.Y);
  vLines.forEach(c => rect(c * grid, 0, grid, height));
  hLines.forEach(r => rect(0, r * grid, wide, grid));

  // Draw breathing dots
  breathingDashesOnLines();

  // Draw Blocks
  blocks.forEach(b => {
    fill(b.colour);
    rect(b.col * grid, b.row * grid, b.w * grid, b.h * grid);
  });
}

function breathingDashesOnLines() {
  let accentBase = [colour.R, colour.B, colour.G];
  let scale  = 0.15;
  let speed  = 0.01;
  let threshold = 0.45;
  
  // Vertical lines
  vLines.forEach((c) => {
    for (let r = 0; r < height / grid; r++) {
      let n = noise(c * scale, r * scale, frameCount * speed);
      if (n > threshold) {
        let baseColour = accentBase[(c + r) % accentBase.length];
         /*
        Use lerpColor() to blend two colours to find a third colour between them.
        https://p5js.org/reference/p5/lerpColor/
        */
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
