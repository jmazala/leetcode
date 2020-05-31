class Solution {
  public int myAtoi(String str) {
    if (str.length() == 0) {
      return 0;
    }

    StringBuilder builder = new StringBuilder();
    // The function first discards as many whitespace characters as necessary until
    // the first non-whitespace character is found.
    int i = 0;
    while (i < str.length() && str.charAt(i) == ' ') {
      i++;
    }

    if (i == str.length()) {
      return 0;
    }

    // Then, starting from this character, takes an optional initial plus or minus
    // sign followed by as many numerical digits as possible, and interprets them as
    // a numerical value.
    boolean isNegative = str.charAt(i) == '-';
    if (isNegative || str.charAt(i) == '+') {
      i++;
    }

    while (i < str.length() && Character.isDigit(str.charAt(i))) {
      builder.append(str.charAt(i++));
    }

    if (builder.length() == 0) {
      return 0;
    }

    try {
      int number = Integer.parseInt(builder.toString());
      return isNegative ? -1 * number : number;
    } catch (java.lang.NumberFormatException s) {
      return isNegative ? Integer.MIN_VALUE : Integer.MAX_VALUE;
    }
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    System.out.println(s.myAtoi("")); // 0
    System.out.println(s.myAtoi(" ")); // 0
    System.out.println(s.myAtoi("-91283472332"));
    System.out.println(s.myAtoi("+1")); // 1
    System.out.println(s.myAtoi("42")); // 42
  }
}