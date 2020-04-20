/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  //binary search for where the break is.  designated by
  //the index where the item to its left is bigger

  let high = nums.length - 1;
  let low = 0;

  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (nums[mid] > nums[high]) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  //low == high is the index of the smallest value and also places rotated
  const pivot = low;
  low = 0;
  high = nums.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const realMid = (mid + pivot) % nums.length;
    if (nums[realMid] === target) {
      return realMid;
    }

    if (nums[realMid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return -1;
};

console.log(search([4, 5, 6, 7, 0, 1, 2], 0)); //4
console.log(search([4, 5, 6, 7, 0, 1, 2], 3)); //-1