import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

class Solution {
  public List<List<Integer>> threeSum(int[] nums) {
    List<List<Integer>> answer = new LinkedList<>();

    Arrays.sort(nums);

    for (int i = 0; i < nums.length - 2; i++) {
      if (i > 0 && nums[i] == nums[i - 1]) {
        continue;
      }

      int left = i + 1;
      int right = nums.length - 1;

      while (left < right) {
        int sum = nums[left] + nums[right] + nums[i];

        if (sum < 0) {
          left++;
          continue;
        }

        if (sum > 0) {
          right--;
          continue;
        }

        answer.add(Arrays.asList(new Integer[] { nums[left], nums[right], nums[i] }));
        while (left < right && nums[left] == nums[left + 1]) {
          left++;
        }

        while (right > left && nums[right] == nums[right - 1]) {
          right--;
        }

        left++;
        right--;
      }
    }

    return answer;
  }
}

// //THIS IS INCOMPLETE (AND WRONG)
// import java.util.ArrayList;
// import java.util.Collections;
// import java.util.HashSet;
// import java.util.List;
// import java.util.Set;

// class Solution {
// public void populateTriplets(int[] nums, int numIndex, List<Integer> prefix,
// Set<List<Integer>> toPopulate) {
// if (prefix.size() == 3) {
// if (sum(prefix) == 0) {
// List<Integer> toAdd = new ArrayList<>(prefix);
// Collections.sort(toAdd);
// toPopulate.add(toAdd);
// }

// return;
// }

// if (numIndex >= nums.length) {
// return;
// }

// // simulate taking this num
// prefix.add(nums[numIndex]);
// populateTriplets(nums, numIndex + 1, prefix, toPopulate);
// prefix.remove(prefix.size() - 1);
// populateTriplets(nums, numIndex + 1, prefix, toPopulate);
// }

// public int sum(List<Integer> nums) {
// int sum = 0;
// for (int num : nums) {
// sum += num;
// }

// return sum;
// }

// public List<List<Integer>> threeSum(int[] nums) {
// List<List<Integer>> answer = new ArrayList<List<Integer>>();
// Set<List<Integer>> answerSet = new HashSet<List<Integer>>();
// if (nums == null || nums.length == 0) {
// return answer;
// }
// populateTriplets(nums, 0, new ArrayList<Integer>(), answerSet);
// answer.addAll(answerSet);
// return answer;
// }

// public static void main(String[] args) {
// Solution s = new Solution();
// // System.out.println(s.threeSum(new int[] { -1, 0, 1, 2, -1, -4 }));
// System.out.println(s.threeSum(new int[] { 0, 0, 0 }));
// }
// }