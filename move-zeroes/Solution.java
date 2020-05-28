import java.util.*;

class Solution {
  public void moveZeroes(int[] nums) {
    if (nums == null || nums.length < 2) {
      return;
    }

    // two pointers.
    int slow = 0;
    int fast = 1;

    while (fast < nums.length) {
      //slow pointer is 0, need to move to end of array once we find a nonzero
      if (nums[slow] == 0)  {
        if (nums[fast] == 0) {
          fast++;
        } else {
          swap(nums, slow, fast);
          slow++;
          fast++;
        }
      } else {
        //fast's element is in place. can move it. further
        slow++;
        fast++;
      }
    }
  }

  private static void swap(int[] nums, int i, int j) {
    int temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    int[] nums = { 0, 1, 0, 3, 12 };

    s.moveZeroes(nums);
    System.out.println(Arrays.toString(nums)); //[1, 3, 12, 0, 0]
    nums = new int[] {0, 1};
    s.moveZeroes(nums);
    System.out.println(Arrays.toString(nums)); //[1, 0]
    nums = new int[] {1, 0};
    s.moveZeroes(nums);
    System.out.println(Arrays.toString(nums)); //[1, 0]

    nums = new int[] {2, 1};
    s.moveZeroes(nums);
    System.out.println(Arrays.toString(nums)); //[2, 1]

    nums = new int[] { 4, 2, 4, 0, 0, 3, 0, 5, 1, 0 };
    s.moveZeroes(nums);
    System.out.println(Arrays.toString(nums)); // [4,3,2,5,1,4,0,0,0,0]
  }
}