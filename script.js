const board = Array(9).fill(null);
let currentPlayer = 'X';
let gameOver = false;

const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');

cells.forEach(cell => {
  cell.addEventListener('click', () => handleCellClick(cell));
});

resetButton.addEventListener('click', resetGame);

function handleCellClick(cell) {
  const index = cell.getAttribute('data-index');
  
  if (board[index] || gameOver) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWinner()) {
    setTimeout(() => alert(`${currentPlayer} wins!`), 100);
    gameOver = true;
  } else if (board.every(cell => cell !== null)) {
    setTimeout(() => alert("It's a tie!"), 100);
    gameOver = true;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function resetGame() {
  board.fill(null);
  gameOver = false;
  cells.forEach(cell => cell.textContent = '');
}
