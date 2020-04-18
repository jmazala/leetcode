import java.util.Arrays;

class Solution {
  public static void rotate(int[][] matrix) {
    int N = matrix.length;
    if (N == 0) {
      return;
    }

    // transpose the array. horizontal becomes vertical
    for (int i = 0; i < N; i++) {
      for (int j = i; j < N; j++) {
        int temp = matrix[i][j];
        matrix[i][j] = matrix[j][i];
        matrix[j][i] = temp;
      }
    }

    // then flip it horizontally
    for (int i = 0; i < N; i++) {
      for (int j = 0; j < N / 2; j++) {
        int temp = matrix[i][j];
        matrix[i][j] = matrix[i][N - 1 - j];
        matrix[i][N - 1 - j] = temp;
      }
    }
  }

  public static void main(String[] args) {
    int[][] matrix = { { 1, 2, 3 }, { 4, 5, 6 }, { 7, 8, 9 } };
    Solution.rotate(matrix);
    System.out.println(Arrays.deepToString(matrix));
  }
}