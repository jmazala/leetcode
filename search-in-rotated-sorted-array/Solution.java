class Solution {
  public int search(int[] nums, int target) {
    if (nums.length == 0) {
      return -1;
    }

    if (nums.length == 1) {
      return nums[0] == target ? 0 : -1;
    }

    int low = 0;
    int high = nums.length - 1;

    while (low <= high) {
      if (nums[low] == target) {
        return low;
      }

      if (nums[high] == target) {
        return high;
      }

      int mid = low + (high - low) / 2;

      if (nums[mid] == target) {
        return mid;
      }

      // left half is sorted
      if (nums[low] < nums[mid]) {
        if (nums[mid] > target && nums[low] < target) {
          high = mid - 1;
        } else {
          low = mid + 1;
        }

        continue;
      }

      // otherwise, right half is sorted
      if (nums[mid] < target && nums[high] > target) {
        low = mid + 1;
        continue;
      }

      high = mid - 1;
    }

    return -1;
  }
}