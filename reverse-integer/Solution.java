// https://leetcode.com/problems/reverse-integer

class Solution {
  public int reverse(int x) {
    int answer = 0;
    while (x != 0) {
      int pop = x % 10;
      x /= 10;

      // biggest int32 is 2147483647 and least is -2147483648

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

  public int reverse2(int x) {
    String reversed = new StringBuilder().append(Math.abs(x)).reverse().toString();

    try {
      return (x < 0) ? Integer.parseInt(reversed) * -1 : Integer.parseInt(reversed);
    } catch (NumberFormatException e) {
      return 0;
    }
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    System.out.println(s.reverse(123));
    System.out.println(s.reverse(-123));
  }
}