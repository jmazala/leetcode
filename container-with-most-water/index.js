/**
 * @param {number[]} heights
 * @return {number}
 */
const maxArea = function (heights) {
  if (heights.length < 2) {
    return 0;
  }

  if (heights.length === 2) {
    return Math.min(heights[0], heights[1]);
  }

  let area = 0;
  let low = 0;
  let high = heights.length - 1;

  while (low < high) {
    const height = Math.min(heights[low], heights[high]);
    area = Math.max(area, (high - low) * height);

    if (heights[low] < heights[high]) {
      low++;
    } else {
      high--;
    }
  }

  return area;
};

console.log(maxArea([1, 2, 1])); // 2
console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // 49
