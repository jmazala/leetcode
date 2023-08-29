# https://leetcode.com/problems/group-anagrams/
from collections import defaultdict
from typing import List


class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        hash = defaultdict(list)

        for s in strs:
            hash[Solution.charCountString(s)].append(s)

        return list(hash.values())

    @staticmethod
    def charCountString(s):
        counts = [0] * 26

        for c in s:
            counts[ord(c) - ord("a")] += 1
        return ".".join([str(count) for count in counts])


s = Solution()

print(s.groupAnagrams(["bat", "atb", "cat", "dog", "god", "x", "x", "xx", "xy", "yx"]))
