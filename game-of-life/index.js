const LIVE = 1;
const DEAD = 0;
const DIRECTIONS = [
  [-1, 0], [1, 0], [0, -1], [0, 1],
  [-1, -1], [-1, 1], [1, -1], [1, 1]
];
const LIVE = 1;
const DEAD = 0;
const DIRECTIONS = [
  [-1, 0], [1, 0], [0, -1], [0, 1],
  [-1, -1], [-1, 1], [1, -1], [1, 1]
];
/**
 * @param {number[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var gameOfLife = function (board) {
  const m = board.length;
  const n = board[0].length;
  const next = Array(m).fill().map(i => Array(n).fill());

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const isDead = board[i][j] === DEAD;
      const liveNeighbors = DIRECTIONS.filter(direction => {
        const nextI = i + direction[0];
        const nextJ = j + direction[1];
        if (nextI < 0 || nextJ < 0 || nextI >= m || nextJ >= n) {
          return false;
        }

        return board[nextI][nextJ] === LIVE;
      }).length;

      // Any live cell with fewer than two live neighbors dies, as if caused by under-population.
      if (!isDead && liveNeighbors < 2) {
        next[i][j] = DEAD;
        continue;
      }

      // Any live cell with two or three live neighbors lives on to the next generation.
      if (!isDead && (liveNeighbors === 2 || liveNeighbors === 3)) {
        next[i][j] = LIVE;
        continue;
      }

      // Any live cell with more than three live neighbors dies, as if by over-population..
      if (!isDead && liveNeighbors > 3) {
        next[i][j] = DEAD;
        continue;
      }

      // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
      if (isDead && liveNeighbors === 3) {
        next[i][j] = LIVE;
        continue;
      }

      next[i][j] = board[i][j];
    }
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      board[i][j] = next[i][j];
    }
  }

  return board;
};

console.log(gameOfLife([
  [0, 1, 0],
  [0, 0, 1],
  [1, 1, 1],
  [0, 0, 0]
]));