class Solution {
  public int[] countBits(int num) {
    int[] dp = new int[num + 1];

    int nextPower = 2;
    for (int i = 1; i <= num; i++) {
      if (i == nextPower) {
        dp[i] = 1;
        nextPower *= 2;
      } else if (i % 2 == 1) {
        dp[i] = 1 + dp[i - 1];
      } else {
        dp[i] = 1 + dp[i - nextPower / 2];
      }
    }

    return dp;
  }
}