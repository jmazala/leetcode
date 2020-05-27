/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxLength = function (nums) {
  const counts = Array(nums.length);
  counts[0] = -1;
  let maxLength = 0;
  let count = 0;

  for (let i = 0; i < nums.length; i++) {
    count += (nums[i] === 0 ? -1 : 1);

    //in javascript this somehow works with negative indices.  that's amazing
    if (counts[count] !== undefined) {
      maxLength = Math.max(maxLength, i - counts[count]);
    } else {
      counts[count] = i;
    }
  }

  return maxLength;
}

console.log(findMaxLength([0, 0])); //0
console.log(findMaxLength([0, 1])); //2
console.log(findMaxLength([0, 1, 0])); //2