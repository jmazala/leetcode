# https://leetcode.com/problems/unique-number-of-occurrences/

import collections
from typing import List


class Solution:
    def uniqueOccurrences(self, arr: List[int]) -> bool:
        hash = collections.defaultdict(int)
        for num in arr:
            hash[num] += 1

        return len(set(hash.values())) == len(hash.values())
