import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;
import java.util.Set;

class Solution {
  public boolean canVisitAllRooms(List<List<Integer>> rooms) {
    if (rooms == null || rooms.size() == 0) {
      return false;
    }

    Set<Integer> seen = new HashSet<>();
    Queue<Integer> queue = new LinkedList<>();
    seen.add(0);
    queue.add(0);

    while (!queue.isEmpty()) {
      List<Integer> keys = rooms.get(queue.remove());

      for (int key : keys) {
        if (seen.contains(key)) {
          continue;
        }

        seen.add(key);
        queue.add(key);
      }
    }

    return seen.size() == rooms.size();
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    List<List<Integer>> rooms = new ArrayList<>();
    Integer[][] roomsArray = { { 1, 3 }, { 3, 0, 1 }, { 2 }, { 0 } };
    for (Integer[] room : roomsArray) {
      rooms.add(Arrays.asList(room));
    }
    
    List<List<Integer>> rooms2 = new ArrayList<>();
    Integer[][] roomsArray2 = { { 1 }, { 2 }, { 3 }, {} };
    for (Integer[] room : roomsArray2) {
      rooms2.add(Arrays.asList(room));
    }

    // System.out.println(s.canVisitAllRooms(rooms));
    System.out.println(s.canVisitAllRooms(rooms2));

  }
}