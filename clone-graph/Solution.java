import java.util.*;

// Definition for a Node.
class Node {
  public int val;
  public List<Node> neighbors;

  public Node() {
    val = 0;
    neighbors = new ArrayList<Node>();
  }

  public Node(int _val) {
    val = _val;
    neighbors = new ArrayList<Node>();
  }

  public Node(int _val, ArrayList<Node> _neighbors) {
    val = _val;
    neighbors = _neighbors;
  }
}

class Solution {
  // USING DFS

  private Map<Node, Node> visited = new HashMap<>();

  public Node cloneGraph(Node node) {
    if (node == null) {
      return node;
    }

    if (visited.containsKey(node)) {
      return visited.get(node);
    }

    Node clone = new Node(node.val);
    visited.put(node, clone);

    for (Node neighbor : node.neighbors) {
      clone.neighbors.add(cloneGraph(neighbor));
    }

    return clone;
  }

  // USING BFS
  // public Node cloneGraph(Node node) {
  // if (node == null) {
  // return node;
  // }

  // Map<Node, Node> visited = new HashMap<>();
  // Queue<Node> queue = new LinkedList<>();
  // queue.add(node);
  // visited.put(node, new Node(node.val));

  // while (!queue.isEmpty()) {
  // Node current = queue.remove();

  // for (Node neighbor : current.neighbors) {
  // if (!visited.containsKey(neighbor)) {
  // visited.put(neighbor, new Node(neighbor.val));
  // queue.add(neighbor);
  // }

  // visited.get(current).neighbors.add(visited.get(neighbor));
  // }
  // }

  // return visited.get(node);
  // }
}