import java.util.Arrays;

public class MyCircularQueue {
  Integer[] values;
  int tail;
  int head;
  int numValues;

  /** Initialize your data structure here. Set the size of the queue to be k. */
  public MyCircularQueue(int k) {
    values = new Integer[k];
    Arrays.fill(values, null);
    head = 0;
    tail = 0;
    numValues = 0;
  }

  /**
   * Insert an element into the circular queue. Return true if the operation is
   * successful.
   */
  public boolean enQueue(int value) {
    // queue is full, can't add
    if (isFull()) {
      return false;
    }

    // look for next open slot.
    while (values[tail] != null) {
      tail = (tail + 1) % values.length;
    }

    values[tail] = value;
    numValues++;
    return true;
  }

  /**
   * Delete an element from the circular queue. Return true if the operation is
   * successful.
   */
  public boolean deQueue() {
    if (isEmpty()) {
      return false;
    }

    values[head] = null;
    numValues--;
    if (numValues > 0) {
      head = (head + 1) % values.length;
    }
    
    return true;
  }

  /** Get the front item from the queue. */
  public int Front() {
    if (isEmpty()) {
      return -1;
    }

    return values[head];
  }

  /** Get the last item from the queue. */
  public int Rear() {
    if (isEmpty()) {
      return -1;
    }

    return values[tail];
  }

  /** Checks whether the circular queue is empty or not. */
  public boolean isEmpty() {
    return numValues == 0;
  }

  /** Checks whether the circular queue is full or not. */
  public boolean isFull() {
    return numValues == values.length;
  }

  public static void main(String[] args) {
    // MyCircularQueue circularQueue = new MyCircularQueue(3); // set the size to be 3
    // System.out.println(circularQueue.enQueue(1)); // return true
    // System.out.println(circularQueue.enQueue(2)); // return true
    // System.out.println(circularQueue.enQueue(3)); // return true
    // System.out.println(circularQueue.enQueue(4)); // return false, the queue is full
    // System.out.println(circularQueue.Rear()); // return 3
    // System.out.println(circularQueue.isFull()); // return true
    // System.out.println(circularQueue.deQueue()); // return true
    // System.out.println(circularQueue.enQueue(4)); // return true
    // System.out.println(circularQueue.Rear()); // return 4

    MyCircularQueue q2 = new MyCircularQueue(81);
    System.out.println(q2.enQueue(69)); // return true
    System.out.println(q2.deQueue()); // return true
    System.out.println(q2.enQueue(92)); // return true
    System.out.println(q2.enQueue(12)); // return true
    System.out.println(q2.deQueue()); // return true
    System.out.println(q2.isFull()); // return false
    System.out.println(q2.isFull()); // return false
    System.out.println(q2.Front()); // return 12
  }
}

/**
 * Your MyCircularQueue object will be instantiated and called as such:
 * MyCircularQueue obj = new MyCircularQueue(k); boolean param_1 =
 * obj.enQueue(value); boolean param_2 = obj.deQueue(); int param_3 =
 * obj.Front(); int param_4 = obj.Rear(); boolean param_5 = obj.isEmpty();
 * boolean param_6 = obj.isFull();
 */

// ["Front","deQueue","enQueue","Front","enQueue","enQueue","Rear","Rear","deQueue","enQueue","enQueue","Rear","Rear","Front","Rear","Rear","deQueue","enQueue","Rear","deQueue","Rear","Rear","Front","Front","enQueue","enQueue","Front","enQueue","enQueue","enQueue","Front","isEmpty","enQueue","Rear","enQueue","Front","enQueue","enQueue","Front","enQueue","deQueue","deQueue","enQueue","deQueue","Front","enQueue","Rear","isEmpty","Front","enQueue","Front","deQueue","enQueue","enQueue","deQueue","deQueue","Front","Front","deQueue","isEmpty","enQueue","Rear","Front","enQueue","isEmpty","Front","Front","enQueue","enQueue","enQueue","Rear","Front","Front","enQueue","isEmpty","deQueue","enQueue","enQueue","Rear","deQueue","Rear","Front","enQueue","deQueue","Rear","Front","Rear","deQueue","Rear","Rear","enQueue","enQueue","Rear","enQueue"]
// [,[],[],[28],[],[13],[45],[],[],[],[24],[27],[],[],[],[],[],[],[88],[],[],[],[],[],[],[53],[39],[],[28],[66],[17],[],[],[47],[],[87],[],[92],[94],[],[59],[],[],[99],[],[],[84],[],[],[],[52],[],[],[86],[30],[],[],[],[],[],[],[45],[],[],[83],[],[],[],[22],[77],[23],[],[],[],[14],[],[],[90],[57],[],[],[],[],[34],[],[],[],[],[],[],[],[49],[59],[],[71]]