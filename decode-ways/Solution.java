class Solution {
  public int numDecodings(String s) {
    if (s == null || s.length() == 0) {
      return 0;
    }

    // initial 0 ruins s of any length so this is a *tiny* optimization
    if (s.charAt(0) == '0') {
      return 0;
    }

    int[] dp = new int[s.length() + 1];
    dp[0] = 1; // 1 way to decode empty string. empty
    dp[1] = 1; // 1 way to decode single digit non '0' string.

    for (int i = 2; i <= s.length(); i++) {
      int oneDigitsBack = Integer.parseInt(s.substring(i - 1, i));
      int twoDigitsBack = Integer.parseInt(s.substring(i - 2, i));

      if (oneDigitsBack > 0) {
        dp[i] = dp[i - 1];
      }

      if (twoDigitsBack >= 10 && twoDigitsBack <= 26) {
        dp[i] += dp[i - 2];
      }
    }

    return dp[s.length()];
  }
}