/**
 * @param {number[]} height
 * @return {number}
 */
// 2 PASSES, LEFT & RIGHT
const trap = function (heights) {
  // the water height will be the lower of leftMax and rightMax
  const waterHeights = Array(heights.length);
  let leftMax = 0;

  for (let i = 0; i < heights.length; i++) {
    leftMax = Math.max(leftMax, heights[i]);
    waterHeights[i] = leftMax;
  }

  let rightMax = 0;
  for (let i = heights.length - 1; i >= 0; i--) {
    rightMax = Math.max(rightMax, heights[i]);
    waterHeights[i] = Math.min(waterHeights[i], rightMax);
  }

  let answer = 0;
  for (let i = 0; i < heights.length; i++) {
    answer += waterHeights[i] - heights[i];
  }

  return answer;
};

// 2 PASSES, LEFT & RIGHT (OPTIMIZED)
// const trap = function (heights) {
//   const maxHeights = Array(heights.length);
//   let leftMax = 0;

//   for (let i = 0; i < heights.length; i++) {
//     maxHeights[i] = leftMax;
//     leftMax = Math.max(leftMax, heights[i]);
//   }

//   let rightMax = 0;
//   let answer = 0;
//   for (let i = heights.length - 1; i >= 0; i--) {
//     const height = heights[i];
//     const minHeight = Math.min(maxHeights[i], rightMax);

//     if (height < minHeight) {
//       maxHeights[i] = minHeight - height;
//     } else {
//       maxHeights[i] = 0;
//     }

//     answer += maxHeights[i];
//     rightMax = Math.max(rightMax, height);
//   }

//   return answer;
// };

// WITH 2 POINTERS
// const trap = function (height) {
//   let left = 0;
//   let right = height.length - 1;
//   let leftMax = height[0];
//   let rightMax = height[height.length - 1];
//   let answer = 0;

//   while (left <= right) {
//     leftMax = Math.max(leftMax, height[left]);
//     rightMax = Math.max(rightMax, height[right]);
//     answer += leftMax - height[left];
//     answer += rightMax - height[right];

//     if (height[left] <= height[right]) {
//       left++;
//     } else {
//       right--;
//     }
//   }
//   return answer;
// };

console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])); // 6
