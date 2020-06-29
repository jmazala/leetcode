import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.Set;

class Solution {
  private static final String START = "JFK";
  private List<String> answer;

  private class GraphItem {
    String city;
    int id;

    public GraphItem(String city, int id) {
      this.city = city;
      this.id = id;
    }
  }

  class GraphItemComparator implements Comparator {
    public int compare(Object o1, Object o2) {
      GraphItem g1 = (GraphItem) o1;
      GraphItem g2 = (GraphItem) o2;
      return g1.city.compareTo(g2.city);
    }
  }

  // USING DFS + GREEDY
  public List<String> findItinerary(List<List<String>> tickets) {
    int id = 0;
    Map<String, List<GraphItem>> graph = new HashMap<>();

    for (List<String> ticket : tickets) {
      String from = ticket.get(0);
      String to = ticket.get(1);
      List<GraphItem> graphList = graph.getOrDefault(from, new ArrayList<>());
      graphList.add(new GraphItem(to, id++));
      graph.put(from, graphList);
    }

    // always try to take lexographic next city first
    for (List<GraphItem> graphList : graph.values()) {
      Collections.sort(graphList, new GraphItemComparator());
    }

    List<String> prefix = new ArrayList<>();
    answer = new ArrayList<>();

    dfs(START, graph, prefix, tickets.size() + 1, new HashSet<>());
    return answer;
  }

  private void dfs(String city, Map<String, List<GraphItem>> graph, List<String> prefix, int numTicketsLeft,
      Set<Integer> visited) {
    if (!answer.isEmpty()) {
      return;
    }

    prefix.add(city);
    numTicketsLeft--;

    /*
     * since we go lexographic next city first we're guaranteed to have the first
     * DFS result be the ideal one
     */
    if (numTicketsLeft == 0) {
      answer = new ArrayList<>(prefix);
      return;
    }

    for (GraphItem next : graph.getOrDefault(city, new ArrayList<>())) {
      if (visited.contains(next.id)) {
        continue;
      }

      visited.add(next.id);
      dfs(next.city, graph, prefix, numTicketsLeft, visited);
      visited.remove(next.id);
    }

    prefix.remove(prefix.size() - 1);
  }

  // USING BFS (TLE)
  // private class QueueItem {
  // List<String> sequence;
  // Set<Integer> visited;
  // String city;

  // public QueueItem(String city, List<String> sequence, Set<Integer> visited) {
  // this.city = city;
  // this.sequence = new ArrayList<>(sequence);
  // this.sequence.add(city);
  // this.visited = new HashSet<>(visited);
  // }

  // public QueueItem(String city, List<String> sequence, Set<Integer> visited,
  // int ticketId) {
  // this.city = city;
  // this.sequence = new ArrayList<>(sequence);
  // this.sequence.add(city);
  // this.visited = new HashSet<>(visited);
  // this.visited.add(ticketId);
  // }
  // }

  // public List<String> findItinerary(List<List<String>> tickets) {
  // int id = 0;
  // Map<String, List<GraphItem>> graph = new HashMap<>();

  // for (List<String> ticket : tickets) {
  // String from = ticket.get(0);
  // String to = ticket.get(1);
  // List<GraphItem> graphList = graph.getOrDefault(from, new ArrayList<>());
  // graphList.add(new GraphItem(to, id++));
  // graph.put(from, graphList);
  // }

  // for (List<GraphItem> graphList : graph.values()) {
  // Collections.sort(graphList, new GraphItemComparator());
  // }

  // int numTickets = tickets.size();
  // Queue<QueueItem> queue = new LinkedList<>();

  // queue.add(new QueueItem(START, new ArrayList<>(), new HashSet<>()));

  // while (!queue.isEmpty()) {
  // QueueItem current = queue.remove();

  // for (GraphItem next : graph.getOrDefault(current.city, new ArrayList<>())) {
  // if (current.visited.contains(next.id)) {
  // continue;
  // }

  // QueueItem nextItem = new QueueItem(next.city, current.sequence,
  // current.visited, next.id);
  // if (nextItem.visited.size() == numTickets) {
  // return nextItem.sequence;
  // }

  // queue.add(nextItem);
  // }
  // }

  // return new ArrayList<>();
  // }

  public static void main(String[] args) {
    List<List<String>> tickets1 = new ArrayList<>();
    tickets1.add(Arrays.asList(new String[] { "MUC", "LHR" }));
    tickets1.add(Arrays.asList(new String[] { "JFK", "MUC" }));
    tickets1.add(Arrays.asList(new String[] { "SFO", "SJC" }));
    tickets1.add(Arrays.asList(new String[] { "LHR", "SFO" }));

    List<List<String>> tickets2 = new ArrayList<>();
    tickets2.add(Arrays.asList(new String[] { "JFK", "SFO" }));
    tickets2.add(Arrays.asList(new String[] { "JFK", "ATL" }));
    tickets2.add(Arrays.asList(new String[] { "SFO", "ATL" }));
    tickets2.add(Arrays.asList(new String[] { "ATL", "JFK" }));
    tickets2.add(Arrays.asList(new String[] { "ATL", "SFO" }));
    Solution s = new Solution();
    System.out.println(s.findItinerary(tickets1)); // [JFK, MUC, LHR, SFO, SJC]
    System.out.println(s.findItinerary(tickets2)); // ["JFK","ATL","JFK","SFO","ATL","SFO"]
  }
}