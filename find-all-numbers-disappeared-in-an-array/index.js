/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    const value = Math.abs(nums[i]);
    const index = value - 1;
    if (nums[index] < 0) {
      continue;
    }

    nums[index] *= -1;
  }

  const answer = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) {
      answer.push(i + 1);
    }
  }

  return answer;
};

console.log(findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1]));