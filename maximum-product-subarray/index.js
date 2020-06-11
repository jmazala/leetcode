/**
 * @param {number[]} nums
 * @return {number}
 */
const maxProduct = function (nums) {
  if (!nums.length) {
    return 0;
  }

  let max = nums[0];
  let min = nums[0];
  let answer = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === 0) {
      max = 0;
      min = 0;
    } else {
      const temp = max;
      max = Math.max(max * nums[i], min * nums[i], nums[i]);
      min = Math.min(temp * nums[i], min * nums[i], nums[i]);
    }

    answer = Math.max(max, answer);
  }

  return answer;
};

console.log(maxProduct([-100, 2, 5, -55, 0, 100, -99, 2, 55, -2, 0, 999, 4])); // 2178000
