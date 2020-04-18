import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

class Solution {
  public static boolean canFinish(int numCourses, int[][] prerequisites) {
    List<List<Integer>> edges = new ArrayList<>(numCourses);
    for (int i = 0; i < numCourses; i++) {
      edges.add(new LinkedList<>());
    }

    for (int i = 0; i < prerequisites.length; i++) {
      edges.get(prerequisites[i][0]).add(prerequisites[i][1]);
    }

    boolean[] visited = new boolean[numCourses];
    boolean[] recursionStack = new boolean[numCourses];

    for (int i = 0; i < numCourses; i++) {
      if (Solution.dfsFindCycle(i, edges, visited, recursionStack)) {
        return false;
      }
    }

    return true;
  }

  public static boolean dfsFindCycle(int course, List<List<Integer>> edges, boolean[] visited,
      boolean[] recursionStack) {
    if (recursionStack[course]) {
      return true;
    }

    if (visited[course]) {
      return false;
    }

    visited[course] = true;
    recursionStack[course] = true;

    for (Integer i : edges.get(course)) {
      if (Solution.dfsFindCycle(i, edges, visited, recursionStack)) {
        return true;
      }
    }

    recursionStack[course] = false;
    return false;
  }

  public static void main(String[] args) {
    System.out.println(Solution.canFinish(2, new int[][] { { 1, 0 } }));
    System.out.println(Solution.canFinish(2, new int[][] { { 1, 0 }, { 0, 1 } }));
  }
}