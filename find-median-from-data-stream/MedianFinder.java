import java.util.PriorityQueue;

class MedianFinder {
  double median = 0;
  PriorityQueue<Integer> lowerMaxHeap;
  PriorityQueue<Integer> upperMinHeap;

  /** initialize your data structure here. */
  public MedianFinder() {
    this.lowerMaxHeap = new PriorityQueue<>((a, b) -> b - a);
    this.upperMinHeap = new PriorityQueue<>();
  }

  public void addNum(int number) {
    // if it's the first value just favor the lower heap
    if (lowerMaxHeap.isEmpty() && upperMinHeap.isEmpty()) {
      median = number;
      lowerMaxHeap.add(number);
      return;
    }

    // any time you insert a number, pick a heap to place it in by comparing it
    // to max / min values of the heap

    // after inserting, if we have an odd number, median is the middle element
    if (lowerMaxHeap.size() == upperMinHeap.size()) {
      if (lowerMaxHeap.peek() > number) {
        lowerMaxHeap.add(number);
        median = lowerMaxHeap.peek();
      } else {
        upperMinHeap.add(number);
        median = upperMinHeap.peek();
      }

      return;
    }

    // otherwise after inserting we'll have an even number
    if (lowerMaxHeap.peek() > number) {
      lowerMaxHeap.add(number);
    } else {
      upperMinHeap.add(number);
    }

    // must rebalance first
    if (lowerMaxHeap.size() > upperMinHeap.size()) {
      upperMinHeap.add(lowerMaxHeap.remove());
    } else if (upperMinHeap.size() > lowerMaxHeap.size()) {
      lowerMaxHeap.add(upperMinHeap.remove());
    }

    // median is average of 2 middle elements
    median = (upperMinHeap.peek() + lowerMaxHeap.peek()) / 2.0;
    return;
  }

  public double findMedian() {
    return median;
  }
}

/**
 * Your MedianFinder object will be instantiated and called as such:
 * MedianFinder obj = new MedianFinder(); obj.addNum(num); double param_2 =
 * obj.findMedian();
 */