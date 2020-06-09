import java.util.*;

class Solution {

  // USING A HASH
  public static int subarraySum(int[] nums, int k) {
    if (nums == null || nums.length == 0) {
      return 0;
    }

    Map<Integer, Integer> sumCounts = new HashMap<>();
    sumCounts.put(0, 1); // we've seen a sum of 0 1 time: empty elements

    int answer = 0;
    int currentSum = 0;

    for (int i : nums) {
      currentSum += i;
      answer += sumCounts.getOrDefault(currentSum - k, 0);
      sumCounts.put(currentSum, sumCounts.getOrDefault(currentSum, 0) + 1);
    }

    return answer;
  }

  // BRUTE FORCE
  // public int subarraySum(int[] nums, int k) {
  // if (nums == null || nums.length == 0) {
  // return 0;
  // }

  // int answer = 0;

  // for (int i = 0; i < nums.length; i++) {
  // int currentSum = 0;

  // for (int j = i; j < nums.length; j++) {
  // currentSum += nums[j];
  // if (currentSum == k) {
  // answer++;
  // }
  // }
  // }

  // return answer;
  // }

  public static void main(String[] args) {
    System.out.println(Solution.subarraySum(new int[] { 1 }, 0)); // 0
    System.out.println(Solution.subarraySum(new int[] { 1, 1, 1 }, 2)); // 2
  }
}