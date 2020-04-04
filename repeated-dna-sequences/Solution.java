import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {
  public List<String> findRepeatedDnaSequences(String s) {
    Set<String> set = new HashSet<>();
    Set<String> duplicates = new HashSet<>();
    List<String> answer = new ArrayList<>();

    for (int i = 0; i <= s.length() - 10; i++) {
      String sub = s.substring(i, i + 10);
      if (set.contains(sub)) {
        duplicates.add(sub);
      } else {
        set.add(sub);
      }
    }

    answer.addAll(duplicates);
    return answer;
  }
}