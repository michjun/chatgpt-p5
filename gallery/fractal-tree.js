let angle;
let scaleFactor = 0.6;
let colorSpeed = 0.01;
let animationSpeed = 0.02;
let maxDepth = 6;

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
}

function draw() {
  background(0);
  translate(width / 2, height);
  let hue = (millis() * colorSpeed) % 255;
  colorMode(HSL);
  angle = map(sin(millis() * animationSpeed), -1, 1, 20, 50);
  let initialLength = map(sin(millis() * animationSpeed * 0.5), -1, 1, 200, 300);
  let maxDepth = floor(map(sin(millis() * animationSpeed * 0.1), -1, 1, 4, 10));
  drawBranch(initialLength, maxDepth, hue);
}

function drawBranch(len, depth, hue) {
  if (depth === 0) return;

  strokeWeight(depth);
  stroke(hue, 255, depth * 255 / maxDepth);
  line(0, 0, 0, -len);
  push();
  translate(0, -len);
  rotate(angle);
  drawBranch(len * scaleFactor, depth - 1, (hue + 10) % 255);
  rotate(-2 * angle);
  drawBranch(len * scaleFactor, depth - 1, (hue + 20) % 255);
  pop();
}
