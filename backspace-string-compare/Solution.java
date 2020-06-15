import java.util.Stack;

class Solution {
  public boolean backspaceCompare(String s, String t) {
    Stack<Character> stackS = new Stack<>();
    Stack<Character> stackT = new Stack<>();

    for (char c : s.toCharArray()) {
      if (c == '#') {
        if (!stackS.isEmpty()) {
          stackS.pop();
        }
      } else {
        stackS.push(c);
      }
    }

    for (char c : t.toCharArray()) {
      if (c == '#') {
        if (!stackT.isEmpty()) {
          stackT.pop();
        }
      } else {
        stackT.push(c);
      }
    }

    while (!stackS.isEmpty()) {
      char c = stackS.pop();
      if (stackT.isEmpty() || c != stackT.pop()) {
        return false;
      }
    }

    return true;
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    System.out.println(s.backspaceCompare("c##vnvr", "#c##vnvr"));
  }
}