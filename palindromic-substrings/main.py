# https://leetcode.com/problems/palindromic-substrings/


class Solution:
    # METHOD 1 - DYNAMIC PROGRAMMING
    # Just like longest palindrome substring,
    # Use DP to calculate where all substrings are
    # Length 1 and 2 are precalculated
    # Length 3 and onwards depend on previous calculations
    # 156ms / 24.4MB
    def countSubstrings(self, s: str) -> int:
        if len(s) < 2:
            return 1

        answer = 0
        n = len(s)
        # dp[i][j] means is there a palindrome starting at i, ending at j
        dp = [[False] * n for _ in range(n)]

        # Palindromes of length 1
        for i in range(n):
            dp[i][i] = True
            answer += 1

        # Palindromes of length 2
        for i in range(n - 1):
            if s[i] == s[i + 1]:
                dp[i][i + 1] = True
                answer += 1

        # Palindromes of 3 and onwards
        for gap in range(2, n):
            for i in range(n - gap):
                j = i + gap
                if s[i] == s[j] and dp[i + 1][j - 1]:
                    dp[i][j] = True
                    answer += 1

        return answer

    # METHOD 2 - Expand at each index
    # 99ms / 16.4MB
    def countSubstrings(self, s: str) -> int:
        if len(s) < 2:
            return 1

        answer = 0

        for i in range(0, len(s)):
            # Palindrome can start with a single char in the middle, or pair of chars in the middle
            answer += self.palindromeFrom(s, i, i)  # ODD
            answer += self.palindromeFrom(s, i - 1, i)

        return answer

    def palindromeFrom(self, s, left, right):
        count = 0
        while left >= 0 and right < len(s) and s[left] == s[right]:
            left -= 1
            right += 1
            count += 1

        return count


s = Solution()

print(s.countSubstrings("abc"))  # 3
print(s.countSubstrings("aaa"))  # 6
