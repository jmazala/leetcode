class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        coins.sort()

        dp = [amount + 1 for _ in range(amount + 1)]
        dp[0] = 0

        for i in range(amount + 1):
          for j in range(len(coins)):
            if coins[j] > i:
              break
            dp[i] = min(dp[i], dp[i - coins[j]] + 1)
        
        return -1 if dp[amount] == amount + 1 else dp[amount]