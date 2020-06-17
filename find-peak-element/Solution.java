class Solution {
  public int findPeakElement(int[] nums) {
    if (nums.length < 2) {
      return nums.length - 1;
    }

    int low = 0;
    int high = nums.length - 1;

    while (low < high) { // if we do <= we'd get into infinite loop on line 17
      int mid = low + (high - low) / 2;

      // increasing to the right
      if (nums[mid] < nums[mid + 1]) {
        low = mid + 1; // mid can't be the peak
      } else {
        high = mid; // mid might be the peak
      }
    }

    return low;
  }
}