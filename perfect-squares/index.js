/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
  const nums = [];
  let i = 1;
  
  while ((i * i) <= n) {
    const square = i * i++;
    if (square === n) {
      return 1;
    }
    
    nums.push(square);
  }

  const dp = Array(n + 1);
  dp[0] = 0;

  for (let i = 1; i <= n; i++) {
    let min = Infinity;
    
    for (const num of nums) {
      if (num > i) {
        break;
      }

      if (num === i) {
        min = 1;
        break;
      }

      const difference = i - num;
      min = Math.min(min, dp[difference] + 1);
    }

    dp[i] = min;
  }

  return dp[n];
};

console.log(numSquares(0)); //0
console.log(numSquares(1)); //0
console.log(numSquares(12)); //3
console.log(numSquares(13)); //2