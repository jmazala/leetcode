// https://leetcode.com/problems/rotting-oranges/

import java.util.LinkedList;
import java.util.Queue;

class RottingOranges {
  private static final int FRESH = 1;
  private static final int ROTTEN = 2;

  private static final int[] LEFT = { 0, -1 };
  private static final int[] RIGHT = { 0, 1 };
  private static final int[] UP = { -1, 0 };
  private static final int[] DOWN = { 1, 0 };
  private static final int[][] DIRECTIONS = { LEFT, RIGHT, UP, DOWN };

  public static int orangesRotting(int[][] grid) {
    int m = grid.length;
    int n = grid[0].length;
    int minutes = 0;
    int freshCount = 0;
    Queue<int[]> queue = new LinkedList<>();

    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        if (grid[i][j] == ROTTEN) {
          queue.add(new int[] { i, j });
        } else if (grid[i][j] == FRESH) {
          freshCount++;
        }
      }
    }

    if (freshCount == 0) {
      return 0;
    }

    while (!queue.isEmpty()) {
      int l = queue.size();
      minutes++;

      for (int i = 0; i < l; i++) {
        int[] cur = queue.remove();
        int curI = cur[0];
        int curJ = cur[1];

        for (int[] d : DIRECTIONS) {
          int dI = d[0];
          int dJ = d[1];

          int nextI = curI + dI;
          if (nextI < 0 || nextI == m) {
            continue;
          }

          int nextJ = curJ + dJ;
          if (nextJ < 0 || nextJ == n) {
            continue;
          }

          if (grid[nextI][nextJ] == FRESH) {
            freshCount--;

            if (freshCount == 0) {
              return minutes;
            }

            grid[nextI][nextJ] = ROTTEN;
            queue.add(new int[] { nextI, nextJ });
          }
        }
      }
    }

    return -1;
  }

  public static void main(String[] args) {
    System.out.println(orangesRotting(new int[][] { { 2, 1, 1 }, { 1, 1, 0 }, { 0, 1, 1 } })); // 4
  }
}
