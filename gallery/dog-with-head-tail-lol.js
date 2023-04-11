let angle = 0;

function setup() {
  createCanvas(800, 800, WEBGL);
}

function draw() {
  background(200);
  ambientLight(100);
  pointLight(255, 255, 255, 0, 0, 300);

  let furColor = color(map(sin(frameCount * 0.05), -1, 1, 0, 255), 100, 255);

  push();
  rotateY(angle);
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
  translate(0, 0, -60);
  box(40, 40, 60);

  // Dog's tail
  push();
  translate(0, -30, 90);
  rotateX(-PI / 4);
  box(20, 100, 20);
  pop();

  pop();

  angle = map(mouseX, 0, width, 0, TWO_PI);
}
