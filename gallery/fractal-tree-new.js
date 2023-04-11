let angle;
let colorSpeed = 0.01;
let animationSpeed = 0.02;

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
}

function draw() {
  background(0);
  translate(width / 2, height);
  let hue = (millis() * colorSpeed) % 255;
  colorMode(HSL);
  angle = map(sin(millis() * animationSpeed), -1, 1, 15, 35);
  let initialLength = map(sin(millis() * animationSpeed * 0.5), -1, 1, 200, 280);
  let maxDepth = floor(map(sin(millis() * animationSpeed * 0.1), -1, 1, 6, 12));
  drawBranch(initialLength, maxDepth, maxDepth, hue);
}

function drawBranch(len, depth, maxDepth, hue) {
  if (depth === 0) return;

  strokeWeight(depth);
  stroke(hue, 255, depth * 255 / maxDepth);
  line(0, 0, 0, -len);
  push();
  translate(0, -len);
  rotate(angle);
  let scale = (maxDepth - depth) < 4 ? 0.6 : (depth < 4 ? random(0.6, 0.8) : 1);
  drawBranch(len * scale, depth - 1, maxDepth, (hue + 10) % 255);
  rotate(-2 * angle);
  drawBranch(len * scale, depth - 1, maxDepth, (hue + 20) % 255);
  pop();
}
