import java.util.*;

class Solution {
  final static int[][] DIRECTIONS = { { -1, 0 }, { 1, 0 }, { 0, -1 }, { 0, 1 } };
  final static int EMPTY = 0;
  final static int BUILDING = 1;
  final static int OBSTACLE = 2;

  public static int shortestDistance(int[][] grid) {
    int M = grid.length;
    if (M == 0) {
      return -1;
    }

    int N = grid[0].length;

    if (N == 0) {
      return -1;
    }

    int[][] totalSteps = new int[M][N];
    int[][] reachableBuildings = new int[M][N];

    int numBuildings = 0;
    for (int i = 0; i < M; i++) {
      for (int j = 0; j < N; j++) {
        if (grid[i][j] == BUILDING) {
          bfs(grid, M, N, reachableBuildings, totalSteps, i, j);
          numBuildings++;
        }
      }
    }

    int answer = Integer.MAX_VALUE;
    for (int i = 0; i < M; i++) {
      for (int j = 0; j < N; j++) {
        if (grid[i][j] == EMPTY && reachableBuildings[i][j] == numBuildings)
          answer = Math.min(answer, totalSteps[i][j]);
      }
    }

    return answer == Integer.MAX_VALUE ? -1 : answer;
  }

  private static void bfs(int[][] grid, int M, int N, int[][] reach, int[][] dist, int i, int j) {
    Queue<int[]> queue = new LinkedList<>();
    queue.add(new int[] { i, j });

    boolean[][] visited = new boolean[M][N];
    visited[i][j] = true;
    int steps = 0;

    while (!queue.isEmpty()) {
      steps++;

      for (int count = queue.size(); count > 0; count--) {
        int[] current = queue.poll();
        int curI = current[0];
        int curJ = current[1];

        for (int[] direction : DIRECTIONS) {
          int nextI = curI + direction[0];
          int nextJ = curJ + direction[1];

          if (nextI < 0 || nextJ < 0 || nextI >= M || nextJ >= N || visited[nextI][nextJ]
              || grid[nextI][nextJ] != EMPTY) {
            continue;
          }

          queue.add(new int[] { nextI, nextJ });
          visited[nextI][nextJ] = true;
          reach[nextI][nextJ]++;
          dist[nextI][nextJ] += steps;
        }
      }
    }
  }

  public static void main(String[] args) {
    System.out
        .println(Solution.shortestDistance(new int[][] { { 1, 0, 2, 0, 1 }, { 0, 0, 0, 0, 0 }, { 0, 0, 1, 0, 0 } }));
  }
}