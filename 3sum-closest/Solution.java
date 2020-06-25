import java.util.Arrays;

class Solution {
  public int threeSumClosest(int[] nums, int target) {
    int minDifference = Integer.MAX_VALUE;
    int size = nums.length;
    Arrays.sort(nums);

    for (int i = 0; i < size && minDifference != 0; i++) {
      int low = i + 1;
      int high = size - 1;

      while (low < high) {
        int sum = nums[i] + nums[low] + nums[high];

        if (Math.abs(target - sum) < Math.abs(minDifference)) {
          minDifference = target - sum;
        }

        if (sum < target) {
          low++;
        } else {
          high--;
        }
      }
    }

    return target - minDifference;
  }
}