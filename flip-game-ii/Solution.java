class Solution {
  public boolean canWinGame(String board) {
    if (board == null || board.length() < 2) {
      return false;
    }

    // go through string, find a valid move, try to flip it
    // calculate new state and give it to opponent
    for (int i = 0; i < board.length() - 1; i++) {
      if (board.charAt(i) == '+' && board.charAt(i + 1) == '+') {
        // we can move. try flipping
        String nextState = board.substring(0, i) + "--" + board.substring(i + 2);
        if (!canWinGame(nextState)) {
          return true;
        }
      }
    }

    return false;
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    System.out.println(s.canWinGame("++++"));
  }
}