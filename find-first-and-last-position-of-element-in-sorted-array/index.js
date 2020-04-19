/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  const answer = [-1, -1];
  const left = indexSearch(nums, target, true);

  if (left === nums.length || nums[left] !== target) {
    return answer;
  }

  const right = indexSearch(nums, target, false) - 1;

  return [left, right];
};

//goLeft modifies binary search algorithm
//since we want the lowest index of target and it appears multiple times
function indexSearch(nums, target, goLeft) {
  let low = 0;
  let high = nums.length;

  //binary search for the number
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (nums[mid] > target || (goLeft && nums[mid] === target)) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }

  return low;
}

console.log(searchRange([5, 7, 7, 8, 8, 10], 8)); //[3, 4]
console.log(searchRange([5, 7, 7, 8, 8, 10], 6)); //[-1, -1]