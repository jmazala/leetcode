import java.util.LinkedList;
import java.util.Queue;

class Solution {
  final static char WATER = '0';
  final static char LAND = '1';
  final static int[][] DIRECTIONS = { { 1, 0 }, { -1, 0 }, { 0, 1 }, { 0, -1 } };
  int numIslands = 0;
  int M;
  int N;

  public int numIslands(char[][] grid) {
    M = grid.length;
    if (M == 0) {
      return 0;
    }

    N = grid[0].length;

    for (int i = 0; i < M; i++) {
      for (int j = 0; j < N; j++) {
        if (grid[i][j] == LAND) {
          bfs(grid, i, j);
        }
      }
    }

    return numIslands;
  }

  public void bfs(char[][] grid, int i, int j) {
    Queue<int[]> queue = new LinkedList<>();
    int[] start = { i, j };
    queue.add(start);

    while (!queue.isEmpty()) {
      int[] point = queue.remove();
      int curI = point[0];
      int curJ = point[1];

      if (curI < 0 || curJ < 0 || curI >= M || curJ >= N || grid[curI][curJ] != LAND) {
        continue;
      }

      grid[curI][curJ] = WATER;
      for (int[] direction : DIRECTIONS) {
        int[] newCoords = { curI + direction[0], curJ + direction[1] };
        queue.add(newCoords);
      }
    }

    numIslands++;
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    char[][] grid = { { '1', '1', '1', '1', '0' }, { '1', '1', '0', '1', '0' }, { '1', '1', '0', '0', '0' },
        { '0', '0', '0', '0', '0' } };

    System.out.println(s.numIslands(grid));
  }
}