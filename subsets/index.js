/**
 * @param {number[]} nums
 * @return {number[][]}
 */
//with loops
// var subsets = function(nums) {
//   const output = [[]];

//   nums.forEach(num => {
//     output.forEach(curr => {
//       output.push(curr.concat([num]));
//     });
//   });

//   console.log(output);
// };

//WITH BACKTRACKING
// var subsets = function(nums) {
//   function backtrack (first=0, curr=[]) {
//     if (curr.length === k) {
//       output.push(Array.from(curr));
//     }

//     for (let i = first; i < n; i++) {
//       curr.push(nums[i]);
//       backtrack(i + 1, curr);
//       curr.pop();
//     }
//   };
  
//   const output = [];
//   let k = 0;
//   const n = nums.length;
//   for (; k <= n; k++) {
//     backtrack();
//   }
  
//   return output;
// };

//with a bitmask
const subsets = (nums) => {
  //the idea is that we map each subset to a bitmask of length n
  //where 1 on ith position in bitmask means presence of nums[i]
  //0 means absence
  
  //need an binary integer with nums.length bits
  const answer = [];
  // let repetitions = parseInt(Array(nums.length).fill('1').join(''), 2);
  let repetitions = Math.pow(2, nums.length) - 1;
  while (repetitions >= 0) {
    const subAnswer = [];
    //make a bitmask
    const bitmask = repetitions.toString('2').padStart(nums.length, '0');
    console.log(bitmask);
    for (let i = 0; i < bitmask.length; i++) {
      if (bitmask[i] === '1') {
        subAnswer.push(nums[i]);
      }
    }

    answer.push(subAnswer);
    repetitions--;
  }

  return answer;
};

console.log(subsets([1,2,3]));