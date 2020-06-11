/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const sortColors = function (nums) {
  if (nums.length < 2) {
    return nums;
  }

  let left = 0;
  let right = nums.length - 1;
  let current = 0;

  // we can visualize the output array in 3 parts.  RED | WHITE | BLUE
  // where red is 0...n '0', white is 0..n '1', blue is 0..n. '2'
  while (current <= right) {
    const value = nums[current];

    if (value === 0) {
      swap(current, left);
      left++;
      current++;
      continue;
    }

    if (value === 2) {
      swap(current, right);
      right--;
      continue;
    }

    current++;
  }

  function swap(i, j) {
    const temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
  }
};

const arr = [2, 0, 2, 1, 1, 0];
sortColors(arr);
console.log(JSON.stringify(arr)); // [0,0,1,1,2,2]
