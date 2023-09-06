# https://leetcode.com/problems/coin-change/

from typing import List


class Solution:
    # Find the min number of coins to make change
    # Given denominations of coins, and a target amount
    def coinChange(self, coins: List[int], amount: int) -> int:
        coins.sort()

        # 0 coins to make 0 cents, and IMPOSSIBLE amount for the rest (how can you use 12 coins to make $0.11?)
        # We could use float("inf"), but linter complains because return
        # value hint of this function is an int.
        # So that's why we use amount + 1
        dp = [0] + [amount + 1] * amount

        for i in range(1, amount + 1):
            for coin in coins:
                if coin > i:
                    break

                dp[i] = min(dp[i], dp[i - coin] + 1)

        return -1 if dp[amount] == amount + 1 else dp[amount]


s = Solution()
print(s.coinChange([1, 2, 5], 11))  # 3
