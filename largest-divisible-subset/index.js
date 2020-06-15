/**
 * @param {number[]} nums
 * @return {number[]}
 */
const largestDivisibleSubset = function (nums) {
  if (nums.length < 2) {
    return nums;
  }

  nums.sort((a, b) => a - b);
  const dp = Array(nums.length);
  let answer = [];

  for (let i = 0; i < nums.length; i++) {
    let currentSubset = [];

    for (let j = 0; j < i; j++) {
      if (nums[i] % nums[j] === 0) {
        if (dp[j].length > currentSubset.length) {
          currentSubset = Array.from(dp[j]);
        }
      }
    }

    currentSubset.push(nums[i]);
    dp[i] = currentSubset;
    if (dp[i].length > answer.length) {
      answer = dp[i];
    }
  }

  return answer;
};

console.log(JSON.stringify(largestDivisibleSubset([1, 2, 3]))); // [1, 2]
console.log(JSON.stringify(largestDivisibleSubset([1, 2, 4, 8]))); // [1, 2, 4, 8]
