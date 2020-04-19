import java.util.Arrays;

class Solution {
  // using output as left array and single int as right
  public static int[] productExceptSelf(int[] nums) {
    int N = nums.length;
    if (N == 0) {
      return nums;
    }

    int[] answer = new int[N];
    Arrays.fill(answer, 1);

    // do product on the left
    for (int i = 1; i < nums.length; i++) {
      answer[i] = answer[i - 1] * nums[i - 1];
    }

    // apply right product
    int rightProduct = 1;
    // by starting at last element we multiply by 1, then build
    for (int i = N - 1; i >= 0; i--) {
      answer[i] = answer[i] * rightProduct;
      rightProduct *= nums[i];
    }

    return answer;
  }

  // populating left and right arrays
  // public static int[] productExceptSelf(int[] nums) {
  // int N = nums.length;
  // if (N == 0) {
  // return nums;
  // }

  // int[] answer = new int[N];
  // int[] left = new int[N];
  // int[] right = new int[N];

  // //product of everything to the left of index 0 is 1
  // //as in it doesn't affect.
  // left[0] = 1;

  // //same with right
  // right[N - 1] = 1;

  // // fill product to the left array
  // // and right array also
  // for (int i = 1; i < nums.length; i++) {
  // left[i] = left[i - 1] * nums[i - 1];
  // int rightI = N - 1 - i;
  // right[rightI] = right[rightI + 1] * nums[rightI + 1];
  // }

  // //product at index i is product of everything else
  // //i.e. product to the left * product to the right
  // for (int i = 0; i < nums.length; i++) {
  // answer[i] = left[i] * right[i];
  // }

  // return answer;
  // }

  public static void main(String[] args) {
    System.out.println(Arrays.toString(Solution.productExceptSelf(new int[] { 1, 2, 3, 4 }))); // [24, 12, 8, 6]
  }
}