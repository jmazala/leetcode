class Solution {
  static final int[][] DIRECTIONS = { { -1, 0 }, { 1, 0 }, { 0, -1 }, { 0, 1 } };

  public int longestIncreasingPath(int[][] matrix) {
    int M = matrix.length;
    if (M == 0) {
      return 0;
    }

    int N = matrix[0].length;
    if (N == 0) {
      return 0;
    }

    int answer = 1;
    int[][] memo = new int[M][N];

    for (int i = 0; i < M; i++) {
      for (int j = 0; j < N; j++) {
        answer = Math.max(answer, dfs(matrix, memo, i, j, M, N));
      }
    }

    return answer;
  }

  private int dfs(int[][] matrix, int[][] memo, int i, int j, int M, int N) {
    if (memo[i][j] > 0) {
      return memo[i][j];
    }

    int maxFromHere = 1;

    for (int[] direction : DIRECTIONS) {
      int nextI = i + direction[0];
      int nextJ = j + direction[1];

      if (nextI < 0 || nextJ < 0 || nextI >= M || nextJ >= N || matrix[nextI][nextJ] <= matrix[i][j]) {
        continue;
      }

      int furtherDFS = 1 + dfs(matrix, memo, nextI, nextJ, M, N);
      maxFromHere = Math.max(maxFromHere, furtherDFS);
    }

    memo[i][j] = maxFromHere;
    return maxFromHere;
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    int[][] matrix1 = { { 9, 9, 4 }, { 6, 6, 8 }, { 2, 1, 1 } };
    int[][] matrix2 = { { 3, 4, 5 }, { 3, 2, 6 }, { 2, 2, 1 } };
    int[][] matrix3 = { { 7, 8, 9 }, { 9, 7, 6 }, { 7, 2, 3 } };
    System.out.println(s.longestIncreasingPath(matrix1)); // 4
    System.out.println(s.longestIncreasingPath(matrix2)); // 4
    System.out.println(s.longestIncreasingPath(matrix3)); // 6
  }
}