let fractals = [];

function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 360, 100, 100, 100);

  // Create an array of Fractal objects
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      let x = (i * width) / 2;
      let y = (j * width) / 2;
      let size = width / 2;
      // Speed is useless
      let speed = random(0.001, 0.01);
      // These random colors are useless
      let hue = random(360);
      let saturation = random(50, 100);
      let brightness = random(50, 100);
      fractals.push(
        new Fractal(x, y, size, speed, hue, saturation, brightness)
      );
    }
  }
}

function draw() {
  background(0);

  // Draw and update each Fractal object in the array
  for (let i = 0; i < fractals.length; i++) {
    fractals[i].display();
    fractals[i].update();
  }
}

class Fractal {
  constructor(x, y, size, speed, hue, saturation, brightness) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.hue = hue;
    this.saturation = saturation;
    this.brightness = brightness;
    this.level = 0;
  }

  display() {
    // Set the color using the hue, saturation, and brightness values
    strokeWeight(3);
    stroke(this.hue, this.saturation, this.brightness, 250);
    fill(0, 0.7);

    // Draw the fractal shape using the recursive fractal function
    this.fractal(this.x, this.y, this.size, this.level);

    // Increment the level of recursion
    this.level++;
    if (this.level > 6) {
      this.level = random(0, 4);
    }
  }

  update() {
    // Change the color values using sine and cosine waves
    this.hue = (sin(frameCount * 0.01) + 1) * 180;
    this.saturation = (cos(frameCount * 0.01) + 1) * 40 + 60;
    this.brightness = (sin(frameCount * 0.005) + 1) * 40 + 60;
  }

  fractal(x, y, size, level) {
    // Draw a circle at the current position
    ellipse(x + size / 2, y + size / 2, size, size);

    // Recursive exit condition
    if (level < 1) {
      return;
    }

    // Call the fractal function four times with different positions and sizes
    this.fractal(x, y, size / 2, level - 1);
    this.fractal(x + size / 2, y, size / 2, level - 1);
    this.fractal(x, y + size / 2, size / 2, level - 1);
    this.fractal(x + size / 2, y + size / 2, size / 2, level - 1);
  }
}
