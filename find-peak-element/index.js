/**
 * @param {number[]} nums
 * @return {number}
 */
const findPeakElement = function (nums) {
  // can do linear scan but they want logarithmic
  let low = 0;
  let high = nums.length - 1;

  while (low < high) {
    const mid = Math.floor(low + (high - low) / 2);

    if (nums[mid] < nums[mid + 1]) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return low;
};
