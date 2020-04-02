class Solution {
  //could also just pass these around in the functions
  static int M;
  static int N;
  static int originalColor;

  public int[][] floodFill(int[][] image, int sr, int sc, int newColor) {
    M = image.length;
    if (M == 0) {
      return image;
    }

    N = image[0].length;
    originalColor = image[sr][sc];

    if (originalColor == newColor) {
      return image;
    }

    helper(image, sr, sc, newColor);
    return image;
  }

  public void helper(int[][] image, int i, int j, int newColor) {
    if (image[i][j] != originalColor) {
      return;
    }

    image[i][j] = newColor;

    // up
    if (i > 0) {
      helper(image, i - 1, j, newColor);
    }
    // down
    if (i < M - 1) {
      helper(image, i + 1, j, newColor);
    }
    // left
    if (j > 0) {
      helper(image, i, j - 1, newColor);
    }
    // right
    if (j < N - 1) {
      helper(image, i, j + 1, newColor);
    }
  }
}