// https://leetcode.com/problems/median-of-two-sorted-arrays

public class MedianOfTwoSortedArrays {
  public static double findMedianSortedArrays(int[] nums1, int[] nums2) {
    if (nums1.length > nums2.length) {
      return findMedianSortedArrays(nums2, nums1);
    }

    /*
     * We want to find a point of partition in both arrays such that
     * the maximum of the smaller half is <= minimum of the larger half.
     * But only focus on partitioning the smaller array (nums1).
     */

    /*
     * If partition index is pA, smaller half contains (m + n + 1) / 2 elements
     * Can directly make pB equal to (m + n + 1) / 2 - pA
     * Thus smaller halves of both arrays always contain a total of (m + n + 1) / 2
     * elements
     */

    /*
     * if (maxLeftA <= minRightB) && (maxLeftB <= minRightA), we partitioned
     * correctly
     * 
     * if (maxLeftA > minRightB), maxLeftA is too large to be in the lesser half.
     * We need a smaller partition index for A
     * 
     * if (maxLeftB < minRightA), maxRightA is too large to be in the lesser half.
     * we need a smaller partition index for B
     */

    int m = nums1.length;
    int n = nums2.length;
    int low = 0;
    int high = m;

    while (low <= high) {
      final int partitionA = (low + high) / 2;
      final int partitionB = (m + n + 1) / 2 - partitionA;

      final int maxLeftA = partitionA > 0 ? nums1[partitionA - 1] : Integer.MIN_VALUE;
      final int minRightA = partitionA == m ? Integer.MAX_VALUE : nums1[partitionA];

      final int maxLeftB = partitionB > 0 ? nums2[partitionB - 1] : Integer.MIN_VALUE;
      final int minRightB = partitionB == n ? Integer.MAX_VALUE : nums2[partitionB];

      // partitioned correctly
      if (maxLeftA <= minRightB && maxLeftB <= minRightA) {
        // Even # of elements total. average 2 middle
        if ((m + n) % 2 == 0) {
          return (1.0 * Math.min(minRightA, minRightB) + 1.0 * Math.max(maxLeftA, maxLeftB)) / 2;
        }

        // Odd # of elements. The extra will be on the left
        return Math.max(maxLeftA, maxLeftB);
      }

      // Partition A is too far right
      if (maxLeftA > minRightB) {
        high = partitionA - 1;
      } else {
        low = partitionA + 1;
      }
    }

    return -1; // won't happen
  }

  public static void main(String[] args) {
    int[] nums1 = new int[] { 1, 5, 76, 82, 105, 300 };
    int[] nums2 = new int[] { -8, 17, 65, 205, 405, 900, 2164 };
    System.out.println(findMedianSortedArrays(nums1, nums2)); // 82
  }
}
