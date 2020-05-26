

class Solution {
  public int numSquares(int n) {
    List<Integer> nums = new ArrayList<>();
    int i = 1;
    
    while ((i * i) <= n) {
      int square = i * i++;
      if (square == n) {
        return 1;
      }

      nums.add(square);
    }

    int[] dp = new int[n + 1];
    dp[0] = 0;

    for (i = 1; i <= n; i++) {
      int min = Integer.MAX_VALUE;

      for (int num : nums) {
        if (num > i) {
          break;
        }

        if (num == i) {
          min = 1;
          break;
        }

        int difference = i - num;
        min = Math.min(min, dp[difference] + 1);
      }

      dp[i] = min;
    }

    return dp[n];
  }
}