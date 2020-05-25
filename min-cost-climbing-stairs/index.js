/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function (cost) {
  if (cost.length === 0) {
    return 0;
  }

  if (cost.length === 1) {
    return cost[0];
  }

  if (cost.length === 2) {
    return Math.min(cost[0], cost[1]);
  }

  //cost[i] is the cost of *landing* on stair i
  const dp = Array(cost.length);
  dp[0] = cost[0]; //it costs cost[0] to start on stair 0
  dp[1] = cost[1]; //it costs cost[1] to start on stair 1

  //to get to stair 2 and above, add the cost of stair 2 to 1 below or 2 below, whichever costs less
  for (let i = 2; i < cost.length; i++) {
    //we either had 2 steps ago, or 1 step ago.
    //to get to the ith step
    dp[i] = Math.min(dp[i - 2] + cost[i], dp[i - 1] + cost[i]);
  }

  return Math.min(dp[dp.length - 1], dp[dp.length - 2]);
};