// On a 2-dimensional grid, there are 4 types of squares:

// 1 represents the starting square.  There is exactly one starting square.
// 2 represents the ending square.  There is exactly one ending square.
// 0 represents empty squares we can walk over.
// -1 represents obstacles that we cannot walk over.
// Return the number of 4-directional walks from the starting square to the ending square, that walk over every non-obstacle square exactly once.

class Solution {
  private static int[][] DIRECTIONS = { { -1, 0 }, { 1, 0 }, { 0, -1 }, { 0, 1 } };
  private static int STARTING = 1;
  private static int ENDING = 2;
  private static int EMPTY = 0;
  private static int OBSTACLE = -1;
  private static int VISITED = 3;
  private int M;
  private int N;
  private int answer = 0;
  private int[][] grid;

  public int uniquePathsIII(int[][] grid) {
    this.grid = grid;
    int numLeft = 0;
    int iStart = -1;
    int jStart = -1;

    M = grid.length;
    N = grid[0].length;

    for (int i = 0; i < M; i++) {
      for (int j = 0; j < N; j++) {
        if (grid[i][j] == OBSTACLE) {
          continue;
        }

        numLeft++;

        if (grid[i][j] == STARTING) {
          iStart = i;
          jStart = j;
          continue;
        }
      }
    }

    dfs(iStart, jStart, numLeft);
    return answer;
  }

  public void dfs(int i, int j, int numLeft) {
    numLeft--;
    if (numLeft < 0) {
      return; // this shouldn't happen
    }

    if (grid[i][j] == ENDING) {
      if (numLeft == 0) {
        answer++;
      }

      return;
    }

    grid[i][j] = VISITED;
    for (int[] direction : DIRECTIONS) {
      int nextI = i + direction[0];
      int nextJ = j + direction[1];
      if (nextI < 0 || nextJ < 0 || nextI >= M || nextJ >= N || grid[nextI][nextJ] == OBSTACLE
          || grid[nextI][nextJ] == VISITED) {
        continue;
      }

      dfs(nextI, nextJ, numLeft);
    }

    grid[i][j] = EMPTY;
  }

  public static void main(String[] args) {
    int[][] grid = { { 1, 0, 0, 0 }, { 0, 0, 0, 0 }, { 0, 0, 2, -1 } };
    Solution s1 = new Solution();
    System.out.println(s1.uniquePathsIII(grid)); // 2
    Solution s2 = new Solution();
    int[][] grid2 = { { 1, 0, 0, 0 }, { 0, 0, 0, 0 }, { 0, 0, 0, 2 } };
    System.out.println(s2.uniquePathsIII(grid2)); // 4
    Solution s3 = new Solution();
    int[][] grid3 = { { 0, 1 }, { 2, 0 } };
    System.out.println(s3.uniquePathsIII(grid3)); // 0
  }
}