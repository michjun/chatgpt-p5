let angle = 0;
let font;
let dogWords = "";
let currentBreed = 0;
const breeds = ["chihuahua", "bull dog", "wiener dog", "poodle", "mastiff", "grey hound"];

function preload() {
  font = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Bold.otf');
}

function setup() {
  createCanvas(800, 800, WEBGL);
  angle = PI;
}

function keyPressed() {
  if (key === "r" || key === "R") {
    currentBreed = (currentBreed + 1) % breeds.length;
  }
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

  switch (breeds[currentBreed]) {
    case "chihuahua":
      drawChihuahua();
      break;
    case "bull dog":
      drawBullDog();
      break;
    case "wiener dog":
      drawWienerDog();
      break;
    case "poodle":
      drawPoodle();
      break;
    case "mastiff":
      drawMastiff();
      break;
    case "grey hound":
      drawGreyHound();
      break;
  }

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

  angle = map(mouseX, 0, width, - PI / 4, TWO_PI + PI / 4) + PI;
  dogWords = "Hey bro I am Dr. " + breeds[currentBreed];
}

function drawDog(bodySize, legSize, headSize, earSize, snoutSize, tailSize) {
  // Dog's body
  box(bodySize.x, bodySize.y, bodySize.z);

  // Dog's legs
  push();
  translate(-bodySize.x / 2 + legSize.x / 2, bodySize.y / 2, -bodySize.z / 2 + legSize.z / 2);
  box(legSize.x, legSize.y, legSize.z);
  translate(0, 0, bodySize.z - legSize.z);
  box(legSize.x, legSize.y, legSize.z);
  pop();

  push();
  translate(bodySize.x / 2 - legSize.x / 2, bodySize.y / 2, -bodySize.z / 2 + legSize.z / 2);
  box(legSize.x, legSize.y, legSize.z);
  translate(0, 0, bodySize.z - legSize.z);
  box(legSize.x, legSize.y, legSize.z);
  pop();

  // Dog's head
  translate(0, -bodySize.y / 2 - headSize.y / 2, -bodySize.z / 4);
  box(headSize.x, headSize.y, headSize.z);

  // Dog's ears
  push();
  translate(-earSize.x * 1.5, -headSize.y / 2, 0);
  box(earSize.x, earSize.y, earSize.z);
  translate(earSize.x * 3, 0, 0);
  box(earSize.x, earSize.y, earSize.z);
  pop();

  // Dog's snout
  translate(0, 0, -headSize.z / 2 - snoutSize.z / 2);
  box(snoutSize.x, snoutSize.y, snoutSize.z);

  // Dog's tail
  push();
  const zangle = sin(frameCount * 0.1) * PI / 8;
  translate(zangle * tailSize.x * cos(zangle), tailSize.z, bodySize.z);
  //translate(zangle * tailSize.x * cos(zangle), bodySize.y / 2 - tailSize.y / 2, bodySize.z / 2);
  rotateX(-PI / 4);
  rotateZ(zangle);
  box(tailSize.x, tailSize.y, tailSize.z);
  pop();
}

// Too lazy to fix the functions to make them uniform.
// will just let people witness chatGPT code quality.
function drawChihuahua() {
  drawDog(createVector(100, 40, 200), createVector(20, 80, 20), createVector(60, 60, 60), createVector(10, 30, 10), createVector(30, 30, 40), createVector(15, 80, 15));
}

function drawBullDog() {
  drawDog(createVector(100, 60, 200), createVector(30, 100, 30), createVector(80, 80, 80), createVector(20, 40, 20), createVector(40, 40, 50), createVector(15, 60, 15));
}

function drawWienerDog() {
  drawDog(createVector(120, 50, 300), createVector(20, 80, 20), createVector(70, 70, 70), createVector(15, 30, 15), createVector(30, 30, 40), createVector(15, 80, 15));
}

function drawPoodle() {
  drawDog(createVector(100, 60, 200), createVector(20, 100, 20), createVector(80, 80, 80), createVector(30, 40, 30), createVector(40, 40, 50), createVector(20, 100, 20));
}

function drawMastiff(furColor, tailWagSpeed) {
  const bodySize = createVector(120, 70, 250);
  const legSize = createVector(40, 120, 40);
  const headSize = createVector(100, 100, 100);
  const earSize = createVector(25, 50, 25);
  const snoutSize = createVector(60, 60, 80);
  const tailSize = createVector(25, 150, 25);

  drawDog(bodySize, legSize, headSize, earSize, snoutSize, tailSize, furColor, tailWagSpeed);
}

function drawGreyHound(furColor, tailWagSpeed) {
  const bodySize = createVector(80, 60, 300);
  const legSize = createVector(25, 140, 25);
  const headSize = createVector(70, 70, 70);
  const earSize = createVector(15, 50, 15);
  const snoutSize = createVector(40, 40, 100);
  const tailSize = createVector(15, 180, 15);

  drawDog(bodySize, legSize, headSize, earSize, snoutSize, tailSize, furColor, tailWagSpeed);
}
