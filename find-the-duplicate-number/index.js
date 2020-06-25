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

  // fast pointer is going 2 steps
  // slow pointer is going 1 step

  // fast pointer is going to hit the cycle faster than the slow pointer
  // once the fast pointer is in the cycle,
  while (tortoise !== hare) {
    tortoise = nums[tortoise];
    hare = nums[nums[hare]];
  }

  // reset the slow pointer to the beginning of the list
  tortoise = 0;

  // hare is where that cycle spot was
  // since the hare took 2x to reach the cycle spot
  // the tortoise reset to
  // and hare now going at the same speed
  // they'll meet in the middle
  while (tortoise !== hare) {
    tortoise = nums[tortoise];
    hare = nums[hare];
  }

  return tortoise;
};

console.log(findDuplicate([1, 3, 4, 2, 2])); // 2
console.log(findDuplicate([3, 1, 3, 4, 2])); // 3
