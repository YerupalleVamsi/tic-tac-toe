
const startBtn = document.querySelector('.start-btn');
const startPage = document.querySelector('.start-page');
const mainPage = document.querySelector('.main-page');

startBtn.addEventListener('click', () => {
  startPage.style.opacity = '0';
  setTimeout(() => {
    startPage.style.display = 'none';
    mainPage.style.display = 'flex';
    setTimeout(() => {
      mainPage.style.opacity = '1';
    }, 50);
  }, 500);
});

// --- BOARD SETUP ---
const board = document.querySelector('.board');
const statusText = document.querySelector('.status');
const restartBtn = document.querySelector('.restart-btn');

let cells = Array(9).fill(null); // filling nulls bru
let currentPlayer = "X";
let gameOver = false;

for (let i = 0; i < 9; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.dataset.index = i;
  board.appendChild(cell);
}

// --- HANDLE CELL CLICKS ---
board.addEventListener('click', (e) => {
  const cell = e.target;
  const index = cell.dataset.index;

  if (!cell.classList.contains('cell') || cells[index] || gameOver) return;

  cells[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `${currentPlayer} Wins!`;
    highlightWinner();
    gameOver = true;
  } else if (cells.every(c => c)) {
    statusText.textContent = "Draw";
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
  }
});

// --- RESTART GAME ---
restartBtn.addEventListener('click', resetGame);

function resetGame() {
  cells = Array(9).fill(null);
  document.querySelectorAll('.cell').forEach(c => {
    c.textContent = '';
    c.classList.remove('winner');
  });
  currentPlayer = "X";
  statusText.textContent = `Player X's Turn`;
  gameOver = false;
}

// --- WINNER DETECTION ---
function checkWinner() {
  const combos = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // columns
    [0,4,8],[2,4,6]           // diagonals
  ];

  return combos.some(([a, b, c]) => {
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}

// --- HIGHLIGHT WINNING CELLS ---
function highlightWinner() {
  const combos = [
    [0,1,2],[3,4,5],[6,7,8], //  r
    [0,3,6],[1,4,7],[2,5,8], // c
    [0,4,8],[2,4,6]          // d
  ]; 

  combos.forEach(([a,b,c]) => {
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      document.querySelectorAll('.cell')[a].classList.add('winner');
      document.querySelectorAll('.cell')[b].classList.add('winner');
      document.querySelectorAll('.cell')[c].classList.add('winner');
    }
  });
}
