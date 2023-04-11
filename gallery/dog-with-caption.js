let angle = 0;
let tailAngle = 0;
let tailWagSpeed = 0;
let tailWagAcceleration = 0.01;
let font;
let dogWords = "";

function preload() {
  font = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Bold.otf');
}

function setup() {
  createCanvas(800, 800, WEBGL);
  angle = PI;
}

function draw() {
  background(0);
  ambientLight(200);
  pointLight(255, 255, 255, 0, 0, 200);

  let furColor = color(map(sin(frameCount * 0.05), -1, 1, 100, 255), 
                       map(cos(frameCount * 0.03 + 1), -1, 1, 50, 210), 
                       map(sin(frameCount * 0.03 + 1), -1, 1, 80, 230));

  push();
  rotateY(angle);
  translate(0, 100);
  noStroke();
  fill(furColor);

  // Dog's body
  box(100, 50, 200);

  // Dog's legs
  push();
  translate(-40, 50, -80);
  box(30, 100, 30);
  translate(0, 0, 160);
  box(30, 100, 30);
  pop();

  push();
  translate(40, 50, -80);
  box(30, 100, 30);
  translate(0, 0, 160);
  box(30, 100, 30);
  pop();

  // Dog's head
  translate(0, -60, -90);
  box(80, 80, 80);

  // Dog's ears
  push();
  translate(-30, -60, 0);
  box(20, 40, 20);
  translate(60, 0, 0);
  box(20, 40, 20);
  pop();

  // Dog's snout
  translate(0, 0, -50);
  box(40, 40, 50);

  // Dog's tail
  push();
  const zangle = sin(frameCount * tailWagSpeed) * PI / 8;
  translate(zangle * 50 * cos(zangle), 10, 270);
  rotateX(-PI / 4);
  rotateZ(zangle);
  box(20, 100, 20);
  pop();

  // Draw the text directly on the 3D canvas
  push();
  rotateY(PI);
  translate(0, 0, -100);
  textFont(font);
  textAlign(CENTER, CENTER);
  textSize(24);
  if (frameCount % 40 < 30) {
    if (dogWords.startsWith("I love you")) {
      fill(furColor);
    } else {
      fill(255);
    }
    text(dogWords, 0, -160);
  }
  pop();

  pop();

  angle = map(mouseX, 0, width, 0, TWO_PI + PI / 8) + PI;

  // Update tail wag speed
  if (mouseIsPressed) {
    tailWagSpeed += tailWagAcceleration;
    tailWagSpeed = constrain(tailWagSpeed, 0.1, 2.0);
    let numExclamations = Math.floor(map(tailWagSpeed * 10, 0, 20, 0, 40));
    let exclamationString = "!".repeat(numExclamations);
    dogWords = "I love you" + exclamationString;
  } else {
    tailWagSpeed *= 0.99;
    if (tailWagSpeed < 0.001) {
      dogWords = "Click to get me excited!";
    }
  }
}
