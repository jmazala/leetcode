class Solution:
    def numDecodings(self, s: str) -> int:
        if len(s) == 0:
            return 0

        # no ways to decode a number starting with 0
        if s[0] == '0':
            return 0

        dp = [0] * (len(s) + 1)
        dp[0] = 1  # 1 way to decode empty string is empty
        dp[1] = 1  # 1 way to decode a single digit string (can't be '0')

        for i in range(2, len(s) + 1):
            if s[i-1:i] > '0':  # can't decode it as a single digit if it's a 0
                dp[i] += dp[i-1]

            if s[i-2:i] >= '10' and s[i-2:i] <= '26':  # can decode as 2 digits
                dp[i] += dp[i-2]

        return dp[-1]


s = Solution()
print(s.numDecodings('2685'))
