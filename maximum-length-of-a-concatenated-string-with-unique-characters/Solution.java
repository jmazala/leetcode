import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {
  int result;

  public int maxLength(List<String> arr) {
    // all possible kind of implies recursion
    // generate all unique combinations of those strings.
    // one test case says if a string in arr has repeated characters you can't
    // use it.
    List<String> candidates = new ArrayList<>();
    for (String arrCandidate : arr) {
      Set<Character> tempSet = new HashSet<>();
      boolean addMe = true;

      for (Character tempC : arrCandidate.toCharArray()) {
        if (tempSet.contains(tempC)) {
          addMe = false;
          break;
        }

        tempSet.add(tempC);
      }

      if (addMe) {
        candidates.add(arrCandidate);
      }
    }

    result = -1;
    maxUnique(candidates, 0, "");
    return result;
  }

  public void maxUnique(List<String> arr, int index, String prefix) {
    // base case. stop recursion
    if (index >= arr.size()) {
      int count = uniqueCharCount(prefix);
      if (count > result) {
        result = count;
      }

      return;
    }

    maxUnique(arr, index + 1, prefix);
    maxUnique(arr, index + 1, prefix + arr.get(index));
  }

  public int uniqueCharCount(String s) {
    Set<Character> set = new HashSet<>();
    for (Character c : s.toCharArray()) {
      if (set.contains(c)) {
        return -1;
      }

      set.add(c);
    }

    return s.length();
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    List<String> arr = Arrays.asList("un", "iq", "ue");
    List<String> arr2 = Arrays.asList("cha", "r", "act", "ers");
    List<String> arr3 = Arrays.asList("abcdefghijklmnopqrstuvwxyz", "r", "act", "ers");
    System.out.println(s.maxLength(arr));
    System.out.println(s.maxLength(arr2));
    System.out.println(s.maxLength(arr3));
  }
}