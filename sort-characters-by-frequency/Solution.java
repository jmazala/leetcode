import java.util.*;

class Solution {
  public String frequencySort(String s) {
    if (s == null || s.length() < 2) {
      return "";
    }

    Map<Character, Integer> hash = new HashMap<>();
    for (char c : s.toCharArray()) {
      hash.put(c, hash.getOrDefault(c, 0) + 1);
    }

    PriorityQueue<Character> maxHeap = new PriorityQueue<>((a, b) -> hash.get(b) - hash.get(a));
    maxHeap.addAll(hash.keySet());

    StringBuilder builder = new StringBuilder();
    while (!maxHeap.isEmpty()) {
      char c = maxHeap.remove();
      for (int i = 0; i < hash.get(c); i++) {
        builder.append(c);
      }
    }

    return builder.toString();
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    System.out.println(s.frequencySort("tree"));
  }
}