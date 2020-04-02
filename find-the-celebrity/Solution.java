import java.util.Stack;

class Solution extends Relation {
  // using a stack
  // public int findCelebrity(int n) {
  // //with knows we figure out 2 things
  // //a knows b, a can't be celebrity
  // //a doesn't know b, a could be a celebrity
  // int candidate = 0;

  // for (int i = 1; i < n; i++) {
  // if (knows(candidate, i)) {
  // candidate = 1;
  // }
  // }

  // for (int i = 0; i < n; i++) {
  // if (i != candidate && knows(candidate, i) || !knows(i, candidate)) {
  // return -1;
  // }
  // }

  // return candidate;
  // }

  public int findCelebrity(int n) {
    Stack<Integer> stack = new Stack<>();
    for (int i = 0; i < n; i++) {
      stack.push(i);
    }

    while (stack.size() > 1) {
      int a = stack.pop();
      int b = stack.pop();

      boolean aKnowsB = knows(a, b);
      boolean bKnowsA = knows(b, a);

      if (aKnowsB && !bKnowsA) {
        stack.push(b);
      } else if (bKnowsA && !aKnowsB) {
        stack.push(a);
      }
    }

    // last remaining is the candidate
    int candidate = stack.pop();
    for (int i = 0; i < n; i++) {
      if (i == candidate) {
        continue;
      }

      if (!knows(i, candidate) || knows(candidate, i)) {
        return -1;
      }
    }

    return candidate;
  }
}