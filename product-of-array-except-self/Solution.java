import java.util.Arrays;

class Solution {
  public static int[] productExceptSelf(int[] nums) {
    int[] answer = new int[nums.length];
    int[] left = new int[nums.length];
    int[] right = new int[nums.length];

    Arrays.fill(left, 1);
    Arrays.fill(right, 1);

    // fill left
    // left = [1, 1, 2, 6]
    for (int i = 1; i < nums.length; i++) {
      left[i] = left[i - 1] * nums[i - 1];
    }

    // right = [24, 12, 4, 1]
    for (int i = nums.length - 2; i >= 0; i--) {
      right[i] = right[i + 1] * nums[i + 1];
    }

    // answer = [24, 12, 8, 6]
    for (int i = 0; i < nums.length; i++) {
      answer[i] = left[i] * right[i];
    }

    return answer;
  }

  public static void main(String[] args) {
    System.out.println(Arrays.toString(Solution.productExceptSelf(new int[] { 1, 2, 3, 4 }))); // [24, 12, 8, 6]
  }
}