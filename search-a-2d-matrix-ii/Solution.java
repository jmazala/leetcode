class Solution {
  public boolean searchMatrix(int[][] matrix, int target) {
    int M = matrix.length;
    if (M == 0) {
      return false;
    }

    int N = matrix[0].length;

    int i = 0;
    int j = N - 1;

    while (i >= 0 && j >= 0 && i < M && j < N) {
      if (matrix[i][j] == target) {
        return true;
      }

      if (target > matrix[i][j]) {
        i += 1;
      } else {
        j -= 1;
      }
    }

    return false;
  }
}