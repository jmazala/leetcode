import java.util.*;

class FirstUnique {
  // keep a queue of numbers for constant time removal or addition.
  // also keeps track of FIFO
  Queue<Integer> queue;

  // keep a map of numbers to maintain counts
  Map<Integer, Integer> hash = new HashMap<>();

  public FirstUnique(int[] nums) {
    this.queue = new LinkedList<>();
    for (int num : nums) {
      hash.put(num, hash.getOrDefault(num, 0) + 1);
      if (hash.get(num) == 1) {
        queue.add(num);
      }
    }
  }

  // returns the value of the first unique integer of the queue
  // returns -1 if there is no such integer.
  public int showFirstUnique() {
    if (queue.isEmpty()) {
      return -1;
    }

    while (!queue.isEmpty()) {
      if (hash.get(queue.peek()) > 1) {
        queue.remove();
      } else {
        return queue.peek();
      }
    }

    return -1;
  }

  // insert value to the queue.
  public void add(int value) {
    hash.put(value, hash.getOrDefault(value, 0) + 1);
    if (hash.get(value) == 1) {
      queue.add(value);
    }
  }

  public static void main(String[] args) {
    FirstUnique fu = new FirstUnique(new int[] { 2, 3, 5 });
    System.out.println(fu.showFirstUnique()); // return 2
    fu.add(5); // the queue is now [2,3,5,5]
    System.out.println(fu.showFirstUnique()); // return 2
    fu.add(2); // the queue is now [2,3,5,5,2]
    System.out.println(fu.showFirstUnique()); // return 3
    fu.add(3); // the queue is now [2,3,5,5,2,3]
    System.out.println(fu.showFirstUnique()); // return -1

    FirstUnique fu2 = new FirstUnique(new int[] { 7, 7, 7, 7, 7, 7 });
    System.out.println(fu2.showFirstUnique()); // return -1
    fu2.add(7); // the queue is now [7,7,7,7,7,7,7]
    fu2.add(3); // the queue is now [7,7,7,7,7,7,7,3]
    fu2.add(3); // the queue is now [7,7,7,7,7,7,7,3,3]
    fu2.add(7); // the queue is now [7,7,7,7,7,7,7,3,3,7]
    fu2.add(17); // the queue is now [7,7,7,7,7,7,7,3,3,7,17]
    System.out.println(fu2.showFirstUnique()); // return 17

    FirstUnique fu3 = new FirstUnique(new int[] { 809 });
    System.out.println(fu3.showFirstUnique()); // return 809
    fu3.add(809); // the queue is now [809,809]
    System.out.println(fu3.showFirstUnique()); // return -1
  }
}

/**
 * Your FirstUnique object will be instantiated and called as such: FirstUnique
 * obj = new FirstUnique(nums); int param_1 = obj.showFirstUnique();
 * obj.add(value);
 */