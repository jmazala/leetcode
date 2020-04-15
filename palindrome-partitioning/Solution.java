import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {
  public static List<List<String>> partition(String s) {
    List<List<String>> answer = new ArrayList<>();
    
    if (s == null || s.length() == 0) {
      return answer;
    }

    if (s.length() == 1) {
      answer.add(Arrays.asList(new String[] { s }));
      return answer;
    }
    

    if (Solution.isPalindrome(s)) {
      answer.add(Arrays.asList(new String[] { s }));
    }

    // try to get all prefixes of length 1 to n and take as sub partitions
    for (int i = 1; i < s.length(); i++) {
      String prefix = s.substring(0, i);

      if (Solution.isPalindrome(prefix)) {
        String suffix = s.substring(i);
        List<List<String>> suffixAnswer = Solution.partition(suffix);

        if (suffixAnswer.size() > 0) {
          for (List<String> suffixPartitionList : suffixAnswer) {
            List<String> subAnswer = new ArrayList<>();
            subAnswer.add(prefix);
            subAnswer.addAll(suffixPartitionList);
            answer.add(subAnswer);
          }
        }
      }
    }

    return answer;
  }

  public static boolean isPalindrome(String s) {
    if (s.length() < 2) {
      return true;
    }
    
    int start = 0;
    int end = s.length() - 1;

    while (start <= end) {
      if (s.charAt(start) != s.charAt(end)) {
        return false;
      }

      start++;
      end--;
    }

    return false;
  }

  public static void main(String[] args) {
    System.out.println(Solution.partition("aab"));
  }
}