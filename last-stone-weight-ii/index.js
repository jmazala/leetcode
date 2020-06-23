const _ = require('lodash');

/**
 * @param {number[]} stones
 * @return {number}
 */
// const lastStoneWeightII = function (stones) {
//   stones.sort((a, b) => a - b);
//   const sum = _.sum(stones);

//   // what we really want to do is divide these sets into 2 subsets
//   // where the difference in the subsets is minimal

//   const dp = Array(sum)
//     .fill()
//     .map(() => Array(stones.length + 1).fill(false));

//   for (let i = 0; i <= stones.length; i++) {
//     dp[0][i] = true;
//   }

//   let max = 0;
//   for (let i = 1; i <= Math.floor(sum / 2); i++) {
//     for (let j = 1; j <= stones.length; j++) {
//       dp[i][j] = dp[i][j - 1];
//       if (i >= stones[j - 1]) {
//         dp[i][j] = dp[i - stones[j - 1]][j - 1] || dp[i][j - 1];
//         if (dp[i][j]) {
//           max = Math.max(i, max);
//         }
//       }
//     }
//   }

//   return sum - 2 * max;
// };

const lastStoneWeightII = function (stones) {
  const total = _.sum(stones);
  const n = stones.length;
  const sum = Math.floor(total / 2);

  // what we really want to do is divide these sets into 2 subsets
  // where the difference in the subsets is minimal
  const dp = Array(n + 1)
    .fill()
    .map(() => Array(sum + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    const currentStone = stones[i - 1];

    for (let j = 1; j <= sum; j++) {
      if (currentStone > j) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = Math.max(
          dp[i - 1][j],
          dp[i - 1][j - currentStone] + currentStone
        );
      }
    }
  }

  return total - 2 * dp[n][sum];
};

console.log(lastStoneWeightII([2, 7, 4, 1, 8, 1])); // 1

// smash 8 and 7 [1,2,4,1,1]
// smash 4 and 2 [2,1,1,1]
// smash 2 and 1 [1,1,1]
// smash 1 and 1

console.log(lastStoneWeightII([31, 26, 33, 21, 40])); // 5
// smash 40 and 33 [7, 31, 26, 21]
// smash 31 and 26 [5, 7, 21]
// smash 21 and 7 [14, 5]
// smash 14 and 5 [9]
