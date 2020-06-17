import java.util.Arrays;
import java.util.LinkedList;
import java.util.Queue;

class Solution {
  static final char PLACEHOLDER = 'P';
  static final int[][] DIRECTIONS = { { -1, 0 }, { 1, 0 }, { 0, -1 }, { 0, 1 } };

  // USING BFS
  public void solve(char[][] board) {
    int m = board.length;
    if (m == 0) {
      return;
    }

    int n = board[0].length;
    if (n == 0) {
      return;
    }

    // start on the perimeter and BFS from there
    for (int i = 0; i < m; i++) {
      if (board[i][0] == 'O') {
        bfs(board, i, 0, m, n);
      }

      if (board[i][n - 1] == 'O') {
        bfs(board, i, n - 1, m, n);
      }
    }

    for (int j = 0; j < n; j++) {
      if (board[0][j] == 'O') {
        bfs(board, 0, j, m, n);
      }

      if (board[m - 1][j] == 'O') {
        bfs(board, m - 1, j, m, n);
      }
    }

    // iterate through the array one last time and change all the placeholders back
    // to '0'
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        if (board[i][j] == PLACEHOLDER) {
          board[i][j] = 'O';
        } else if (board[i][j] == 'O') {
          board[i][j] = 'X';
        }
      }
    }
  }

  public void bfs(char[][] board, int i, int j, int m, int n) {
    board[i][j] = PLACEHOLDER;

    Queue<int[]> queue = new LinkedList<>();
    queue.add(new int[] { i, j });

    while (!queue.isEmpty()) {
      int[] coords = queue.remove();
      int curI = coords[0];
      int curJ = coords[1];

      for (int[] direction : DIRECTIONS) {
        int nextI = curI + direction[0];
        int nextJ = curJ + direction[1];

        if (nextI >= m || nextJ >= n || nextI < 0 || nextJ < 0 || board[nextI][nextJ] != 'O') {
          continue;
        }

        board[nextI][nextJ] = PLACEHOLDER;
        queue.add(new int[] { nextI, nextJ });
      }
    }
  }

  public static void main(String[] args) {
    char[][] board = { { 'X', 'X', 'X', 'X' }, { 'X', 'O', 'O', 'X' }, { 'X', 'X', 'O', 'X' }, { 'X', 'O', 'X', 'X' } };
    Solution s = new Solution();
    // s.solve(board);

    // [[X, X, X, X], [X, X, X, X], [X, X, X, X], [X, O, X, X]]
    // System.out.println(Arrays.deepToString(board));

    char[][] board2 = {
        { 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'X', 'O', 'O', 'O', 'O', 'O', 'X', 'O', 'O', 'O', 'O', 'O' },
        { 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'X', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O' },
        { 'X', 'O', 'O', 'X', 'O', 'X', 'O', 'O', 'O', 'O', 'X', 'O', 'O', 'X', 'O', 'O', 'O', 'O', 'O', 'O' },
        { 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'X', 'X', 'O' },
        { 'O', 'X', 'X', 'O', 'O', 'O', 'O', 'O', 'O', 'X', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O' },
        { 'O', 'O', 'O', 'O', 'X', 'O', 'O', 'O', 'O', 'O', 'O', 'X', 'O', 'O', 'O', 'O', 'O', 'X', 'X', 'O' },
        { 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'X', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O' },
        { 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'X', 'O', 'O', 'O', 'O', 'O', 'O' },
        { 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'X', 'O' },
        { 'O', 'O', 'O', 'O', 'O', 'X', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O' },
        { 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'X', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O' },
        { 'O', 'O', 'O', 'O', 'X', 'O', 'O', 'O', 'O', 'X', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O' },
        { 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'X', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O' },
        { 'X', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'X', 'X', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O' },
        { 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'X', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O' },
        { 'O', 'O', 'O', 'O', 'X', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'X', 'O', 'O', 'O', 'O', 'O', 'X' },
        { 'O', 'O', 'O', 'O', 'O', 'X', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'X', 'O', 'X', 'O', 'O' },
        { 'O', 'X', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O' },
        { 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'O', 'O', 'X', 'O', 'O', 'X' },
        { 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O' } };
    s.solve(board2);
    System.out.println(Arrays.deepToString(board2));
  }
}