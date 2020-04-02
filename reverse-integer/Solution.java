class Solution {
  public int reverse(int x) {
    int answer = 0;
    while (x != 0) {
      int pop = x % 10;
      x /= 10;
      
      if (answer > Integer.MAX_VALUE / 10 || (answer == Integer.MAX_VALUE / 10 && pop > 7)) {
        return 0;
      }
      
      if (answer < Integer.MIN_VALUE / 10 || (answer == Integer.MIN_VALUE / 10 && pop < -8)) {
        return 0;
      }
      
      answer *= 10;
      answer += pop;
    }

    return answer;
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    System.out.println(s.reverse(123));
    System.out.println(s.reverse(-123));
  }
}