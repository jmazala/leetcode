class Solution:
  def mincostTickets(self, days: List[int], costs: List[int]) -> int:
    if len(days) == 0:
        return 0

    if len(days) == 1:
        return costs[0]

    return self.helper(0, days, costs, [None] * len(days))
  
  def helper(self, i, days, costs, memo):
    if i >= len(days):
      return 0
    
    if memo[i] is not None:
      return memo[i]
    
    currentDay = days[i]
    currentCost = float("inf")
    j = i + 1
    
    for k in range(3):
      ticketCost = costs[k]
      ticketDuration = [1, 7, 30][k]
      maxDay = currentDay + ticketDuration
      
      while (j < len(days)):
        nextDay = days[j]
        if nextDay >= maxDay:
            break
        j += 1
      
      currentCost = min(currentCost, ticketCost + self.helper(j, days, costs, memo))
    
    memo[i] = currentCost
    return currentCost