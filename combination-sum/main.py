# https://leetcode.com/problems/combination-sum/

from copy import deepcopy
from typing import List


class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        self.combinations = []
        self.seen = set()
        candidates.sort()

        self.findCombinations(candidates, target, 0, 0, [])
        return self.combinations

    def findCombinations(self, candidates, target, i, sum, prefix):
        key = (str(prefix), i)
        if key in self.seen:
            return

        self.seen.add(key)

        if sum == target:
            self.combinations.append(prefix)
            return

        while i < len(candidates):
            num = candidates[i]

            if sum + num > target:
                break  # we sorted the array to hit this condition

            j = 0

            tempPrefix = deepcopy(prefix)
            while sum + (j * num) <= target:
                if j > 0:
                    tempPrefix.append(num)

                self.findCombinations(
                    candidates=candidates,
                    target=target,
                    i=i + 1,
                    sum=sum + (j * num),
                    prefix=tempPrefix,
                )

                j += 1

            i += 1


s = Solution()
print(s.combinationSum(candidates=[2, 3, 6, 7], target=7))  # [[2,2,3],[7]]
print(
    s.combinationSum(candidates=[2, 3, 5], target=8)
)  # [[3, 5], [2, 3, 3], [2, 2, 2, 2]]
print(s.combinationSum(candidates=[2], target=1))  # []
