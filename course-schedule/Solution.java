import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

class Solution {
  public static boolean canFinish(int numCourses, int[][] prerequisites) {
    // build graph and populate edges
    List<List<Integer>> edges = new ArrayList<>(numCourses);

    for (int i = 0; i < numCourses; i++) {
      edges.add(new LinkedList<>());
    }

    for (int[] prereq : prerequisites) {
      edges.get(prereq[0]).add(prereq[1]);
    }

    // check for cycle using standard algorithm for every node (course)
    boolean[] visited = new boolean[numCourses];
    boolean[] recursionStack = new boolean[numCourses];

    for (int i = 0; i < numCourses; i++) {
      if (dfsHasCycle(i, edges, visited, recursionStack)) {
        return false;
      }
    }

    return true;
  }

  private static boolean dfsHasCycle(int node, List<List<Integer>> edges, boolean[] visited, boolean[] recursionStack) {
    if (recursionStack[node]) {
      return true;
    }

    if (visited[node]) {
      return false;
    }

    visited[node] = true;
    recursionStack[node] = true;

    for (Integer next : edges.get(node)) {
      if (dfsHasCycle(next, edges, visited, recursionStack)) {
        return true;
      }
    }

    recursionStack[node] = false;
    return false;
  }

  public static void main(String[] args) {
    System.out.println(Solution.canFinish(2, new int[][] { { 1, 0 } })); // true
    System.out.println(Solution.canFinish(2, new int[][] { { 1, 0 }, { 0, 1 } })); // false
  }
}