class Solution {
  public int singleNonDuplicate(int[] nums) {
    if (nums.length == 1) {
      return nums[0];
    }

    int low = 0;
    int high = nums.length - 1;

    while (low < high) {
      int mid = low + (high - low) / 2;

      if (nums[mid - 1] == nums[mid]) {
        if (mid % 2 == 0) {
          high = mid - 2;
        } else {
          low = mid + 1;
        }
      } else if (nums[mid + 1] == nums[mid]) {
        if (mid % 2 == 0) {
          low = mid + 2;
        } else {
          high = mid - 1;
        }
      }
    }
    
    return nums[low];
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    System.out.println(s.singleNonDuplicate(new int[] { 1, 1, 2, 3, 3, 4, 4, 8, 8 })); // 2
    System.out.println(s.singleNonDuplicate(new int[] { 3, 3, 7, 7, 10, 11, 11 })); // 10
    System.out.println(s.singleNonDuplicate(new int[] { 1 })); // 1
    System.out.println(s.singleNonDuplicate(new int[] { 1, 1, 2 })); // 2
    System.out.println(s.singleNonDuplicate(new int[] { 1, 2, 2 })); // 1
  }
}