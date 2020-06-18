import java.util.Stack;

public class Solution {

  // USING 2 POINTERS
  public int longestValidParentheses(String s) {
    int left = 0;
    int right = 0;
    int answer = 0;

    for (int i = 0; i < s.length(); i++) {
      if (s.charAt(i) == '(') {
        left++;
      } else {
        right++;
      }

      if (left == right) {
        answer = Math.max(answer, 2 * right);
      } else if (right >= left) {
        right = 0;
        left = 0;
      }
    }

    left = 0;
    right = 0;
    for (int i = s.length() - 1; i >= 0; i--) {
      if (s.charAt(i) == ')') {
        right++;
      } else {
        left++;
      }

      if (left == right) {
        answer = Math.max(answer, 2 * left);
      } else if (left >= right) {
        left = 0;
        right = 0;
      }
    }

    return answer;
  }

  // USING A STACK
  // public int longestValidParentheses(String s) {
  // int answer = 0;
  // Stack<Integer> stack = new Stack<>();

  // stack.push(-1);

  // for (int i = 0; i < s.length(); i++) {
  // char c = s.charAt(i);
  // if (c == '(') {
  // stack.push(i);
  // continue;
  // }

  // // c is ')'
  // stack.pop();

  // if (stack.isEmpty()) {
  // stack.push(i);
  // } else {
  // int length = i - stack.peek();
  // answer = Math.max(answer, length);
  // }
  // }

  // return answer;
  // }
}