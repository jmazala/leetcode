const _ = require('lodash');

/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(heights) {
  const maxHeights = Array(heights.length);
  let leftMax = 0;

  for (let i = 0; i < heights.length; i++) {
    maxHeights[i] = leftMax;
    leftMax = Math.max(leftMax, heights[i]);
  }

  let rightMax = 0;
  for (let i = heights.length - 1; i >= 0; i--) {
    const height = heights[i];
    const minHeight = Math.min(maxHeights[i], rightMax);

    if (height < minHeight) {
      maxHeights[i] = minHeight - height;
    } else {
      maxHeights[i] = 0;
    }

    rightMax = Math.max(rightMax, height);
  }

  return _.sum(maxHeights);
}