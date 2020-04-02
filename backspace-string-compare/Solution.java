import java.util.Stack;

class Solution {
  public boolean backspaceCompare(String S, String T) {
    Stack<Character> sStack = new Stack<>();
    Stack<Character> tStack = new Stack<>();

    for (char c : S.toCharArray()) {
      if (c == '#') {
        if (!sStack.isEmpty()) {
          sStack.pop();
        }
      } else {
        sStack.push(c);
      }
    }

    for (char c : T.toCharArray()) {
      if (c == '#') {
        if (!tStack.isEmpty()) {
          tStack.pop();
        }
      } else {
        tStack.push(c);
      }
    }

    while (!sStack.isEmpty()) {
      char c = sStack.pop();
      if (tStack.isEmpty() || c != tStack.pop()) {
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