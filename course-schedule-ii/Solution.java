import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

class Solution {
  public int[] findOrder(int numCourses, int[][] prerequisites) {
    List<List<Integer>> edges = new ArrayList<>();

    for (int i = 0; i < numCourses; i++) {
      edges.add(new LinkedList<>());
    }

    int[] nodeDegrees = new int[numCourses];
    int[] topologicalOrder = new int[numCourses];

    // queue for all nodes with degree 0
    Queue<Integer> queue = new LinkedList<>();

    // create adjacency list and track node degrees
    for (int[] prereq : prerequisites) {
      // to take course 0 you have to first take course 1
      edges.get(prereq[1]).add(prereq[0]);
      nodeDegrees[prereq[0]]++;
    }

    // 3: Add all the nodes with 0 in-degree to Q.
    for (int i = 0; i < numCourses; i++) {
      if (nodeDegrees[i] == 0) {
        queue.add(i);
      }
    }

    int i = 0;

    while (!queue.isEmpty()) {
      // visiting a node means we took that course
      int node = queue.remove();
      topologicalOrder[i++] = node;

      for (Integer neighbor : edges.get(node)) {
        // eliminate a prereq where it was required
        nodeDegrees[neighbor]--;

        // if we took all the prereqs we can visit the new course
        if (nodeDegrees[neighbor] == 0) {
          queue.add(neighbor);
        }
      }
    }

    // did we search all classes?
    return (i == numCourses) ? topologicalOrder : new int[0];
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    System.out.println(Arrays.toString(s.findOrder(2, new int[][] { { 1, 0 } }))); // [0, 1]
    // [0,1,2,3] or [0,2,1,3]
    System.out.println(Arrays.toString(s.findOrder(4, new int[][] { { 1, 0 }, { 2, 0 }, { 3, 1 }, { 3, 2 } })));
  }
}
