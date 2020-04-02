import java.util.LinkedList;
import java.util.Queue;

class Solution {
  static final int LAND = 1;
  static final int[][] DIRECTIONS = { { -1, 0 }, { 1, 0 }, { 0, -1 }, { 0, 1 } };
  static int M, N;

  public int maxAreaOfIsland(int[][] grid) {
    M = grid.length;
    if (M == 0) {
      return 0;
    }

    N = grid[0].length;
    int maxArea = 0;

    for (int i = 0; i < M; i++) {
      for (int j = 0; j < N; j++) {
        if (grid[i][j] == LAND) {
          maxArea = Math.max(maxArea, helper(grid, i, j));
        }
      }
    }

    return maxArea;
  }

  public int helper(int[][] grid, int i, int j) {
    Queue<int[]> queue = new LinkedList<>();
    int[] start = { i, j };
    int area = 0;
    queue.add(start);

    while (!queue.isEmpty()) {
      int[] current = queue.poll();
      int curI = current[0];
      int curJ = current[1];

      if (grid[curI][curJ] != LAND) {
        continue;
      }

      area++;
      grid[curI][curJ] = -1;

      for (int[] direction : DIRECTIONS) {
        int nextI = curI + direction[0];
        int nextJ = curJ + direction[1];

        if (nextI < 0 || nextJ < 0 || nextI >= M || nextJ >= N) {
          continue;
        }

        if (grid[nextI][nextJ] == LAND) {
          int[] next = { nextI, nextJ };
          queue.add(next);
        }
      }
    }

    return area;
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    int[][] grid = { { 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0 }, { 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0 },
        { 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 }, { 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0 },
        { 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0 }, { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0 },
        { 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0 }, { 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0 } };
    System.out.println(s.maxAreaOfIsland(grid));
  }
}