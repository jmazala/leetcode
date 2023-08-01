# https://leetcode.com/problems/minimum-window-substring/

import collections

# Make a hash of the entire string
# make 2 pointers, start and end
# move end all the way through s and make a char map the entire way
# if the char map is insufficient, return ""
# try and move start up
# try and move end back
# return substring


class Solution:
    # METHOD 1 - check smallest to largest windows
    # starting at any index in s where a character from t appears
    def minWindow(self, s: str, t: str) -> str:
        if len(t) == 1:
            return t if t in s else ""

        if len(s) == len(t):
            return s if sortedString(s) == sortedString(t) else ""

        tCharCounts = charCountMap(t)
        targetLength = len(t)

        startCandidates = []

        for i, c in enumerate(s):
            if c in tCharCounts:
                startCandidates.append(i)

        for length in range(targetLength, len(s) + 1):
            for i in startCandidates:
                substring = s[i : i + length]
                if len(substring) != length:
                    break

                sCharCounts = charCountMap(substring)

                for c in tCharCounts:
                    if tCharCounts[c] > sCharCounts[c] or c not in sCharCounts:
                        break
                else:
                    return substring

        return ""


def sortedString(s):
    return "".join(sorted(s))


def charCountMap(s):
    map = collections.defaultdict(int)
    for c in s:
        map[c] += 1

    return map


s = Solution()

print(s.minWindow("aaaaaaaaaaaabbbbbcdd", "abcdd"))  # abbbbbcdd
print(s.minWindow(s="ADOBECODEBANC", t="ABC"))  # BANC
print(s.minWindow(s="DOG", t="GOD"))  # DOG
print(s.minWindow(s="BONES", t="BONE"))  # BONE
print(s.minWindow(s="EBONS", t="BONE"))  # EBON
print(s.minWindow("a", "a"))  # "a"
print(s.minWindow("a", "aa"))  # ""
