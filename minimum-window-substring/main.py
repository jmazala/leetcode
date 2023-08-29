# https://leetcode.com/problems/minimum-window-substring/

import collections


class Solution:
    # SLIDING WINDOW PROBLEM
    def minWindow(self, s: str, t: str) -> str:
        # edge case
        if not t or not s:
            return ""

        # success criteria is based on having all the chars in t present
        # in a substring of s.  use a hash to lookup that info
        sCharCounts = collections.defaultdict(int)
        tCharCounts = collections.defaultdict(int)
        for c in t:
            tCharCounts[c] += 1

        # how many UNIQUE characters we need to match in our sliding window
        # EX: Matching AABC matches 3 unique characters 'A','B','C'
        # this is faster because comparing an int is better than comparing 2 dictionaries
        charMatchesRequired = len(tCharCounts)

        # SLIDING WINDOW
        left = 0
        right = 0
        answer = [-1, len(s)]  # store indices instead of the actual substring

        while right < len(s):
            # store info based on right pointer
            c = s[right]
            if c in tCharCounts:
                sCharCounts[c] += 1

                if sCharCounts[c] == tCharCounts[c]:
                    charMatchesRequired -= 1

            # when our sliding window has a match,
            # check criteria (in this case, its shortest length)
            # # and then shrink window until we undo the match
            while left <= right and charMatchesRequired == 0:
                # check criteria (shortest substring)
                if (right - left) < (answer[1] - answer[0]):
                    answer = [left, right]

                # try to undo the match
                cL = s[left]

                if cL in sCharCounts:
                    sCharCounts[cL] -= 1

                    if sCharCounts[cL] < tCharCounts[cL]:
                        charMatchesRequired += 1  # match is undone

                left += 1

            # expand window
            right += 1

        return s[answer[0] : answer[1] + 1] if answer[0] > -1 else ""


s = Solution()

print(s.minWindow(s="ADOBECODEBANC", t="ABC"))  # BANC
print(s.minWindow("cabwefgewcwaefgcf", "cae"))  # "cwae"
print(s.minWindow("aaaaaaaaaaaabbbbbcdd", "abcdd"))  # abbbbbcdd
print(s.minWindow(s="DOG", t="GOD"))  # DOG
print(s.minWindow(s="BONES", t="BONE"))  # BONE
print(s.minWindow(s="EBONS", t="BONE"))  # EBON
print(s.minWindow("a", "a"))  # "a"
print(s.minWindow("aa", "a"))  # "a"
print(s.minWindow("a", "aa"))  # ""
