const _ = require('lodash');

// this problem is about dividing the groups of stones into 2 groups
// try to get the groups as close to half the weight as possible each
// it's like a knapsack problem and DP can be used
// try each subarray of items, try each weight up to half weight
// you can sort the stones + use a dp array of booleans and keep track of the max weight seen
// or you can use a dp array of numbers and store the max weights per combination in there

/**
 * @param {number[]} stones
 * @return {number}
 */
// BOOLEAN SOLUTION
// const lastStoneWeightII = function (stones) {
//   // what we really want to do is divide these sets into 2 subsets
//   // where the difference in the subsets is minimal

//   if (stones.length === 1) {
//     return stones[0];
//   }

//   stones.sort((a, b) => a - b);

//   const sum = _.sum(stones);
//   const halfSum = Math.floor(sum / 2); // one group can have this max weight

//   const dp = Array(sum)
//     .fill()
//     .map(() => Array(stones.length + 1).fill(false));

//   // dp[i][j] = whether you can achieve sum i with a sub array up to index j
//   for (let j = 0; j <= stones.length; j++) {
//     dp[0][j] = true; // any sub array up to index j can have a sum of 0
//   }

//   let maxWeight = 0;

//   for (let i = 1; i <= halfSum; i++) {
//     // i is current weight
//     for (let j = 1; j <= stones.length; j++) {
//       // j is length of subarray
//       const currentStone = stones[j - 1];
//       // if we could achieve a sum of i with sub array up to j
//       // we can also achieve it for sub array with j+1 members
//       dp[i][j] = dp[i][j - 1];
//       if (i >= stones[j - 1]) {
//         const remainder = i - currentStone;
//         dp[i][j] = dp[i][j] || dp[remainder][j - 1];

//         if (dp[i][j]) {
//           // this is the highest weight for a set we can achieve

//           maxWeight = i;
//         }
//       }
//     }
//   }

//   return sum - 2 * maxWeight;
// };

/*
  Say you have three stones a,b,c.
  first you smash b against c, you get (b-c)
  now you smash (b-c) against a
  you get a-(b-c) which is same as (a+c)-(b)
  Basically for the given stones we can create two sets,the sum of second set of stones to be subtracted from sum of first one.
  ideally we want sum of each set to be sum(stones)/2 so that they cancel each other out.

  So to solve the problem we try to select a set of stones such that their sum comes as close as possible to sum(stones)/2 from the lower side.
  Clearly this subproblem is analogous to the knapsack problem.

  Since we went from the lower side we have created the second set, that is the set to be subtracted. The first set then becomes sum-dp[n][sum/2].
  Therefore the answer becomes sum-2*(dp[n][sum/2])

  Choose any number of stones to make their sum as close to (sum of all stones)/2 as possible
  which is a typical 0-1 knapsack problem.
*/
const lastStoneWeightII = function (stones) {
  const sum = _.sum(stones);
  const n = stones.length;
  const halfSum = Math.floor(sum / 2);

  // what we really want to do is divide these sets into 2 subsets
  // where the difference in the subsets is minimal
  const dp = Array(n + 1)
    .fill()
    .map(() => Array(halfSum + 1).fill(0));

  // try each stone including no stones which was done above
  for (let i = 1; i <= n; i++) {
    const currentStone = stones[i - 1];

    // j is the weight we want to attempt all the way up to max weight
    for (let j = 1; j <= halfSum; j++) {
      if (currentStone > j) {
        dp[i][j] = dp[i - 1][j];
        continue;
      }

      const remainder = j - currentStone;
      // otherwise knapsack:  the highest weight we can get
      // with including this stone is going to be
      // either up to the index before (dp[i-1][j])
      // or the max weight of the knapsack excluding this stone + this stone
      dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][remainder] + currentStone);
    }
  }

  return sum - 2 * dp[n][halfSum];
};

/*
  Say we have 3 stones A, B, C:
  we have:

  A-(B-C)
  A-(C-B)
  (B-C)-A
  (C-B)-A

  B-(A-C)
  B-(C-A)
  (A-C)-B
  (C-A)-B

  C-(A-B)
  C-(B-A)
  (A-B)-C
  (B-A)-C

  totally 12 combinations.

  But the number of possible different ones is only 2 * 2 * 2 = 8, because the sign of A, B, C can only be '+' or '-', and of course we don't consider A + B + C or -A - B - C, so the number is 6.

  Thus the problem becomes:

  Choose any number of stones to subtract the remaining stones to get the smallest weight,
  and this equals to:

  Choose any number of stones to make their sum as close to (sum of all stones)/2 as possible
  which is a typical 0-1 knapsack problem.
*/

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
