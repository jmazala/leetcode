import java.util.*;

class Solution {
  private final static int GROUP_ONE = 0;
  private final static int GROUP_TWO = 1;
  private final static int NUM_GROUPS = 2;

  public boolean possibleBipartition(int N, int[][] dislikes) {
    if (dislikes == null || dislikes.length == 0 || dislikes[0].length == 0 || N == 1) {
      return true;
    }

    ArrayList<ArrayList<Integer>> graph = new ArrayList<>(N + 1);
    for (int i = 0; i <= N; i++) {
      graph.add(new ArrayList<>());
    }

    for (int[] dislike : dislikes) {
      graph.get(dislike[0]).add(dislike[1]);
      graph.get(dislike[1]).add(dislike[0]);
    }

    ArrayList<Set<Integer>> groups = new ArrayList<>();
    for (int i = 0; i < NUM_GROUPS; i++) {
      groups.add(new HashSet<>());
    }

    for (int i = 1; i <= N; i++) {
      if (Solution.isAssigned(groups, i)) {
        continue; // this person is already on a team
      }

      if (!dfs(i, graph, groups, GROUP_ONE)) {
        return false;
      }
    }

    return true;
  }

  private boolean dfs(int person, ArrayList<ArrayList<Integer>> graph, ArrayList<Set<Integer>> groups,
      int groupNumber) {
    if (Solution.isAssigned(groups, person)) {
      return groups.get(groupNumber).contains(person);
    }

    groups.get(groupNumber).add(person);

    int otherGroupNumber = groupNumber == GROUP_ONE ? GROUP_TWO : GROUP_ONE;
    for (int dislikedPerson : graph.get(person)) {
      if (!dfs(dislikedPerson, graph, groups, otherGroupNumber)) {
        return false;
      }
    }

    return true;
  }

  private static boolean isAssigned(List<Set<Integer>> teams, int person) {
    for (int i = 0; i < NUM_GROUPS; i++) {
      if (teams.get(i).contains(person)) {
        return true;
      }
    }

    return false;
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    System.out.println(s.possibleBipartition(99, new int[][] { {} })); // true
    System.out.println(s.possibleBipartition(4, new int[][] { { 1, 2 }, { 1, 3 } })); // true group1=[1,4] group2=[2,3]
    System.out.println(s.possibleBipartition(5, new int[][] { { 1, 2 }, { 1, 3 }, { 1, 4 }, { 1, 5 } })); // true
    System.out.println(s.possibleBipartition(3, new int[][] { { 1, 2 }, { 1, 3 }, { 2, 3 } })); // false
    System.out.println(s.possibleBipartition(5, new int[][] { { 1, 2 }, { 2, 3 }, { 3, 4 }, { 4, 5 }, { 1, 5 } })); // false
  }
}