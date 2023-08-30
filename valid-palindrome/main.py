# https://leetcode.com/problems/valid-palindrome/


class Solution:
    # METHOD 1 - USING UTIL FUNCTIONS
    # 53ms / 17.8MB
    def isPalindrome(self, s: str) -> bool:
        s = ("".join([c for c in s if str.isalnum(c)])).lower()
        return s == s[::-1]

    # METHOD 2 - USING POINTERS
    # 44ms / 17.2MB
    # TIME: O(n)
    # O(n) for outer loop
    #   O(1) for isalnum
    #   O(1) for lower

    def isPalindrome(self, s: str) -> bool:
        i = 0
        j = len(s) - 1

        while i < j:
            cI = s[i]
            if not str.isalnum(cI):
                i += 1
                continue

            cJ = s[j]
            if not str.isalnum(cJ):
                j -= 1
                continue

            if cI.lower() != cJ.lower():
                return False

            i += 1
            j -= 1

        return True


s = Solution()
print(s.isPalindrome("A man, a plan, a canal: Panama"))  # True
print(s.isPalindrome(" "))  # True
print(s.isPalindrome("racecar"))  # True
print(s.isPalindrome("panama"))  # False
