import java.util.*;

class Solution {
  private static int[] DURATIONS = { 1, 7, 30 };

  public int mincostTickets(int[] days, int[] costs) {
    if (days.length == 0) {
      return 0;
    }

    if (days.length == 1) {
      return costs[0];
    }
    
    int[] memo = new int[days.length];
    Arrays.fill(memo, -1);
    return helper(0, days, costs, memo);
  }

  private int helper(int index, int[] days, int[] costs, int[] memo) {
    // base case
    if (index >= days.length) {
      return 0;
    }

    if (memo[index] > -1) {
      return memo[index];
    }

    int currentDay = days[index];
    int j = index + 1;
    int cost = Integer.MAX_VALUE;

    // iterate through days and DURATIONS
    for (int k = 0; k < 3; k++) {
      int ticketDuration = DURATIONS[k];
      int ticketCost = costs[k];
      int maxDay = currentDay + ticketDuration;
      // recurse forwards until we're too far
      while (j < days.length) {
        int nextDay = days[j];
        if (nextDay < maxDay) {
          j++;
        } else {
          break;
        }
      }

      cost = Math.min(cost, ticketCost + helper(j, days, costs, memo));
    }

    memo[index] = cost;
    return memo[index];
  }
}