# https://leetcode.com/problems/longest-palindromic-substring/


class Solution:
    # METHOD 1 - CHECK ODD / EVEN FROM EVERY POSITION
    # TIME: O(N^2)
    # SPACE: O(N)
    # 455ms / 16.3MB
    def longestPalindrome(self, s: str) -> str:
        if len(s) < 2:
            return s

        answer = s[0]

        for i in range(1, len(s)):
            # Palindrome can start with a single char in the middle, or pair of chars in the middle
            palindromeFromOdd = self.palindromeFrom(s, i, i)
            palindromeFromEven = (
                "" if s[i - 1] != s[i] else self.palindromeFrom(s, i - 1, i)
            )

            if len(palindromeFromOdd) > len(answer):
                answer = palindromeFromOdd

            if len(palindromeFromEven) > len(answer):
                answer = palindromeFromEven

        return answer

    def palindromeFrom(self, s, left, right):
        while left > 0 and right < len(s) - 1 and s[left - 1] == s[right + 1]:
            left -= 1
            right += 1

        return s[left : right + 1]

    # METHOD 2 - EXPAND PALINDROMES BUT USE INDICES
    # TIME: O(N^2)
    # SPACE: O(1)
    # 473ms / 16.2MB these metrics are meaningless lol
    def longestPalindrome(self, s: str) -> str:
        if len(s) < 2:
            return s

        answer = (0, 0)

        for i in range(1, len(s)):
            # Palindrome can start with a single char in the middle, or pair of chars in the middle
            palindromeFromOdd = self.palindromeFrom(s, i, i)
            palindromeFromEven = (
                (0, 0) if s[i - 1] != s[i] else self.palindromeFrom(s, i - 1, i)
            )

            if palindromeFromOdd[1] - palindromeFromOdd[0] > answer[1] - answer[0]:
                answer = palindromeFromOdd

            if palindromeFromEven[1] - palindromeFromEven[0] > answer[1] - answer[0]:
                answer = palindromeFromEven

        return s[answer[0] : answer[1] + 1]

    def palindromeFrom(self, s, left, right):
        while left > 0 and right < len(s) - 1 and s[left - 1] == s[right + 1]:
            left -= 1
            right += 1

        return (left, right)

    # METHOD 3 - DYNAMIC PROGRAMMING (WAY INFERIOR TO 2)
    # Check for palindromes of length 1, 2, ... len(s)
    # Use DP to calculate in O(1) if a palindrome exists by
    # referring to the palindrome of length -1 before it
    # 2091ms / 24.3MB
    def longestPalindrome(self, s: str) -> str:
        if len(s) < 2:
            return s

        answer = (0, 0)
        n = len(s)
        # dp[i][j] means is there a palindrome starting at i, ending at j
        dp = [[False] * n for _ in range(n)]

        # Palindromes of length 1
        for i in range(n):
            dp[i][i] = True

        # Palindromes of length 2
        for i in range(n - 1):
            if s[i] == s[i + 1]:
                dp[i][i + 1] = True
                answer = (i, i + 1)

        # Palindromes of 3 and onwards
        for gap in range(2, n):
            for i in range(n - gap):
                j = i + gap
                if s[i] == s[j] and dp[i + 1][j - 1]:
                    dp[i][j] = True
                    answer = (i, j)

        return s[answer[0] : answer[1] + 1]


s = Solution()
print(s.longestPalindrome("babad"))  # bab
print(s.longestPalindrome("cbbd"))  # bb
print(s.longestPalindrome("abaxyzzyxfz"))  # xyzzyx
