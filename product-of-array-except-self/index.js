/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  const answer = Array(nums.length).fill(1);
  const left = Array(nums.length).fill(1);
  const right = Array(nums.length).fill(1);

  //answer[0] = nums[1] * nums[2] * nums[3]
  //answer[1] = nums[0] * nums[2] * nums[3]
  //answer[2] = nums[0] * nums[1] * nums[3]
  //answer[3] = nums[0] * nums[1] * nums[2]

  for (let i = 1; i < nums.length; i++) {
    left[i] = left[i - 1] * nums[i - 1];
  }

  for (let i = nums.length - 2; i >= 0; i--) {
    right[i] = right[i + 1] * nums[i + 1];
  }

  for (let i = 0; i < nums.length; i++) {
    answer[i] = left[i] * right[i];
  }

  return answer;
};

console.log(productExceptSelf([1, 2, 3, 4]));
console.log(productExceptSelf([4, 5, 1, 8, 2]));