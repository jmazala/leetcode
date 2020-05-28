/**
 * @param {number} num
 * @return {number[]}
 */
var countBits = function (num) {
  const dp = Array(num + 1);
  dp[0] = 0;

  let nextPower = 2;
  for (let i = 1; i <= num; i++) {
    //if 2^n = i where n >= 0, only first bit set
    if (i === nextPower) {
      dp[i] = 1;
      nextPower *= 2;
      continue;
    }

    //if odd, 1 + the one before
    if (i % 2 === 1) {
      dp[i] = dp[i - 1] + 1;
      continue;
    }

    dp[i] = 1 + dp[i - nextPower / 2];
  }

  return dp;
};

console.log(countBits(0)); //[0]
console.log(countBits(1)); //[0, 1]
console.log(countBits(17)); //[0,1,1,2,1,2,2,3,1,2,2,3,2,3,3,4,1,2]

//0     0
//1    (1) 1 
//10   (1) 2 (GOOD)
//11    2  3 (GOOD)
//100  (1) 4 (GOOD)
//101   2  5 (GOOD)
//110   2  6
//111   3  7 (GOOD)
//1000 (1) 8 (GOOD)
//1001  2  9 (GOOD)
//1010  2  10 1 + dp[i/2] = 1 + dp[5] = 2
//1011  3  11 (GOOD)
//1100  2  12 1 + dp[i - nextPower/2] = 1 + dp[12 - 8] = 1 + dp[4] = 2
//1101  3  13 (GOOD)
//1110  3  14 1 + dp[i - nextPower/2] = 1 + dp[14 - 8] = 1 + dp[6] = 3
//1111  4  15 (GOOD)
//10000(1) 16 (GOOD)