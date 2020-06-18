import java.util.HashSet;
import java.util.Set;

class Solution {
  public int[] intersection(int[] nums1, int[] nums2) {
    Set<Integer> set1 = new HashSet<>();
    Set<Integer> set2 = new HashSet<>();

    for (int num : nums1) {
      set1.add(num);
    }

    for (int num : nums2) {
      if (set1.contains(num)) {
        set2.add(num);
      }
    }

    int[] answer = new int[set2.size()];
    int write = 0;
    for (int num : set2) {
      answer[write++] = num;
    }

    return answer;
  }
}