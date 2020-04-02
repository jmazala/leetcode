import java.util.List;

class Solution {
  public List<String> letterCombinations(String digits) {
    String[] mapping = { "", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz" };

    List<String> result = new ArrayList<String>();

    if (digits.length() == 0) {
      return result;
    }

    letterCombinationRecursive(result, digits, "", 0, mapping);
    return result;
  }

  public void letterCombinationRecursive(List<String> result, String digits, String prefix, int index, String[] mapping) {
    if (index == digits.length()) {
      result.add(prefix);
      return;
    }

    //keep processing current combination
    String letters = mapping[digits.charAt(index) - '0'];
    for (int i = 0; i < letters.length(); i++) {
      letterCombinationRecursive(result, digits, prefix + letters.charAt(i), index+1, mapping);
    }
  }
}