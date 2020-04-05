import java.util.HashMap;
import java.util.Map;
import java.util.PriorityQueue;

class HeapItem {
  int value;
  int label;

  public HeapItem(int value, int label) {
    this.value = value;
    this.label = label;
  }
}

class Solution {
  // using a heap
  public int largestValsFromLabels(int[] values, int[] labels, int num_wanted, int use_limit) {
    // put them in a heap with the value and label, sort by value descending
    PriorityQueue<HeapItem> maxHeap = new PriorityQueue<>((a, b) -> {
      return b.value - a.value;
    });

    for (int i = 0; i < labels.length; i++) {
      maxHeap.add(new HeapItem(values[i], labels[i]));
    }

    // make a hash of label to use count
    Map<Integer, Integer> labelCounts = new HashMap<>();

    int sum = 0;

    while (!maxHeap.isEmpty() && num_wanted > 0) {
      HeapItem item = maxHeap.remove();
      if (labelCounts.getOrDefault(item.label, 0) < use_limit) {
        sum += item.value;
        labelCounts.put(item.label, labelCounts.getOrDefault(item.label, 0) + 1);
        num_wanted--;
      }
    }

    return sum;
  }
}