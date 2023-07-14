// https://leetcode.com/problems/3sum-closest

import java.util.Arrays;

class ThreeSumClosest {
  /*
   * TIME: O(n^2)
   * O(n log n ) for sorting
   * O(n^2) for loops
   * SPACE: O(1) for minDifference and answer
   */
  public int threeSumClosest(int[] nums, int target) {
    int minDifference = Integer.MAX_VALUE;
    int answer = -1;
    Arrays.sort(nums);

    for (int i = 0; i < nums.length; i++) {
      int j = i + 1;
      int k = nums.length - 1;

      while (j < k) {
        int sum = nums[i] + nums[j] + nums[k];
        if (sum == target) {
          return target;
        }

        int difference = Math.abs(target - sum);

        if (difference < minDifference) {
          minDifference = difference;
          answer = sum;
        }

        if (sum < target) {
          j++;
        } else {
          k--;
        }
      }
    }

    return answer;
  }

  /*
   * TIME: O(n^3)
   * SPACE: O(1)
   */
  // public int threeSumClosest(int[] nums, int target) {
  // int answer = -1;
  // int minDifference = Integer.MAX_VALUE;

  // for (int i = 0; i < nums.length; i++) {
  // for (int j = i + 1; j < nums.length; j++) {
  // for (int k = j + 1; k < nums.length; k++) {
  // int sum = nums[i] + nums[j] + nums[k];
  // int difference = Math.abs(target - sum);
  // if (difference < minDifference) {
  // minDifference = difference;
  // answer = sum;
  // }
  // }
  // }
  // }

  // return answer;
  // }
}