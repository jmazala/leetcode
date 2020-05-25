class Solution {
  public static int minCostClimbingStairs(int[] cost) {
    if (cost.length == 0) {
      return 0;
    }

    if (cost.length == 1) {
      return cost[0];
    }

    if (cost.length == 2) {
      return Math.min(cost[0], cost[1]);
    }

    int[] dp = new int[cost.length];
    dp[0] = cost[0]; // costs cost[0] to step on stair 0
    dp[1] = cost[1];

    for (int i = 2; i < cost.length; i++) {
      dp[i] = Math.min(dp[i - 1], dp[i - 2]) + cost[i];
    }

    return Math.min(dp[cost.length - 1], dp[cost.length - 2]);
  }

  public static void main(String[] args) {
    System.out.println(Solution.minCostClimbingStairs(new int[] { 10, 15, 20 })); // 15
  }
}