/**
 * @param {number} n
 * @return {number}
 */
// USING DP
const numTrees = function (n) {
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1; // only 1 way to build a tree with no numbers
  dp[1] = 1; // only 1 way to build a tree with 1 number

  for (let i = 2; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      dp[i] += dp[j - 1] * dp[i - j];
    }
  }

  return dp[n];
};

// USING CATALAN NUMBER
// var numTrees = function(n) {
//   let c = 1;
//   for (let i = 0; i < n; i++) {
//     c = c * 2 * (2 * i + 1) / (i + 2);
//   }

//   return c;
// }

console.log(numTrees(3)); // 5
