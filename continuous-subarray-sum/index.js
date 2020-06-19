/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */

// using a
const checkSubarraySum = function (nums, k) {
  if (nums.length < 2) {
    return false;
  }

  let sum = 0;
  const hash = { 0: -1 };

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    if (k) {
      sum %= k;
    }

    if (sum in hash) {
      if (i - hash[sum] > 1) {
        return true;
      }
    } else {
      hash[sum] = i;
    }
  }

  return false;
};

console.log(checkSubarraySum([1, 2, 12], 6)); // false
console.log(checkSubarraySum([23, 2, 6, 4, 10], 11)); // false
console.log(checkSubarraySum([5, 0, 0], 0)); // true
console.log(checkSubarraySum([0, 0], 0)); // true
console.log(checkSubarraySum([23, 2, 6, 4, 9], 3)); // true
console.log(checkSubarraySum([23, 2, 6, 4, 7], 3)); // true
console.log(checkSubarraySum([23, 2, 6, 4, 7], 4)); // true
console.log(checkSubarraySum([23, 2, 6, 4, 7], 5)); // true
console.log(checkSubarraySum([23, 2, 4, 6, 7], 6)); // true
console.log(checkSubarraySum([23, 2, 6, 4, 7], 6)); // true
