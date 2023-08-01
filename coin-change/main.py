# https://leetcode.com/problems/coin-change/

from typing import List


class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        coins.sort()

        # 0 coins to make 0 cents, and impossible amount for the rest
        dp = [0] + [amount + 1] * amount

        for i in range(1, amount + 1):
            for coin in coins:
                if coin > i:
                    break

                dp[i] = min(dp[i], dp[i - coin] + 1)

        return -1 if dp[amount] == amount + 1 else dp[amount]


s = Solution()
print(s.coinChange([1, 2, 5], 11))  # 3
