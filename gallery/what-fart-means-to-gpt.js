const particles = [];
const numParticles = 200;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);

  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function draw() {
  background(0, 0.1);
  
  particles.forEach((particle) => {
    particle.move();
    particle.display();
  });
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.acc = createVector(0, 0);
    this.size = random(10, 30);
    this.hue = random(360);
  }

  move() {
    this.acc = p5.Vector.random2D().mult(0.1);
    this.vel.add(this.acc);
    this.vel.limit(2);
    this.pos.add(this.vel);

    if (this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height) {
      this.pos = createVector(random(width), random(height));
    }
  }

  display() {
    this.hue += 0.1;
    if (this.hue > 360) {
      this.hue = 0;
    }

    fill(this.hue, 50, 100, 10);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.size);
  }
}
