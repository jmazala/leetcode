class Solution:
    def numDecodings(self, s: str) -> int:
        if len(s) == 0:
            return 0

        # no ways to decode a number starting with 0
        if s[0] == "0":
            return 0

        dp = [0] * (len(s) + 1)
        dp[0] = 1  # 1 way to decode empty string is empty
        dp[1] = 1  # 1 way to decode a single digit string (can't be '0')

        # We can build on two previous indices (i-1, i-2)
        # Since 2 digit decodes are possible
        # At index 1, we check the i-1th character of the string
        for i in range(2, len(s) + 1):
            currentChar = s[i - 1]

            # We can do a valid single digit decode for anything but "0"
            # So include all the ways to decode from the char before
            # (pass the baton)
            if currentChar != "0":  # can't decode it as a single digit if it's a 0
                dp[i] += dp[i - 1]

            # Check the digit before to see if this char can be
            # Included in a valid 2 digit decode
            # If so, all the ways to decode including the char before are valid
            if s[i - 2 : i] >= "10" and s[i - 2 : i] <= "26":  # can decode as 2 digits
                dp[i] += dp[i - 2]

        return dp[-1]


s = Solution()
print(s.numDecodings("2685"))  # 2
