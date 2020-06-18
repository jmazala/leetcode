class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        profit = 0
        minPrice = float("inf")

        for price in prices:
            minPrice = min(price, minPrice)

            if (price - minPrice) > profit:
                profit = price - minPrice

        return profit
