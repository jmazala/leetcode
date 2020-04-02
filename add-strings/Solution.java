class Solution {
  // this solution has some overflow issues
  // public String addStrings(String num1, String num2) {
  // long answer = 0;
  // num1 = new StringBuilder(num1).reverse().toString();
  // num2 = new StringBuilder(num2).reverse().toString();

  // for (int i = 0; i < Math.max(num1.length(), num2.length()); i++) {
  // if (i < num1.length()) {
  // answer += (num1.charAt(i) - '0') * Math.pow(10, i);
  // }

  // if (i < num2.length()) {
  // answer += (num2.charAt(i) - '0') * Math.pow(10, i);
  // }
  // }

  // return String.valueOf(answer);
  // }

  public String addStrings(String num1, String num2) {
    StringBuilder builder = new StringBuilder();
    num1 = new StringBuilder(num1).reverse().toString();
    num2 = new StringBuilder(num2).reverse().toString();
    boolean carry = false;

    for (int i = 0; i < Math.max(num1.length(), num2.length()); i++) {
      int place = carry ? 1 : 0;
      carry = false;
      
      if (i < num1.length()) {
        place += num1.charAt(i) - '0';
      }

      if (i < num2.length()) {
        place += num2.charAt(i) - '0';
      }

      if (place < 10) {
        builder.append(String.valueOf(place));
      } else {
        carry = true;
        builder.append(String.valueOf(place - 10));
      }
    }

    if (carry) {
      builder.append("1");
    }

    return builder.reverse().toString();
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    System.out.println(s.addStrings("18582506933032752", "366213329703"));
    // System.out.println(s.addStrings("789", "999"));
  }
}