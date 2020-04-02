/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function (nums) {
  //can do linear scan but they want logarithmic
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor(left + (right - left) / 2);

    if (nums[mid] < nums[mid + 1]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
};