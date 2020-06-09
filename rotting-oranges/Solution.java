import java.util.*;

class Solution {
  final static int FRESH = 1;
  final static int ROTTEN = 2;
  final static int[][] DIRECTIONS = { { 1, 0 }, { -1, 0 }, { 0, 1 }, { 0, -1 } };

  public static int orangesRotting(int[][] grid) {
    final int M = grid.length;
    if (M == 0) {
      return -1;
    }

    final int N = grid[0].length;
    if (N == 0) {
      return -1;
    }

    int freshOranges = 0;
    Queue<int[]> queue = new LinkedList<>();

    for (int i = 0; i < M; i++) {
      for (int j = 0; j < N; j++) {
        if (grid[i][j] == ROTTEN) {
          queue.add(new int[] { i, j });
        } else if (grid[i][j] == FRESH) {
          freshOranges++;
        }
      }
    }

    if (freshOranges == 0) {
      return 0;
    }

    int steps = 0;
    while (!queue.isEmpty()) {
      int numNodes = queue.size();
      steps++;

      while (numNodes > 0) {
        int[] coordinates = queue.remove();
        numNodes--;
        int curI = coordinates[0];
        int curJ = coordinates[1];

        for (int[] direction : DIRECTIONS) {
          int nextI = curI + direction[0];
          int nextJ = curJ + direction[1];

          if (nextI < 0 || nextJ < 0 || nextI >= M || nextJ >= N) {
            continue;
          }

          if (grid[nextI][nextJ] == FRESH) {
            grid[nextI][nextJ] = ROTTEN;
            queue.add(new int[] { nextI, nextJ });
            freshOranges--;

            if (freshOranges == 0) {
              return steps;
            }
          }
        }
      }
    }

    return -1;
  }

  public static void main(String[] args) {
    System.out.println(Solution.orangesRotting(new int[][] { { 2, 1, 1 }, { 1, 1, 0 }, { 0, 1, 1 } })); // 4
  }
}
