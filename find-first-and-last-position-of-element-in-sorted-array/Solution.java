import java.util.Arrays;

class Solution {
  public static int[] searchRange(int[] nums, int target) {
    int[] answer = { -1, -1 };
    int left = binarySearch(nums, 0, nums.length - 1, target, true);
    if (left == -1) {
      return answer;
    }

    answer[0] = left;

    int right = binarySearch(nums, left, nums.length - 1, target, false);
    answer[1] = right;
    return answer;
  }

  private static int binarySearch(int[] nums, int low, int high, int target, boolean lookLeft) {
    while (low <= high) {
      int mid = low + (high - low) / 2;

      if (nums[mid] == target) {
        if (mid > 0 && lookLeft && nums[mid - 1] == target) {
          high = mid - 1;
          continue;
        }

        if (mid < nums.length - 1 && !lookLeft && nums[mid + 1] == target) {
          low = mid + 1;
          continue;
        }

        return mid;
      }

      if (nums[mid] > target) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }

    return -1;
  }

  public static void main(String[] args) {
    System.out.println(Arrays.toString(Solution.searchRange(new int[] { 5, 7, 7, 8, 8, 10 }, 5))); // {0, 0}
    System.out.println(Arrays.toString(Solution.searchRange(new int[] { 5, 7, 7, 8, 8, 10 }, 7))); // {1, 2}
    System.out.println(Arrays.toString(Solution.searchRange(new int[] { 5, 7, 7, 8, 8, 10 }, 8))); // {3, 4}
    System.out.println(Arrays.toString(Solution.searchRange(new int[] { 5, 7, 7, 8, 8, 10 }, 10))); // {5, 5}
    System.out.println(Arrays.toString(Solution.searchRange(new int[] { 5, 7, 7, 8, 8, 10 }, 99))); // {-1, -1}
  }
}