// can't modify the array so no in place sort
// constant O(1) extra space so no hash or set
// better than O(n^2) so can't compare every number to every other number
// we do have all integers 1 + n with 1 repeated

/**
 * @param {number[]} nums
 * @return {number}
 */
const findDuplicate = function (nums) {
  let tortoise = nums[0];
  let hare = nums[nums[0]];

  while (tortoise !== hare) {
    tortoise = nums[tortoise];
    hare = nums[nums[hare]];
  }

  tortoise = 0;

  while (tortoise !== hare) {
    tortoise = nums[tortoise];
    hare = nums[hare];
  }

  return tortoise;
};

console.log(findDuplicate([1, 3, 4, 2, 2])); // 2
console.log(findDuplicate([3, 1, 3, 4, 2])); // 3
