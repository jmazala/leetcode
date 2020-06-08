/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function (amount, coins) {
  //dp[i] = # combinations to get to i
  const dp = Array(amount + 1).fill(0);
  dp[0] = 1; //1 combination to get 0 coins... it's a combination of 0

  for (const coin of coins) {
    for (let i = coin; i <= amount; i++) {
      dp[i] += dp[i - coin];
    }
  }

  return dp[amount]
};

console.log(change(3, [2])); // 0
console.log(change(5, [1, 2, 3])); // 5
console.log(change(5, [1, 2, 5])); // 4