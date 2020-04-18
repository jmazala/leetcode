class Solution {
  public static int maxSubArray(int[] nums) {
    if (nums == null || nums.length == 0) {
      return 0;
    }
    
    // go through the array and store maximum subarray up to that point
    int[] dp = new int[nums.length];
    dp[0] = nums[0];
    int answer = dp[0];

    for (int i = 1; i < nums.length; i++) {
      dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
      answer = Math.max(answer, dp[i]);
    }

    return answer;
  }

  public static void main(String[] args) {
    System.out.println(Solution.maxSubArray(new int[] { -2, 1, -3, 4, -1, 2, 1, -5, 4 })); // 6
  }
}