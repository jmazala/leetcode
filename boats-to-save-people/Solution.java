import java.util.Arrays;
import java.util.PriorityQueue;
import java.util.Stack;

class Solution {
  public int numRescueBoats(int[] people, int limit) {
    if (people == null || people.length == 0) {
      return 0;
    }

    int boats = 0;
    Arrays.sort(people);
    int heaviest = people.length - 1;
    int lightest = 0;

    // put the fattest in their own boat
    while (people[heaviest] == limit) {
      heaviest--;
      boats++;
    }

    while (heaviest >= lightest) {
      boats++;
      if (people[heaviest] + people[lightest] > limit) {
        heaviest--;
        continue;
      }

      heaviest--;
      lightest++;
    }

    return boats;
  }
  // //WITH A HEAP. PROBABLY TOO MANY COMPARISONS
  // public int numRescueBoats(int[] people, int limit) {
  // if (people == null || people.length == 0) {
  // return 0;
  // }

  // int boats = 0;

  // // put them all in a max heap i suppose
  // PriorityQueue<Integer> maxHeap = new PriorityQueue<>((a, b) -> {
  // return b - a;
  // });

  // // store all that reach limit by themselves. also do a hash count
  // for (int weight : people) {
  // if (weight == limit) {
  // boats++;
  // continue;
  // }

  // maxHeap.add(weight);
  // }

  // while (!maxHeap.isEmpty()) {
  // int weight = 0;
  // int boatCount = 0;
  // Stack<Integer> stack = new Stack<>();

  // while (weight <= limit) {
  // if (boatCount == 2 || weight == limit || maxHeap.isEmpty()) {
  // // prob a better addAll way to do this
  // while (!stack.isEmpty()) {
  // maxHeap.add(stack.pop());
  // }

  // break;
  // }

  // if (weight + maxHeap.peek() <= limit) {
  // weight += maxHeap.remove();
  // boatCount++;
  // } else {
  // stack.push(maxHeap.remove());
  // }
  // }

  // boats++;
  // }

  // return boats;
  // }

  public static void main(String[] args) {
    Solution s = new Solution();
    int[] people1 = { 1, 2 };
    System.out.println(s.numRescueBoats(people1, 3));
    int[] people2 = { 3, 2, 2, 1 };
    System.out.println(s.numRescueBoats(people2, 3));
    int[] people3 = { 3, 5, 3, 4 };
    System.out.println(s.numRescueBoats(people3, 5));
  }
}