const PLACEHOLDER = 'P';
const DIRECTIONS = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
// USING DFS
const solve = function (board) {
  const M = board.length;
  if (!M) {
    return;
  }

  const N = board[0].length;
  if (!N) {
    return;
  }

  // DFS from all perimeters and mark with a placeholder
  for (let i = 0; i < M; i++) {
    if (board[i][0] === 'O') {
      dfs(i, 0);
    }

    if (board[i][N - 1] === 'O') {
      dfs(i, N - 1);
    }
  }

  for (let j = 0; j < N; j++) {
    if (board[0][j] === 'O') {
      dfs(0, j);
    }

    if (board[M - 1][j] === 'O') {
      dfs(M - 1, j);
    }
  }

  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (board[i][j] === PLACEHOLDER) {
        board[i][j] = 'O';
      } else if (board[i][j] === 'O') {
        board[i][j] = 'X';
      }
    }
  }

  function dfs(i, j) {
    board[i][j] = PLACEHOLDER;
    for (const [iDelta, jDelta] of DIRECTIONS) {
      const nextI = i + iDelta;
      const nextJ = j + jDelta;

      if (
        nextI < 0 ||
        nextJ < 0 ||
        nextI >= M ||
        nextJ >= N ||
        board[nextI][nextJ] !== 'O'
      ) {
        continue;
      }

      dfs(nextI, nextJ);
    }
  }
};
