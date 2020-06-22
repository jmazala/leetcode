class Solution {
  public static int calculateMinimumHP(int[][] dungeon) {
    int m = dungeon.length;
    if (m == 0) {
      return 0;
    }

    int n = dungeon[0].length;
    if (n == 0) {
      return 0;
    }

    int[][] dp = new int[m][n];

    // start at the end
    if (dungeon[m - 1][n - 1] >= 0) {
      dp[m - 1][n - 1] = 1;
    } else {
      dp[m - 1][n - 1] = 1 - dungeon[m - 1][n - 1];
    }

    // right most column can only go DOWN
    for (int i = m - 2; i >= 0; i--) {
      dp[i][n - 1] = Math.max(1, dp[i + 1][n - 1] - dungeon[i][n - 1]);
    }

    // left most column can only go RIGHT
    for (int j = n - 2; j >= 0; j--) {
      dp[m - 1][j] = Math.max(1, dp[m - 1][j + 1] - dungeon[m - 1][j]);
    }

    // go backwards up the rest
    for (int i = m - 2; i >= 0; i--) {
      for (int j = n - 2; j >= 0; j--) {
        dp[i][j] = Math.max(1, Math.min(dp[i + 1][j], dp[i][j + 1]) - dungeon[i][j]);
      }
    }

    return dp[0][0];
  }

  public static void main(String[] args) {
    System.out.println(Solution.calculateMinimumHP(new int[][] { { -1, -2, -3 } })); // 7
    System.out.println(Solution.calculateMinimumHP(new int[][] { { -2, -3, 3 }, { -5, -10, 1 }, { 10, 30, -5 } })); // 7
    System.out.println(Solution.calculateMinimumHP(new int[][] { { 6, -5, 8 }, { 14, -1, 6 }, { -8, -12, -5 } })); // 1
    System.out.println(Solution.calculateMinimumHP(new int[][] { { 1, 2, 3 }, { -8, -9, -10 }, { 0, 0, 0 } })); // 5
  }
}