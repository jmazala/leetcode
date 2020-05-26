class Solution {
  public int minFallingPathSum(int[][] A) {
    int M = A.length;
    if (M == 0) {
      return 0;
    }

    int N = A[0].length;
    if (N == 0) {
      return 0;
    }

    int[][] dp = new int[M][N];
    dp[0] = A[0];

    for (int i = 1; i < M; i++) {
      for (int j = 0; j < N; j++) {
        if (j == 0) {
          dp[i][j] = A[i][j] + Math.min(dp[i - 1][j], dp[i - 1][j + 1]);
        } else if (j == N - 1) {
          dp[i][j] = A[i][j] + Math.min(dp[i - 1][j], dp[i - 1][j - 1]);
        } else {
          dp[i][j] = A[i][j] + Math.min(dp[i - 1][j], Math.min(dp[i - 1][j - 1], dp[i - 1][j + 1]));
        }
      }
    }

    int answer = Integer.MAX_VALUE;
    for (int j = 0; j < N; j++) {
      answer = Math.min(answer, dp[M - 1][j]);
    }

    return answer;
  }
}