class Solution {
  int[][] grid;
  int M;
  int N;
  int answer;

  public int getMaximumGold(int[][] grid) {
    this.grid = grid;
    M = grid.length;
    if (M == 0) {
      return 0;
    }

    N = grid[0].length;
    answer = 0;

    for (int i = 0; i < M; i++) {
      for (int j = 0; j < N; j++) {
        if (grid[i][j] > 0) {
          dfs(i, j, 0);
        }
      }
    }

    return answer;
  }

  private void dfs(int i, int j, int gold) {
    if (i < 0 || j < 0 || i >= M || j >= N || grid[i][j] == 0) {
      answer = Math.max(answer, gold);
      return;
    }

    int currentGold = grid[i][j];
    grid[i][j] = 0;

    // up, down, left, right
    dfs(i - 1, j, currentGold + gold);
    dfs(i + 1, j, currentGold + gold);
    dfs(i, j - 1, currentGold + gold);
    dfs(i, j + 1, currentGold + gold);

    grid[i][j] = currentGold;
  }
}