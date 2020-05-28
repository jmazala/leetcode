import java.util.*;

class Solution {
  private final static int GROUP_ONE = 0;
  private final static int GROUP_TWO = 1;
  // private final static int NUM_GROUPS = 2;

  // WITH A STACK
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

    Integer[] groupAssignments = new Integer[N + 1];
    Arrays.fill(groupAssignments, null);

    for (int i = 1; i <= N; i++) {
      if (groupAssignments[i] != null) {
        continue;
      }

      groupAssignments[i] = GROUP_ONE;
      
      Stack<Integer> stack = new Stack<>();
      stack.push(i);
      while (!stack.isEmpty()) {
        int person = stack.pop();
        
        for (int dislikedPerson : graph.get(person)) {
          if (groupAssignments[dislikedPerson] != null) {
            if (groupAssignments[dislikedPerson] == groupAssignments[person]) {
              return false; // they're in the same group
            }
          } else {
            groupAssignments[dislikedPerson] = groupAssignments[person] == GROUP_ONE ? GROUP_TWO : GROUP_ONE;
            stack.push(dislikedPerson);
          }
        }
      }
    }

    return true;
  }

  // WITH DFS AND HASH
  // public boolean possibleBipartition(int N, int[][] dislikes) {
  // if (dislikes == null || dislikes.length == 0 || dislikes[0].length == 0 || N
  // == 1) {
  // return true;
  // }

  // Map<Integer, ArrayList<Integer>> graph = new HashMap<>();
  // for (int i = 0; i <= N; i++) {
  // graph.put(i, new ArrayList<>());
  // }

  // for (int[] dislike : dislikes) {
  // graph.get(dislike[0]).add(dislike[1]);
  // graph.get(dislike[1]).add(dislike[0]);
  // }

  // Map<Integer, Set<Integer>> groups = new HashMap<>();
  // for (int i = 0; i < NUM_GROUPS; i++) {
  // groups.put(i, new HashSet<>());
  // }

  // for (int i = 1; i <= N; i++) {
  // if (Solution.isAssigned(groups, i)) {
  // continue; // this person is already on a team
  // }

  // if (!dfs(i, graph, groups, GROUP_ONE)) {
  // return false;
  // }
  // }

  // return true;
  // }

  // private boolean dfs(int person, Map<Integer, ArrayList<Integer>> graph,
  // Map<Integer, Set<Integer>> groups,
  // int groupNumber) {
  // if (Solution.isAssigned(groups, person)) {
  // return groups.get(groupNumber).contains(person);
  // }

  // groups.get(groupNumber).add(person);

  // int otherGroupNumber = groupNumber == GROUP_ONE ? GROUP_TWO : GROUP_ONE;
  // for (int dislikedPerson : graph.get(person)) {
  // if (!dfs(dislikedPerson, graph, groups, otherGroupNumber)) {
  // return false;
  // }
  // }

  // return true;
  // }

  // private static boolean isAssigned(Map<Integer, Set<Integer>> teams, int
  // person) {
  // for (int i = 0; i < NUM_GROUPS; i++) {
  // if (teams.get(i).contains(person)) {
  // return true;
  // }
  // }

  // return false;
  // }

  // WITH DFS AND ARRAYLIST
  // public boolean possibleBipartition(int N, int[][] dislikes) {
  // if (dislikes == null || dislikes.length == 0 || dislikes[0].length == 0 || N
  // == 1) {
  // return true;
  // }

  // ArrayList<ArrayList<Integer>> graph = new ArrayList<>(N + 1);
  // for (int i = 0; i <= N; i++) {
  // graph.add(new ArrayList<>());
  // }

  // for (int[] dislike : dislikes) {
  // graph.get(dislike[0]).add(dislike[1]);
  // graph.get(dislike[1]).add(dislike[0]);
  // }

  // ArrayList<Set<Integer>> groups = new ArrayList<>();
  // for (int i = 0; i < NUM_GROUPS; i++) {
  // groups.add(new HashSet<>());
  // }

  // for (int i = 1; i <= N; i++) {
  // if (Solution.isAssigned(groups, i)) {
  // continue; // this person is already on a team
  // }

  // if (!dfs(i, graph, groups, GROUP_ONE)) {
  // return false;
  // }
  // }

  // return true;
  // }

  // private boolean dfs(int person, ArrayList<ArrayList<Integer>> graph,
  // ArrayList<Set<Integer>> groups,
  // int groupNumber) {
  // if (Solution.isAssigned(groups, person)) {
  // return groups.get(groupNumber).contains(person);
  // }

  // groups.get(groupNumber).add(person);

  // int otherGroupNumber = groupNumber == GROUP_ONE ? GROUP_TWO : GROUP_ONE;
  // for (int dislikedPerson : graph.get(person)) {
  // if (!dfs(dislikedPerson, graph, groups, otherGroupNumber)) {
  // return false;
  // }
  // }

  // return true;
  // }

  // private static boolean isAssigned(List<Set<Integer>> teams, int person) {
  // for (int i = 0; i < NUM_GROUPS; i++) {
  // if (teams.get(i).contains(person)) {
  // return true;
  // }
  // }

  // return false;
  // }

  public static void main(String[] args) {
    Solution s = new Solution();
    System.out.println(s.possibleBipartition(99, new int[][] { {} })); // true
    System.out.println(s.possibleBipartition(4, new int[][] { { 1, 2 }, { 1, 3 } })); // true group1=[1,4] group2=[2,3]
    System.out.println(s.possibleBipartition(5, new int[][] { { 1, 2 }, { 1, 3 }, { 1, 4 }, { 1, 5 } })); // true
    System.out.println(s.possibleBipartition(3, new int[][] { { 1, 2 }, { 1, 3 }, { 2, 3 } })); // false
    System.out.println(s.possibleBipartition(5, new int[][] { { 1, 2 }, { 2, 3 }, { 3, 4 }, { 4, 5 }, { 1, 5 } })); // false
    System.out.println(s.possibleBipartition(5, new int[][] { { 1, 2 }, { 3, 4 }, { 4, 5 }, { 3, 5 } })); // false
  }
}