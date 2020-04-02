import java.util.LinkedList;
import java.util.Queue;

class Solution {
  public int orangesRotting(int[][] grid) {
    int FRESH = 1;
    int ROTTEN = 2;
    int[][] DIRECTIONS = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};

    final int ROWS = grid.length;
    final int COLUMNS = grid[0].length;

    int minutes = 0;
    boolean firstPass = true;
    int freshCount = 0;

    Queue<int[]> q = new LinkedList<>();

    for (int i = 0; i < ROWS; i++) {
      for (int j = 0; j < COLUMNS; j++) {
        if (grid[i][j] == ROTTEN) {
          int[] coordinatesAndSteps = { i, j };
          q.add(coordinatesAndSteps);
        } else if (grid[i][j] == FRESH) {
          freshCount++;
        }
      }
    }

    while (q.size() > 0) {
      int numNodes = q.size();

      while (numNodes > 0) {
        int[] coordinates = q.remove();
        int i = coordinates[0];
        int j = coordinates[1];
        numNodes--;

        for (int[] direction : DIRECTIONS) {
          int newI = i + direction[0];
          int newJ = j + direction[1];

          if (newI < 0 || newJ < 0 || newI >= ROWS || newJ >= COLUMNS) {
            continue;
          }
          
          if (grid[newI][newJ] == FRESH) {
            int[] newCoordinates = {newI, newJ};
            q.add(newCoordinates);
            grid[newI][newJ] = ROTTEN;
            freshCount--;
          }
        }
      }

      if (firstPass) {
        firstPass = false;
      } else {
        minutes++;
      }
    }

    return freshCount == 0 ? minutes : -1;
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    int[][] grid = { { 2, 2 }, { 1, 1 }, { 0, 0 }, { 2, 0 } };
    int answer = s.orangesRotting(grid);
    System.out.println(answer);
  }
}
