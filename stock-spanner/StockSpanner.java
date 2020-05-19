import java.util.*;

class StockSpanner {
  // USING A STACK
  Stack<Integer> weights;
  Stack<Integer> prices;

  public StockSpanner() {
    weights = new Stack<>();
    prices = new Stack<>();
  }

  public int next(int price) {
    int weight = 1;
    while (!prices.isEmpty() && prices.peek() <= price) {
      weight += weights.pop();
      prices.pop();
    }

    prices.push(price);
    weights.push(weight);
    return weight;
  }

  // //USING LINEAR SCAN BUT SKIPPING ELEMENTS
  // List<Integer> spans;
  // List<Integer> prices;

  // public StockSpanner() {
  // // linked list to store spans
  // spans = new ArrayList<>();
  // // linked list to store prices
  // prices = new ArrayList<>();
  // }

  // public int next(int price) {
  // int span = 1;
  // int index = prices.size() - 1;
  // while (index >= 0 && prices.get(index) <= price) {
  // span += spans.get(index);
  // index -= spans.get(index);
  // }

  // spans.add(span);
  // prices.add(price);
  // return span;
  // }

  public static void main(String[] args) {
    StockSpanner S = new StockSpanner();
    List<Integer> result = new LinkedList<>();
    result.add(S.next(100)); // is called and returns 1,
    result.add(S.next(80)); // is called and returns 1,
    result.add(S.next(60)); // is called and returns 1,
    result.add(S.next(70)); // is called and returns 2,
    result.add(S.next(60)); // is called and returns 1,
    result.add(S.next(75)); // is called and returns 4,
    result.add(S.next(85)); // is called and returns 6.
    System.out.println(result); // [1,1,1,2,1,4,6]
  }
}

/**
 * Your StockSpanner object will be instantiated and called as such:
 * StockSpanner obj = new StockSpanner(); int param_1 = obj.next(price);
 */