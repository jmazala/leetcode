//https://leetcode.com/problems/unique-paths/submissions/
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
  //we want to know how many unique paths from the top left corner to bottom right corner of a grid
  //this really boils down to how many ways to reach any cell
  //this seems like a dynamic programming problem to me
  
  const dp = Array(m).fill().map(i => Array(n));
  
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      //if we're on the edge there's only 1 way.
      //straight line right or straight line down
      if (i === 0 || j === 0) {
        dp[i][j] = 1;
        continue;
      }
      
      dp[i][j] = dp[i-1][j] + dp[i][j-1];
    }
  }
  
  return dp[m-1][n-1];
};