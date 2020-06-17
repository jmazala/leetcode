import java.util.Arrays;
import java.util.Stack;

class Solution {
  public int[][] merge(int[][] intervals) {
    if (intervals.length < 2) {
      return intervals;
    }

    Arrays.sort(intervals, (a, b) -> a[0] - b[0]);

    Stack<int[]> stack = new Stack<>();
    stack.push(intervals[0]);

    for (int i = 1; i < intervals.length; i++) {
      int[] previous = stack.pop();
      int[] current = intervals[i];

      // they overlap
      if (current[0] <= previous[1]) {
        previous[1] = Math.max(previous[1], current[1]);
        stack.push(previous);
      } else {
        stack.push(previous);
        stack.push(current);
      }
    }

    int[][] answer = new int[stack.size()][2]; // [[1,6], [8, 10], [15, 18]]
    int writeIndex = stack.size() - 1;
    while (!stack.isEmpty()) {
      answer[writeIndex--] = stack.pop();
    }

    return answer;
  }
}