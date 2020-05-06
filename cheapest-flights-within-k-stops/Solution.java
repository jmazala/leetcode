import java.util.*;

class Solution {
  class HeapItem {
    int stopsRemaining;
    int price;
    int city;

    public HeapItem(int stopsRemaining, int price, int city) {
      this.stopsRemaining = stopsRemaining;
      this.price = price;
      this.city = city;
    }
  }

  // USING A 2D ARRAY FOR THE GRAPH (FASTER BECAUSE N <= 100)
  public int findCheapestPrice(int n, int[][] flights, int src, int dst, int K) {
    // STEP 1 is build a graph for each flight
    int[][] graph = new int[n][n];

    for (int[] flight : flights) {
      int from = flight[0];
      int to = flight[1];
      int price = flight[2];
      graph[from][to] = price;
    }

    // use a priority queue. the callback keeps it sorted by price (Dijkstra's algorithm)
    PriorityQueue<HeapItem> heap = new PriorityQueue<>((a, b) -> a.price - b.price);
    heap.offer(new HeapItem(K + 1, 0, src));

    while (!heap.isEmpty()) {
      HeapItem item = heap.poll();

      if (item.city == dst) {
        return item.price;
      }

      if (item.stopsRemaining > 0) {
        // find it's neighbor
        for (int i = 0; i < n; i++) {
          // this mean's there's a flight there.
          if (graph[item.city][i] > 0) {
            heap.offer(new HeapItem(item.stopsRemaining - 1, item.price + graph[item.city][i], i));
          }
        }
      }
    }

    return -1;
  }

  // USING A HASHMAP FOR THE GRAPH (THEORETICALLY FASTER FOR LARGE DATA SETS)
  // public int findCheapestPrice(int n, int[][] flights, int src, int dst, int K) {
  //   Map<Integer, Map<Integer, Integer>> graph = new HashMap<>();
  //   for (int[] flight : flights) {
  //     graph.put(flight[0], graph.getOrDefault(flight[0], new HashMap<>()));
  //     graph.get(flight[0]).put(flight[1], flight[2]);
  //   }

  //   PriorityQueue<HeapItem> heap = new PriorityQueue<>((a, b) -> a.price - b.price);
  //   heap.offer(new HeapItem(K + 1, 0, src));

  //   while (!heap.isEmpty()) {
  //     HeapItem item = heap.poll();

  //     if (item.city == dst) {
  //       return item.price;
  //     }

  //     if (item.stopsRemaining > 0) {
  //       for (Map.Entry<Integer, Integer> entry : graph.getOrDefault(item.city, new HashMap<>()).entrySet()) {
  //         heap.offer(new HeapItem(item.stopsRemaining - 1, item.price + entry.getValue(), entry.getKey()));
  //       }
  //     }
  //   }

  //   return -1;
  // }
}