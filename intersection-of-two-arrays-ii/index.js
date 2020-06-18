/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
const intersect = function (nums1, nums2) {
  const intersection = [];

  // METHOD 1:  sort both, use 2 pointers.
  // less memory than the hash
  // O(n log n) where n is the larger size of nums1, nums2

  /*
  nums1 = nums1.sort((a, b) => a-b); //[1, 1, 2, 2]
  nums2 = nums2.sort((a, b) => a-b); //[2, 2]
  
  let i1 = 0;
  let i2 = 0;
  
  while (i1 < nums1.length && i2 < nums2.length) {
      if (nums1[i1] === nums2[i2]) {
          intersection.push(nums1[i1]);
          i1++;
          i2++;
      } else if (nums1[i1] < nums2[i2]) {
          i1++;
      } else {
          i2++;
      }
  }
  */

  // METHOD 2:  use a hash for the smaller array
  // more memory than with 2 pointers approach
  if (nums1.length > nums2.length) {
    return intersect(nums2, nums1);
  }

  const hash = {};
  for (const n of nums1) {
    hash[n] = hash[n] || 0;
    hash[n]++;
  }

  for (const n of nums2) {
    if (hash[n]) {
      intersection.push(n);
      hash[n]--;
    }
  }

  return intersection;
};

console.log(JSON.stringify(intersect([1, 2, 2, 1], [2, 2, 4]))); // [2,2]
