const { swap, reverseArray } = require('../js-includes');

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (nums) {

  //find the first non-decreasing element
  let i = nums.length - 2;
  while (i >= 0 && nums[i + 1] <= nums[i]) {
    i--;
  }

  if (i >= 0) {
    let j = nums.length - 1;
    while (j >= 0 && nums[j] <= nums[i]) {
      j--;
    }

    swap(nums, i, j);
  }

  reverseArray(nums, i + 1, nums.length - 1);
};

const nums = [3, 2, 1];
nextPermutation(nums);
console.log(JSON.stringify(nums)); //[1,2,3]

const nums2 = [1, 5, 8, 4, 7, 6, 5, 3, 1];
nextPermutation(nums2);
console.log(JSON.stringify(nums2)); //[1,5,8,5,1,3,4,6,7]
