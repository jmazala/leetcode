/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
  const M = grid.length;
  if (!M) {
    return;
  }

  const N = grid[0].length;

  const dp = Array(M).fill().map(x => Array(N)); //dp[i][j]cost to get to (i, j)
  dp[0][0] = grid[0][0];

  //top row can only get there one way
  for (let j = 1; j <= N; j++) {
    dp[0][j] = dp[0][j - 1] + grid[0][j];
  }

  //left column can only get there one way
  for (let i = 1; i < M; i++) {
    dp[i][0] = dp[i - 1][0] + grid[i][0];
  }

  //now lets do the middle
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (i == 0 || j == 0 || dp[i][j]) {
        continue;
      }

      dp[i][j] = grid[i][j] + Math.min(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  return dp[M - 1][N - 1];
};

// console.log(minPathSum([
//   [1, 3, 1],
//   [1, 5, 1],
//   [4, 2, 1]
// ]));
console.log(minPathSum([[1, 2, 5], [3, 2, 1]]));