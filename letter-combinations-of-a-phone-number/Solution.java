import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Stack;

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

  public void letterCombinationRecursive(List<String> result, String digits, String prefix, int index,
      String[] mapping) {
    if (index == digits.length()) {
      result.add(prefix);
      return;
    }

    // keep processing current combination
    String letters = mapping[digits.charAt(index) - '0'];
    for (int i = 0; i < letters.length(); i++) {
      letterCombinationRecursive(result, digits, prefix + letters.charAt(i), index + 1, mapping);
    }
  }

  private static Map<Character, Character[]> DIGIT_MAP = new HashMap<>();
  static {
    DIGIT_MAP.put('0', new Character[] {});
    DIGIT_MAP.put('1', new Character[] {});
    DIGIT_MAP.put('2', new Character[] { 'a', 'b', 'c' });
    DIGIT_MAP.put('3', new Character[] { 'd', 'e', 'f' });
    DIGIT_MAP.put('4', new Character[] { 'g', 'h', 'i' });
    DIGIT_MAP.put('5', new Character[] { 'j', 'k', 'l' });
    DIGIT_MAP.put('6', new Character[] { 'm', 'n', 'o' });
    DIGIT_MAP.put('7', new Character[] { 'p', 'q', 'r', 's' });
    DIGIT_MAP.put('8', new Character[] { 't', 'u', 'v' });
    DIGIT_MAP.put('9', new Character[] { 'w', 'x', 'y', 'z' });
  }

  static class StackItem {
    String prefix;
    int index;

    public StackItem(String prefix, int index) {
      this.index = index;
      this.prefix = prefix;
    }
  }

  /*
   * TIME: O(4^n * n)
   * SPACE: O(4^n * n)
   */
  public List<String> letterCombinationsIterative(String digits) {
    if (digits.length() == 0) {
      return new ArrayList<>();
    }

    List<String> combinations = new ArrayList<>();
    Stack<StackItem> stack = new Stack<>();
    stack.push(new StackItem("", 0));

    while (!stack.isEmpty()) {
      StackItem item = stack.pop();
      if (item.index == digits.length()) {
        combinations.add(item.prefix);
        continue;
      }

      char c = digits.charAt(item.index);
      Character[] nextLetters = DIGIT_MAP.get(c);
      if (nextLetters.length == 0) {
        stack.push(new StackItem(item.prefix, item.index + 1));
      } else {
        for (Character nextLetter : nextLetters) {
          stack.push(new StackItem(item.prefix + nextLetter, item.index + 1));
        }
      }
    }

    return combinations;
  }
}