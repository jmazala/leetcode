# https://leetcode.com/problems/climbing-stairs/


class Solution:
    # METHOD 1 - USING DP
    # TIME: O(N)
    # SPACE: O(N)
    # 40ms / 16.2MB
    def climbStairs(self, n: int) -> int:
        if n == 1:
            return 1

        dp = [0] * (n + 1)
        dp[1] = 1
        dp[2] = 2

        for i in range(3, n + 1):
            dp[i] = dp[i - 1] + dp[i - 2]

        return dp[n]

    # METHOD 2 - FIBONACCI
    # This isn't much better for small cases
    # 40ms / 16.3MB
    def climbStairs(self, n: int) -> int:
        if n == 1:
            return 1

        first = 1
        second = 2

        for i in range(3, n + 1):
            third = first + second
            first = second
            second = third

        return second


s = Solution()
print(s.climbStairs(10))
