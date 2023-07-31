# https://leetcode.com/problems/wildcard-matching/

import re


class Solution:
    # APPROACH 1 - RECURSION W/ MEMOIZATION
    # Match chars with each other or ?
    # In the case of *, try every combination
    # This is time consuming because of recursion depth for very long strings
    # TIME: O(S * P * (S + P))
    # Removing duplicate stars takes O(P)
    # Helper function (non-memoized):
    #   O(S+P) to create key
    #   O(1) to check key in memo
    #   if p == "*" or p == s is O(min(S,P))
    #   len checks are O(S + P)
    #   O(s - 1 * p - 1) for a match (the call, and creating substrings)
    #   O(1) to cache result
    #   so O(1) for memoized, O(S + P) for non-memoized
    # This could be improved by passing pointers iS and iP instead of substrings s[1:] p[1:]

    def isMatch(self, s: str, p: str) -> bool:
        # Remove duplicate *
        pattern = r"\*{2,}"
        p = re.sub(pattern, "*", p)
        memo = {}
        return Solution.helper(s, p, memo)

    @staticmethod
    def helper(s: str, p: str, memo: dict) -> bool:
        key = (s, p)
        if key in memo:
            return memo[key]

        if p == "*" or p == s:
            memo[key] = True
            return True

        if len(p) == 0 or len(s) == 0:
            memo[key] = False
            return False

        cS = s[0]
        cP = p[0]

        if cP == "?" or cS == cP:
            memo[key] = Solution.helper(s[1:], p[1:], memo)
            return memo[key]

        if cP == "*":
            # Match no chars in s or 1+ chars in s
            if Solution.helper(s, p[1:], memo) or Solution.helper(s[1:], p, memo):
                memo[key] = True
                return True

        memo[key] = False
        return False

    # APPROACH 2 - DP
    # Avoid recursion depth.  The memoization from above makes us think DP could work
    # (Similar problem to edit distance, https://leetcode.com/problems/edit-distance/solution/
    # Reduce this problem to simple ones
    # dp[i][j] is a match between i chars of p and j chars of s
    # if we know dp[i-1][j-1], and if recent chars are the same or ?, this is also a match
    # if the pattern is *, and there was a match of dp[i-1][j-1], * is either still a match, or match as many future chars as you want
    # dp[i-1][j] = True for all i >= j-1
    # TIME: O(S * P) as we explore P fully, and (perhaps) all of S per P
    # SPACE: O(S*P) for dp
    def isMatch(self, s: str, p: str) -> bool:
        if p == s or p == "*" * len(p):
            return True

        # Remove duplicate *
        pattern = r"\*{2,}"
        p = re.sub(pattern, "*", p)

        dp = [[False] * (len(s) + 1) for _ in range(len(p) + 1)]
        dp[0][0] = True

        for i in range(1, len(p) + 1):
            cP = p[i - 1]

            # with a *, search for a previous match and extend to the end of s as True
            if cP == "*":
                # dp[i-1][j-1] is string-pattern match for previous step (1 char before)
                # Find the first idx in s with the previous match
                # we're basically looking for the first spot where this * can help us
                j = 1
                while j < len(s) + 1 and not dp[i - 1][j - 1]:
                    j += 1

                dp[i][j - 1] = dp[i - 1][j - 1]

                # if (s) matches (p), when s matches p* as well
                while j < len(s) + 1:
                    dp[i][j] = True
                    j += 1

            elif cP == "?":
                # Adding a ? doesn't do anything to improve on previous failures
                for j in range(1, len(s) + 1):
                    dp[i][j] = dp[i - 1][j - 1]
            else:
                for j in range(1, len(s) + 1):
                    cS = s[j - 1]
                    dp[i][j] = dp[i - 1][j - 1] and cP == cS

        return dp[len(p)][len(s)]

    # # APPROACH 3 - BACKTRACKING
    # # We could improve this by not having to compute the entire matrix
    # # For each *, we either match [0, 1, 2, ... len(s) characters]
    # # First try matching 0 characters.  If that fails, backtrack
    # # (i.e.) now try 1 character.  Keep backtracking until full match
    # def isMatch(self, s: str, p: str) -> bool:
    #     # Remove duplicate *
    #     pattern = r"\*{2,}"
    #     p = re.sub(pattern, "*", p)

    #     sIdx = 0
    #     pIdx = 0
    #     starIdx = -1
    #     tempSIdx = -1

    #     while sIdx < len(s):
    #         if pIdx < len(p) and (p[pIdx] == "?" or s[sIdx] == p[pIdx]):
    #             sIdx += 1
    #             pIdx += 1

    #         elif pIdx < len(p) and p[pIdx] == "*":
    #             # check for * matching 0 chars
    #             starIdx = pIdx
    #             tempSIdx = sIdx
    #             pIdx += 1

    #         # if pattern char != string char, or pattern is used up and theres no more * in pattern
    #         elif starIdx == -1:
    #             return False
    #         else:
    #             # pattern char != string char, or pattern is used up, there WAS * char in pattern before
    #             pIdx = starIdx + 1
    #             sIdx = tempSIdx + 1
    #             tempSIdx = sIdx

    #     # remaining should all be * for p
    #     return p[pIdx:] == "*" * len(p[pIdx:])


s = Solution()

print(s.isMatch("", "*a"))  # False
print(s.isMatch("", "a"))  # False
print(s.isMatch("", "?"))  # False
print(s.isMatch("aba", "*bc"))  # False
print(s.isMatch("aa", "a"))  # False
print(s.isMatch("cb", "?a"))  # False
print(s.isMatch("acdcb", "a*c?b"))  # False
print(s.isMatch("", ""))  # True
print(s.isMatch("", "*"))  # True
print(s.isMatch("", "******"))  # True
print(s.isMatch("a", "?"))  # True
print(s.isMatch("a", "*?"))  # True
print(s.isMatch("a", "?*"))  # True
print(s.isMatch("a", "*"))  # True
print(s.isMatch("a", "**"))  # True
print(s.isMatch("aa", "*"))  # True
print(s.isMatch("aa", "**"))  # True
print(s.isMatch("aa", "a**"))  # True
print(s.isMatch("aba", "a**"))  # True
print(s.isMatch("aba", "a*"))  # True
print(s.isMatch("aba", "*a"))  # True
print(s.isMatch("aba", "*ba"))  # True
print(s.isMatch("aba", "*b*"))  # True
print(s.isMatch("aba", "ab*"))  # True
print(s.isMatch("adcbdk", "*a*b?k"))  # True
