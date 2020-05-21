class Solution {
  public int countSquares(int[][] matrix) {
    int m = matrix.length;
    if (m == 0) {
      return 0;
    }

    int n = matrix[0].length;
    int answer = 0;
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        if (matrix[i][j] == 0) {
          continue;
        }

        if (i == 0 || j == 0) {
          answer++;
          continue;
        }
        // left, up, diagonal up&left
        int min = Math.min(matrix[i][j - 1], Math.min(matrix[i - 1][j], matrix[i - 1][j - 1]));

        matrix[i][j] += min;
        answer += matrix[i][j];
      }
    }

    return answer;
  }
}