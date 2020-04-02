import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.PriorityQueue;
import java.util.Queue;

class HeapTask {
  char task;
  int count;

  public HeapTask(char task, int count) {
    this.task = task;
    this.count = count;
  }
}

class Solution {
  public int leastInterval(char[] tasks, int n) {
    Map<Character, Integer> hash = new HashMap<>();
    PriorityQueue<HeapTask> maxHeap = new PriorityQueue<>((a, b) -> {
      return b.count - a.count;
    });

    for (char c : tasks) {
      hash.put(c, hash.getOrDefault(c, 0) + 1);
    }

    hash.forEach((Character task, Integer count) -> {
      maxHeap.add(new HeapTask(task, count));
    });

    int cycles = 0;

    while (!maxHeap.isEmpty()) {
      Queue<HeapTask> remainingTasks = new LinkedList<>();

      for (int i = 0; i < n + 1; i++) {
        if (!maxHeap.isEmpty()) {
          HeapTask ht = maxHeap.remove();
          cycles++;
          ht.count--;
          if (ht.count > 0) {
            remainingTasks.add(ht);
          }
        } else {
          if (remainingTasks.isEmpty()) {
            return cycles; // nothing left.
          }

          cycles++; // IDLE CYCLE
        }
      }

      while (!remainingTasks.isEmpty()) { // put them back in the queue
        maxHeap.add(remainingTasks.remove());
      }
    }

    return cycles;
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    char[] tasks = { 'A', 'A', 'A', 'B', 'B', 'B' };
    System.out.println(s.leastInterval(tasks, 2));
  }
}