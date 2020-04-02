/**
 * @param {number[]} heights
 * @return {number}
 */
var maxArea = function (heights) {
  let maxArea = 0;

  let low = 0;
  let high = heights.length - 1;

  while (low < high) {
    const height = Math.min(heights[low], heights[high]);
    maxArea = Math.max(maxArea, (high - low) * height);

    if (heights[low] < heights[high]) {
      low++;
    } else {
      high--;
    }
  }

  return maxArea;
};

// console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));
// console.log(maxArea([1, 2, 4, 3]));
// console.log(maxArea([6,4,3,1,4,6,99,62,1,2,6]));
console.log(maxArea([9,6,14,11,2,2,4,9,3,8]));