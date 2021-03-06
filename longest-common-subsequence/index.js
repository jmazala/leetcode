/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
const longestCommonSubsequence = function (text1, text2) {
  const dp = Array(text1.length + 1)
    .fill(0)
    .map((i) => Array(text2.length + 1).fill(0));

  for (let i = 0; i <= text1.length; i++) {
    for (let j = 0; j <= text2.length; j++) {
      if (i === 0 || j === 0) {
        dp[i][j] = 0;
        continue;
      }

      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[text1.length][text2.length];
};

console.log(longestCommonSubsequence('abcde', 'ace')); // 3
console.log(longestCommonSubsequence('abc', 'abc')); // 3
console.log(longestCommonSubsequence('abc', 'def')); // 0
console.log(longestCommonSubsequence('abcdebdde', 'bde'));
