import java.util.Arrays;

class Solution {
  public static int[] productExceptSelf(int[] nums) {
    int[] answer = new int[nums.length];
    int[] left = new int[nums.length];
    int[] right = new int[nums.length];

    //product of everything to the left of index 0 is 1
    //as in it doesn't affect.
    left[0] = 1;

    //same with right
    right[nums.length - 1] = 1;

    // fill product to the left array
    for (int i = 1; i < nums.length; i++) {
      left[i] = left[i - 1] * nums[i - 1];
    }

    // fill product to the right array
    for (int i = nums.length - 2; i >= 0; i--) {
      right[i] = right[i + 1] * nums[i + 1];
    }

    //product at index i is product of everything else
    //i.e. product to the left * product to the right
    for (int i = 0; i < nums.length; i++) {
      answer[i] = left[i] * right[i];
    }

    return answer;
  }

  public static void main(String[] args) {
    System.out.println(Arrays.toString(Solution.productExceptSelf(new int[] { 1, 2, 3, 4 }))); // [24, 12, 8, 6]
  }
}