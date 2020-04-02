import java.util.PriorityQueue;

class Solution {
  public int connectSticks(int[] sticks) {
    if (sticks == null || sticks.length == 0) {
      return 0;
    }

    int answer = 0;
    // all sticks have positive integer lenghts
    PriorityQueue<Integer> pq = new PriorityQueue<>((a, b) -> {
      return a - b;
    });

    for (int stick : sticks) {
      pq.add(stick);
    }

    // connect any two sticks length X and Y into 1 stick by paying a cost of X+Y
    // do this until 1 stick remaining
    while (pq.size() > 1) {
      int x = pq.remove();
      int y = pq.remove();
      answer += (x + y);
      pq.add(x + y);
    }

    return answer;
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    int[] sticks = { 2, 4, 3 };
    System.out.println(s.connectSticks(sticks));
    int[] sticks2 = { 1, 8, 3, 5 };
    System.out.println(s.connectSticks(sticks2));
  }
}