import java.util.Map;
import java.util.HashMap;
import java.util.PriorityQueue;

class Solution {
  public String reorganizeString(String S) {
    // use hashmap to count some characters
    Map<Character, Integer> charCounts = new HashMap<>();
    for (int i = 0; i < S.length(); i++) {
      char c = S.charAt(i);
      charCounts.put(c, charCounts.getOrDefault(c, 0) + 1);
    }

    // make a priority queue max heap for greedy occurances
    PriorityQueue<Character> maxHeap = new PriorityQueue<>((a, b) -> {
      return charCounts.get(b) - charCounts.get(a);
    });

    maxHeap.addAll(charCounts.keySet());
    StringBuilder result = new StringBuilder();
    while (maxHeap.size() > 1) {
      char c1 = maxHeap.remove();
      char c2 = maxHeap.remove();

      result.append(c1);
      result.append(c2);
      charCounts.put(c1, charCounts.get(c1) - 1);
      charCounts.put(c2, charCounts.get(c2) - 1);

      if (charCounts.get(c1) > 0) {
        maxHeap.add(c1);
      }

      if (charCounts.get(c2) > 0) {
        maxHeap.add(c2);
      }
    }

    if (!maxHeap.isEmpty()) {
      char last = maxHeap.remove();
      if (charCounts.get(last) > 1) {
        return "";
      }

      result.append(last);
    }

    return result.toString();
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    System.out.println(s.reorganizeString("aab"));
    System.out.println(s.reorganizeString("aaab"));
  }
}