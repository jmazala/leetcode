const _ = require('lodash');

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  const totalSum = _.sum(nums);

  if (nums.length === 1 || (totalSum % 2) === 1) {
    return false;
  }

  const target = totalSum / 2;

  return helper(0, 0, {});

  function helper(currentSum, index, memoization) {
    const key = `${currentSum}, ${index}`;
    if (memoization[key] !== undefined) {
      return memoization[key];
    }

    if (currentSum === target) {
      return true;
    }

    if (currentSum > target || index >= nums.length) {
      return false;
    }

    const result = helper(currentSum + nums[index], index + 1, memoization) || helper(currentSum, index + 1, memoization);
    memoization[key] = result;
    return result;
  }
};



console.log(canPartition([1, 5, 11, 5])); //true
console.log(canPartition([1, 2, 3, 5])); //false