/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const search = function (nums, target) {
  let low = 0;
  let high = nums.length - 1;

  while (low <= high) {
    if (nums[low] === target) {
      return low;
    }

    if (nums[high] === target) {
      return high;
    }

    const mid = Math.floor((high + low) / 2);
    if (nums[mid] === target) {
      return mid;
    }

    // left half is sorted
    if (nums[low] < nums[mid]) {
      // target is in between (left half)
      if (nums[low] < target && nums[mid] > target) {
        high = mid - 1;
      } else {
        // target is outside (right half)
        low = mid + 1;
      }

      continue;
    }

    // right half is sorted
    // target is in between (right half)
    if (nums[mid] < target && nums[high] > target) {
      low = mid + 1;
      continue;
    }

    // target is outside (left half)
    high = mid - 1;
  }

  return -1;
};
