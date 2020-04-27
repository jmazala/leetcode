/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  const dp = Array(nums.length).fill(false);
  dp[0] = true;

  for (let i = 0; i < nums.length; i++) {
    if (!dp[i]) {
      continue;
    }

    for (let j = 0; j <= nums[i]; j++) {
      dp[i + j] = true;
    }

    if (dp[nums.length - 1]) {
      return true;
    }
  }

  return dp[nums.length - 1];
};

console.log(canJump([0])); //true
console.log(canJump([2, 3, 1, 1, 4])); //true
console.log(canJump([3, 2, 1, 0, 4])); //false