/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const searchInsert = function (nums, target) {
  if (target < nums[0]) {
    return 0;
  }

  if (target > nums[nums.length - 1]) {
    return nums.length;
  }

  // binary search for the number and keep updating our search index as we get closer
  let low = 0;
  let high = nums.length - 1;
  let answer;

  while (low <= high) {
    const mid = Math.floor(low + (high - low) / 2);
    if (nums[mid] === target) {
      return mid;
    }

    // if the number at mid is too low, our best guess at search position
    // is just 1 past where we're looking
    if (nums[mid] < target) {
      answer = mid + 1;
      low = mid + 1;
    } else {
      // if the number at mid is too high, we'd want to insert it right there
      // i.e mid
      answer = mid;
      high = mid - 1;
    }
  }

  return answer;
};

console.log(searchInsert([1, 3, 5, 6], 0)); // 1
console.log(searchInsert([1, 3, 5, 6], 2)); // 1
console.log(searchInsert([1, 3, 5, 6], 5)); // 2
console.log(searchInsert([1, 3, 5, 6], 7)); // 4
console.log(searchInsert([1, 3, 5, 6, 9], 1)); // 0
console.log(searchInsert([1, 3, 5, 6, 9], 2)); // 1
console.log(searchInsert([1, 3, 5, 6, 9], 3)); // 1
console.log(searchInsert([1, 3, 5, 6, 9], 4)); // 2
