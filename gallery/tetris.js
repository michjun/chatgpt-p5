let board;
let blockSize = 30;
let currentBlock;
let frameSpeed = 10;

const colors = [
  [255, 255, 0], // Yellow
  [0, 255, 255], // Cyan
  [255, 165, 0], // Orange
  [0, 0, 255],   // Blue
  [255, 0, 255], // Magenta
  [255, 0, 0],   // Red
  [0, 255, 0]    // Green
];

const blockTypes = [
  // T-shape
  [
    [1, 1, 1],
    [0, 1, 0]
  ],
  // L-shape
  [
    [1, 1, 1],
    [1, 0, 0]
  ],
  // J-shape
  [
    [1, 1, 1],
    [0, 0, 1]
  ],
  // S-shape
  [
    [0, 1, 1],
    [1, 1, 0]
  ],
  // Z-shape
  [
    [1, 1, 0],
    [0, 1, 1]
  ],
  // O-shape
  [
    [1, 1],
    [1, 1]
  ],
  // I-shape
  [
    [1, 1, 1, 1]
  ]
];

function setup() {
  createCanvas(300, 600);
  board = createEmptyBoard(10, 20);
  currentBlock = createNewBlock();
}

function draw() {
  background(0);
  if (frameCount % frameSpeed === 0) {
    if (!moveBlockDown(currentBlock)) {
      addBlockToBoard(currentBlock);
      currentBlock = createNewBlock();
      if (!moveBlockDown(currentBlock)) {
        alert("Game Over!");
        noLoop();
      }
    }
  }
  drawBoard();
  drawBlock(currentBlock);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    moveBlockSideways(-1);
  } else if (keyCode === RIGHT_ARROW) {
    moveBlockSideways(1);
  } else if (keyCode === DOWN_ARROW) {
    moveBlockDown(currentBlock);
  } else if (keyCode === UP_ARROW) {
    rotateBlock();
  }
}

function createEmptyBoard(width, height) {
  let board = new Array(height);
  for (let y = 0; y < height; y++) {
    board[y] = new Array(width).fill(0);
  }
  return board;
}

function createNewBlock() {
  const typeIndex = floor(random(blockTypes.length));
  const shape = blockTypes[typeIndex];
  const color = colors[typeIndex];
  return {
    x: floor(board[0].length / 2) - 1,
    y: 0,
    shape: shape,
    color: color,
  };
}

function moveBlockDown(block) {
  const newY = block.y + 1;

  if (isValidMove(block.shape, block.x, newY)) {
    block.y = newY;
    return true;
  } else {
    return false;
  }
}

function isValidMove(shape, newX, newY) {
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x] && (newY + y < 0 || newY + y >= board.length || newX + x < 0 || newX + x >= board[0].length || board[newY + y][newX + x])) {
        return false;
      }
    }
  }
  return true;
}

function drawBoard() {
  background(51);

  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      if (board[y][x]) {
        fill(board[y][x]);
        stroke(0);
        rect(x * blockSize, y * blockSize, blockSize, blockSize);
      }
    }
  }
}

function drawBlock(block) {
  for (let y = 0; y < block.shape.length; y++) {
    for (let x = 0; x < block.shape[y].length; x++) {
      if (block.shape[y][x]) {
        fill(block.color);
        stroke(0);
        rect((block.x + x) * blockSize, (block.y + y) * blockSize, blockSize, blockSize);
      }
    }
  }
}

function addBlockToBoard(block) {
  for (let y = 0; y < block.shape.length; y++) {
    for (let x = 0; x < block.shape[y].length; x++) {
      if (block.shape[y][x]) {
        board[block.y + y][block.x + x] = block.color;
      }
    }
  }
  // Check for full rows
  for (let y = board.length - 1; y >= 0; ) {
    let rowFull = true;
    for (let x = 0; x < board[y].length; x++) {
      if (!board[y][x]) {
        rowFull = false;
        break;
      }
    }
    if (rowFull) {
      // Remove the full row
      board.splice(y, 1);
      // Add a new empty row at the top
      board.unshift(new Array(board[0].length).fill(null));
    } else {
      y--;
    }
  }
}

function isCollision(block) {
  for (let row = 0; row < block.shape.length; row++) {
    for (let col = 0; col < block.shape[row].length; col++) {
      if (block.shape[row][col] === 1) {
        const boardRow = row + block.y;
        const boardCol = col + block.x;
        if (boardRow < 0 || boardRow >= board.length || boardCol < 0 || boardCol >= board[0].length) {
          return true;
        }
        if (board[boardRow][boardCol] !== 0) {
          return true;
        }
      }
    }
  }
  return false;
}

function moveBlockSideways(direction) {
  const originalX = currentBlock.x;
  currentBlock.x += direction;

  if (isCollision(currentBlock)) {
    currentBlock.x = originalX;
  }
}

function rotateBlock() {
  const originalShape = currentBlock.shape;
  const newShape = [];

  for (let x = 0; x < originalShape[0].length; x++) {
    newShape[x] = [];
    for (let y = 0; y < originalShape.length; y++) {
      newShape[x][y] = originalShape[y][originalShape[0].length - x - 1];
    }
  }

  currentBlock.shape = newShape;

  if (isCollision(currentBlock)) {
    currentBlock.shape = originalShape;
  }
}

