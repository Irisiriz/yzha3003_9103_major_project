# 1. Project Description
This is the IDEA9103 Major Project individual task. The owner of this repository is **yzha3003**. Our group chose **Piet Mondrian's Broadway Boogie Woogie** as our artwork. Based on this, I used **Perlin noise** as the main animation driver to create smooth, natural, and irregular changes. The goal is to simulate the feeling of city streets at night, with building lights gently changing and LED signs flickering.

# 2. Interaction Instruction
No interaction is required. Simply open the page, and the animation will start automatically. Over time, small squares along the yellow lines gently change in brightness, and vertical bars appear inside coloured big blocks.

# 3. Details of Individual Approach
### - Method
I chose Perlin noise as the main technique to drive my individual animation. It creates smooth and natural variations over time, which I used to simulate the feeling of lights flickering and glowing in a city at night.
### - What Properties I Animated
- **Small squares on yellow lines:** Using Perlin noise, their brightness smoothly transitions between white and base colours (red, blue, grey). This creates a “breathing light” effect, simulating windows lighting up randomly in a nighttime city street.
- **Big coloured blocks:** Inside each block, thin vertical bars are randomly lit based on noise. These simulate flickering LED signs or neon billboards, creating contrast with the soft ambient glow of the smaller squares.
### - How It's Unique
My animation differs from my group members’ approaches:
- **Member A:** Animates elements based on audio input. Blocks change colour and move in sync with the beat of the music.
- **Member B:** Uses keyboard and mouse interaction. Clicking on blocks triggers falling squares in random colours, creating an interactive visual response.
- **Member C:** Animates block positions over time to form patterns
> *Note: Each member may make small adjustments to their intended effects depending on implementation. Please refer to the final outcomes.*
### - Inspiration
- 1. [Broadway Data Boogie Woogie -- Noah Garcia, Ivan Himanen](https://www.dxd2021.com/broadwaydataboogiewoogie)
![An image of Broadway Data Boogie Woogie](readmeImages/broadwayAnimatedSquare.gif)
- 2. [Pixel City -- Draggle](https://www.newgrounds.com/art/view/draggle/pixel-city)
![An image of Pixel City](readmeImages/pixelCity.png)
- 3. [Pixel Night City -- N](https://www.artstation.com/artwork/RnoYnv)
![An image of Pixel Night City](readmeImages/pixelNightCity.jpg)
> These visuals inspired me to use Perlin noise to recreate the random rhythm of light in urban nightscapes.
### - Technical Explanation
The animation in my individual work is driven entirely by Perlin noise over time, using `noise(x, y, t)` to control both brightness and visual randomness.
**1. Breathing small squares on yellow lines** (`breathingDashesOnLines()`):
I use Perlin noise to smoothly vary the brightness of small coloured squares along yellow grid lines.
```
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
```
- `frameCount * speed` acts as the time input for the noise function.
- `lerpColor()` blends from white to a base colour depending on n, creating a breathing effect.
- This creates a smooth transition that mimics how windows in a city light up at night.
**2. LED-style Bars Inside Blocks** (`barsInsideBlocks()`):
In large coloured blocks, I draw random vertical bars that flicker on and off based on Perlin noise.
```
  let n = noise((x + i * 100) * 0.05, frameCount * speed);
  // Decide whether to light bar
  if (n > 1 - density) {
    fill(b.colour);
    rect(b.col * grid + x, b.row * grid, barWidth, b.h * grid);
  }
```
- Here, `n` is recalculated per bar and per frame to simulate randomness.
- Only bars where `n` exceeds the threshold `(1 - density)` are drawn.
The base block colour is drawn first with reduced opacity using `setAlpha(170)`.
```
// Draw semi-transparent base rectangle
let baseColour = color(b.colour);
/*
Use setAlpha() to set the transparency of a colour
https://p5js.org/reference/p5.Color/setAlpha/
*/
baseColour.setAlpha(170);
fill(baseColour);
rect(b.col * grid, b.row * grid, b.w * grid, b.h * grid);
```
- This gives the appearance of softly glowing panels with occasional bright bars, mimicing a flickering LED billboard.
### - Code Adjustments
- Added two new functions:
  - `breathingDashesOnLines()`: animates small squares on grid lines using Perlin noise and colour blending.
  - `barsInsideBlocks()`: adds dynamic vertical bars within large blocks, creating an LED-like flicker effect.
- Removed `noLoop()` from `setup()` to enable continuous drawing and animation using the `draw()` loop.
- Introduced Perlin noise and animation parameters, including `speed`, `scale`, `threshold`, and `density` to control movement and brightness variation.
- Used existing data structures (`vLines`, `hLines`, `blocks`) without modification.
### - Tools & References 
I referred to examples from the **official p5.js documentation** for the use of `lerpColor()` and `setAlpha()`, as well as to the **MDN documentation** for `Array.prototype.forEach()`. The relevant links are already included in the code comments.
How it works and why I used it:
- `lerpColor()`:
    This function blends two colours based on a value between 0 and 1. I used it to smoothly fade small squares between white and a base colour, controlled by Perlin noise. This created a “breathing” light effect that felt more natural than a hard switch between two colours.
- `setAlpha()`:
    This method lets me adjust the transparency of a p5.Color object. I used it to make the large block backgrounds partially transparent, allowing the animated vertical bars to stand out more clearly on top of them.
- `forEach()`:
    Instead of a traditional `for` loop, I used `forEach()` for cleaner iterating through `vLines`, `hLines`, and `blocks`. This made my code easier to read.


