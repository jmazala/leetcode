import java.util.*;

class Solution {
  public int longestConsecutive(int[] nums) {
    if (nums.length == 0) {
      return 0;
    }

    Set<Integer> set = new HashSet<>();

    for (int num : nums) {
      set.add(num);
    }

    int answer = 0;

    for (Integer num : set) {
      if (!set.contains(num - 1)) { //start of a new sequence
        int streak = 1;

        while (set.contains(num + 1)) {
          num++;
          streak++;
        }

        answer = Math.max(streak, answer);
      }
    }

    return answer;
  }
}