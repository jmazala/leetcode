/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
  //we want nums1 to be smaller of 2 arrays
  //just because
  if (nums1.length > nums2.length) {
    return findMedianSortedArrays(nums2, nums1);
  }

  let x = nums1.length;
  let y = nums2.length;

  //binary search the smaller array for a partition point
  let low = 0;
  let high = x;

  while (low <= high) {
    const partitionX = Math.floor((low + high) / 2);
    const partitionY = Math.floor((x + y + 1) / 2) - partitionX;

    //if partitionX is 0 that means there's nothing on the left.  use -INF
    //if partitionX is the length of nums1 there's nothing on teh right.  use +INF
    const maxLeftX = partitionX === 0 ? -Infinity : nums1[partitionX - 1];
    const minRightX = partitionX === x ? Infinity : nums1[partitionX];

    const maxLeftY = partitionY === 0 ? -Infinity : nums2[partitionY - 1];
    const minRightY = partitionY === y ? Infinity : nums2[partitionY];

    //correct partitioning.
    if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
      //even elements.  average the 2
      if ((x + y) % 2 === 0) {
        return (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2;
      }

      //odd elements.  we'll have 1 extra on the left
      return Math.max(maxLeftX, maxLeftY);
    }

    //our partition is too far to the right.  go left
    if (maxLeftX > minRightY) {
      high = partitionX - 1;
    } else {
      low = partitionX + 1;
    }
  }
};