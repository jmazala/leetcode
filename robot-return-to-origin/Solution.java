class Solution {
  public boolean judgeCircle(String moves) {
    int x = 0;
    int y = 0;
    for (char C : moves.toCharArray()) {
      switch (C) {
        case 'U':
          y++;
          break;
        case 'D':
          y--;
          break;
        case 'L':
          x--;
          break;
        case 'R':
          x++;
          break;
      }
    }

    return x == 0 && y == 0;
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    System.out.println(s.judgeCircle("UD"));
    System.out.println(s.judgeCircle("LL"));
  }
}