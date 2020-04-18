class Solution {
  public static int maxProfit(int[] prices) {
    if (prices == null || prices.length < 2) {
      return 0;
    }

    int answer = 0;
    int minPrice = Integer.MAX_VALUE;

    for (int i = 0; i < prices.length; i++) {
      if (prices[i] < minPrice) {
        minPrice = prices[i];
      } else {
        answer = Math.max(answer, prices[i] - minPrice);
      }
    }

    return answer;
  }

  public static void main(String[] args) {
    System.out.println(Solution.maxProfit(new int[] { 7, 1, 5, 3, 6, 4 })); // 5
  }
}