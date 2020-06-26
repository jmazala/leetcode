/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const moveZeroes = function (nums) {
  if (nums.length < 2) {
    return nums;
  }

  let slow = 0;
  let fast = 1;

  while (fast < nums.length) {
    // preserve slow's spot
    if (nums[slow] === 0 && nums[fast] === 0) {
      fast++;
      continue;
    }

    // swap them, move both
    if (nums[slow] === 0 && nums[fast] !== 0) {
      nums[slow] = nums[fast];
      nums[fast] = 0;
      slow++;
      fast++;
      continue;
    }

    // slow isn't 0.  move it
    slow++;

    // even if fast is 0, slow will eventually catch up
    fast++;
  }
};
