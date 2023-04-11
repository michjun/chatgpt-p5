const numStreams = 100;
const symbolSize = 18;
const streamSpeedMin = 1;
const streamSpeedMax = 5;

let streams = [];

class MatrixSymbol {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.char = String.fromCharCode(0x30A0 + floor(random(0, 96)));
    this.switchInterval = round(random(2, 20));
  }

  setToRandomSymbol() {
    if (frameCount % this.switchInterval === 0) {
      this.char = String.fromCharCode(0x0021 + floor(random(0, 96)));
    }
  }

  render() {
    fill(255, 255, 70);
    text(this.char, this.x, this.y);
    this.y += this.speed;
    if (this.y > height) {
      this.y = 0;
    }
    this.setToRandomSymbol();
  }
}

class Stream {
  constructor(x) {
    this.symbols = [];
    this.x = x;
    this.speed = random(streamSpeedMin, streamSpeedMax);
    this.totalSymbols = round(random(5, 30));
    this.generateSymbols();
  }

  generateSymbols() {
    let y = round(random(-1000, 0));
    for (let i = 0; i < this.totalSymbols; i++) {
      const symbol = new MatrixSymbol(this.x, y, this.speed);
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      y -= symbolSize;
    }
  }

  render() {
    this.symbols.forEach((symbol) => {
      symbol.render();
    });
  }
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  textSize(symbolSize);

  for (let i = 0; i < numStreams; i++) {
    const stream = new Stream(i * symbolSize);
    streams.push(stream);
  }
}

function draw() {
  background(0, 25);
  streams.forEach((stream) => {
    stream.render();
  });
}
