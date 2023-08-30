from typing import List


class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        profit = 0
        minPrice = float("inf")

        for price in prices:
            minPrice = min(price, minPrice)
            profit = max(profit, price - minPrice)

        return profit


s = Solution()
print(s.maxProfit([7, 1, 5, 3, 6, 4]))  # 5
print(s.maxProfit([7, 6, 4, 3, 1]))  # 0
