/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// USING FOR LOOPS
// const subsets = function (nums) {
//   const output = [[]];

//   for (const num of nums) {
//     // establish the foreach loop based on output's starting state
//     // not using a for loop
//     output.forEach((curr) => {
//       output.push(curr.concat([num]));
//     });
//   }

//   return output;
// };

// WITH BACKTRACKING
const subsets = function (nums) {
  const output = [];
  let k = 0;
  const n = nums.length;
  for (; k <= n; k++) {
    helper();
  }

  return output;

  function helper(first = 0, curr = []) {
    if (curr.length === k) {
      output.push(Array.from(curr));
    }

    for (let i = first; i < n; i++) {
      curr.push(nums[i]);
      helper(i + 1, curr);
      curr.pop();
    }
  }
};

// WITH BITMASK
// const subsets = (nums) => {
//   /*
//    * the idea is that we map each subset to a bitmask of length n
//    * where 1 on ith position in bitmask means presence of nums[i]
//    * look at the powerset of [0, 1, 2]:
//    * 000 []
//    * 001 [0]
//    * 010 [1]
//    * 011 [1, 0]
//    * 100 [2]
//    * 101 [2, 0]
//    * 110 [2, 1]
//    * 111 [0, 1, 2]
//    */

//   // need an binary integer with nums.length bits
//   const answer = [];
//   let repetitions = 2 ** nums.length - 1;

//   while (repetitions >= 0) {
//     const subAnswer = [];
//     // make a bitmask
//     const bitmask = repetitions.toString('2').padStart(nums.length, '0');
//     // console.log(bitmask);
//     for (let i = 0; i < bitmask.length; i++) {
//       if (bitmask[i] === '1') {
//         subAnswer.push(nums[i]);
//       }
//     }

//     answer.push(subAnswer);
//     repetitions--;
//   }

//   return answer;
// };

console.log(JSON.stringify(subsets([1, 2, 3])));
