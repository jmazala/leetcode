/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  if (nums.length < 2) {
    return nums;
  }

  let slow = 0;
  let fast = 1;

  while (fast < nums.length) {
    if (nums[slow] == 0 && nums[fast] != 0) {
      nums[slow++] = nums[fast];
      nums[fast++] = 0;
      continue;
    }

    if (nums[slow] == 0 && nums[fast] == 0) {
      fast++;
      continue;
    }

    slow++;
    fast++;
  }
};