/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number}
 */

//DP
var maxUncrossedLines = function (A, B) {
  const dp = Array(A.length + 1).fill().map(i => Array(B.length + 1).fill(0));

  for (let a = A.length - 1; a >= 0; a--) {
    for (let b = B.length - 1; b >= 0; b--) {
      if (A[a] === B[b]) {
        dp[a][b] = dp[a + 1][b + 1] + 1;
      } else {
        dp[a][b] = Math.max(dp[a + 1][b], dp[a][b + 1]);
      }
    }
  }

  return dp[0][0];
}

//RECURSION WITH MEMOIZATION
// var maxUncrossedLines = function (A, B) {
//   const memo = Array(A.length).fill().map(i => Array(B.length).fill(-1));
//   return helper(0, 0);

//   function helper(a, b) {
//     if (a >= A.length || b >= B.length) {
//       return 0;
//     }

//     if (memo[a][b] > -1) {
//       return memo[a][b];
//     }

//     //draw a line, move on
//     if (A[a] === B[b]) {
//       memo[a][b] = 1 + helper(a + 1, b + 1)
//       return memo[a][b];
//     }

//     //try to increment either a or b at a time
//     memo[a][b] = Math.max(helper(a + 1, b), helper(a, b + 1));
//     return memo[a][b];
//   }
// };

console.log(maxUncrossedLines([1, 4, 2], [1, 2, 4])); //2
console.log(maxUncrossedLines([2, 5, 1, 2, 5], [10, 5, 2, 1, 5, 2])); //3