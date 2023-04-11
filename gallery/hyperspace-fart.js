const particles = [];
const numParticles = 100;
const centerX = 400;
const centerY = 400;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);

  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle(centerX, centerY));
  }
}

function draw() {
  background(0, 1);

  particles.forEach((particle) => {
    particle.move();
    particle.display();
    particle.checkBounds();
  });
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(1, 4));
    this.size = random(10, 20);
    this.hue = random(360);
    this.life = 200;
  }

  move() {
    this.pos.add(this.vel);
    this.life -= 1;
  }

  display() {
    fill(this.hue, 50, 100, this.life);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.size);
  }

  checkBounds() {
    if (this.life < 0) {
      this.pos.set(centerX, centerY);
      this.vel = p5.Vector.random2D().mult(random(1, 4));
      this.life = 200;
    }
  }
}
