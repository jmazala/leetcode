# https://leetcode.com/problems/longest-common-subsequence/
from functools import cache


class Solution:
    # METHOD 1 - DP
    # Make a m x n dp matrix
    #   m = len(text1) + 1, n = len(text2) + 1 since we can count "" for text or text2
    #   dp[i][j] = longest common subsequence for prefixes of text1 / text lengths i, j
    # Iterate through prefixes of each length for text1, comparing with prefix for each length of text2
    #   When we see a match, that's the equivalent of adding 1 to longest substring of prefix length - 1 for BOTH strings
    #   Otherwise, it's the max of longest substring of prefix length - 1 for EITHER string
    # TIME: O(mn)
    #   O(mn) to make DP matrix
    #   O(mn) to iterate through strings
    # SPACE: O(mn) for dp matrix
    # We could improve on space by only keeping the previous row
    # 618ms / 41.7MB
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        dp = [[0] * (len(text2) + 1) for _ in range(len(text1) + 1)]

        for i in range(1, len(text1) + 1):
            for j in range(1, len(text2) + 1):
                c1 = text1[i - 1]
                c2 = text2[j - 1]

                if c1 == c2:
                    dp[i][j] = 1 + dp[i - 1][j - 1]
                else:
                    dp[i][j] = max(dp[i][j - 1], dp[i - 1][j])

        return dp[-1][-1]

    # METHOD 2 - RECURSION
    # Similar to DP above, we just use the @cache decorator for memoization
    # These should be equivalent minus overhead for loops or for recursion
    # In most languages, iteration is faster than recursion
    # TIME: O(mn)
    # SPACE: O(mn)
    # 1189ms / 311.2 MB
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        @cache
        def helper(i, j) -> int:
            if i == len(text1) or j == len(text2):
                return 0

            if text1[i] == text2[j]:
                return 1 + helper(i + 1, j + 1)

            return max(helper(i + 1, j), helper(i, j + 1))

        return helper(0, 0)

    # METHOD 3 - DP W/ SPACE OPTIMIZATION
    # TIME: O(mn)
    # SPACE: O(m)
    # 510ms / 16.4MB
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        # Optimize for space by storing shortest in text1
        if len(text2) < len(text1):
            text1, text2 = text2, text1

        previous = [0] * (len(text1) + 1)
        current = [0] * (len(text1) + 1)

        for j in range(1, len(text2) + 1):
            for i in range(1, len(text1) + 1):
                c1 = text1[i - 1]
                c2 = text2[j - 1]

                if c1 == c2:
                    current[i] = 1 + previous[i - 1]
                else:
                    current[i] = max(current[i - 1], previous[i])

            previous, current = current, previous

        return previous[-1]


s = Solution()
print(s.longestCommonSubsequence("abcde", "abc"))  # 3
