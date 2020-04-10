import java.util.List;
import java.util.ArrayList;

/*
TEMPLATE STEPS
step 1 - set up return value
step 2 - blank backtrack function
step 3 - add answer to backtrack prototype
step 4 - base case where we add something to output
step 5 - add whatever current value of said data type you'd add to answer as 2nd param to backtrack
step 6 - add return statement 
step 7 - all possible decisions in recursive calls
*/

class Solution {
  public List<String> generateParenthesis(int n) {
    List<String> answer = new ArrayList<>();
    backtrack(answer, "", 0, 0, n);
    return answer;
  }

  // step 2: blank backtrack
  public void backtrack(List<String> answer, String current, int open, int closed, int maxParenPairs) {
    if (current.length() == maxParenPairs * 2) { // some recursive backtrack case
      answer.add(current);
      return;
    }

    // we have a curent string, do we want to add an opening or a closing right now
    // and we always want to add opening before closing

    // always start by adding a left paren if we still can
    // decisions are using variables open and closed
    if (open < maxParenPairs) {
      backtrack(answer, current + "(", open + 1, closed, maxParenPairs);
    }

    // backtracked all the way back to this current one. can we add a right? if so
    // do.
    // then compute rest of the string
    if (closed < open) { // we can't have closing before opening
      backtrack(answer, current + ")", open, closed + 1, maxParenPairs);
    }
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    System.out.println(s.generateParenthesis(3));
  }
}