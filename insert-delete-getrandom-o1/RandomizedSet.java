
//https://leetcode.com/problems/insert-delete-getrandom-o1
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

class RandomizedSet {
  List<Integer> values; // use a list to store actual values
  Map<Integer, Integer> indices; // use a hash to store indices

  /** Initialize your data structure here. */
  public RandomizedSet() {
    this.values = new ArrayList<>();
    this.indices = new HashMap<>();
  }

  /**
   * Inserts a value to the set. Returns true if the set did not already contain
   * the specified element.
   */
  public boolean insert(int val) {
    if (this.indices.containsKey(val)) {
      return false;
    }

    this.values.add(val);
    this.indices.put(val, this.values.size() - 1);
    return true;
  }

  /**
   * Removes a value from the set. Returns true if the set contained the specified
   * element.
   */
  public boolean remove(int val) {
    if (!this.indices.containsKey(val)) {
      return false;
    }

    int valIndex = this.indices.get(val);
    this.indices.remove(val);

    // swap last element with the one to remove if it's not already last
    if (valIndex != this.values.size() - 1) {
      int lastElement = this.values.get(this.values.size() - 1);
      this.values.set(valIndex, lastElement);
      this.indices.put(lastElement, valIndex);
    }

    this.values.remove(this.values.size() - 1);
    return true;
  }

  /** Get a random element from the set. */
  public int getRandom() {
    return this.values.get(new Random().nextInt(this.values.size()));
  }

  public static void main(String[] args) {
    RandomizedSet obj = new RandomizedSet();
    System.out.println(obj.remove(0)); // false
    System.out.println(obj.remove(0)); // false
    System.out.println(obj.insert(0)); // true
    System.out.println(obj.getRandom()); // 0
    System.out.println(obj.remove(0)); // true
    System.out.println(obj.insert(0)); // true

    RandomizedSet obj2 = new RandomizedSet();
    System.out.println(obj2.insert(0)); // true
    System.out.println(obj2.insert(1)); // true
    System.out.println(obj2.remove(0)); // true
    System.out.println(obj2.insert(2)); // true
    System.out.println(obj2.remove(1)); // true
    System.out.println(obj2.getRandom()); // 2
  }
}