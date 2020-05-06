/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  const hash = {};

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    hash[num] = hash[num] || 0;
    hash[num]++;

    if (hash[num] > nums.length / 2) {
      return num;
    }
  }
};