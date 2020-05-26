/**
 * @param {number[][]} A
 * @return {number}
 */
var minFallingPathSum = function (A) {
  const M = A.length;
  if (!M) {
    return 0;
  }

  const N = A[0].length;
  if (!N) {
    return 0;
  }

  const dp = Array(M).fill().map(i => Array(N).fill());
  dp[0] = A[0];

  for (let i = 1; i < M; i++) {
    for (let j = 0; j < N; j++) {
      dp[i][j] = A[i][j];
      if (j === 0) {
        dp[i][j] += Math.min(dp[i - 1][j], dp[i - 1][j + 1]);
      } else if (j === N - 1) {
        dp[i][j] += Math.min(dp[i - 1][j], dp[i - 1][j - 1]);
      } else {
        dp[i][j] += Math.min(dp[i - 1][j], dp[i - 1][j - 1], dp[i - 1][j + 1]);
      }
    }
  }

  return Math.min(...dp[M - 1]);
};