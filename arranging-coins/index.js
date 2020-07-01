/**
 * @param {number} n
 * @return {number}
 */

// WITH BINARY SEARCH
/*
Assume that the answer is k,
i.e. we've managed to complete k rows of coins.
These completed rows contain in total 1 + 2 + ... + k = (k(k+1)) / 2

So this is find max k such that (k(k+1))/2 = n
this is a search problem

*/
const arrangeCoins = function (n) {
  let left = 0;
  let right = n;
  let current;

  while (left <= right) {
    const k = left + Math.floor((right - left) / 2);
    current = Math.floor((k * (k + 1)) / 2);
    if (current === n) {
      return k;
    }

    if (current > n) {
      // too big
      right = k - 1;
    } else {
      left = k + 1; // too small
    }
  }

  return right;
};

// NAIVE SOLUTION
// const arrangeCoins = function (n) {
//   // n = 8
//   let numCoinsPerStep = 1; // 1
//   let numSteps = 0; // 0

//   while (n >= numCoinsPerStep) {
//     // 5 > 3
//     n -= numCoinsPerStep; // 2
//     numSteps++; // 3
//     numCoinsPerStep++; // 4
//   }

//   return numSteps;
// };

console.log(arrangeCoins(10001)); // 140
