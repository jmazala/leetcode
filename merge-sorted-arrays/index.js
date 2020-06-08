const merge = function (nums1, m, nums2, n) {
  let p1 = m - 1;
  let p2 = n - 1;
  let p = m + n - 1;

  while (p1 >= 0 && p2 >= 0) {
    // compare 2 elements from p1 and p2
    // take the largest and store it in p
    if (nums1[p1] > nums2[p2]) {
      nums1[p] = nums1[p1];
      p1--;
    } else {
      nums1[p] = nums2[p2];
      p2--;
    }

    p--;
  }

  // there might still be elements left
  while (p1 >= 0) {
    nums1[p--] = nums1[p1--];
  }

  while (p2 >= 0) {
    nums1[p--] = nums2[p2--];
  }
};

const arr1 = [1, 2, 3, 0, 0, 0];
const arr2 = [2, 5, 6];
merge(arr1, 3, arr2, 3);
console.log(JSON.stringify(arr1)); // [1,2,2,3,5,6]

const arr3 = [1, 3, 5, 0, 0, 0];
const arr4 = [2, 4, 6];
merge(arr3, 3, arr4, 3);
console.log(JSON.stringify(arr3)); // [1,2,3,4,5,6]
