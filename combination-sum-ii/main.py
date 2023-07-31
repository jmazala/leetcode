# https://leetcode.com/problems/combination-sum-ii/

from typing import List


class Solution:
    # TIME: O(2^N)
    #   O (n log n) to sort
    #   O(2^n) if we explore all combinations of the input array
    #     2 options per iteration, take or do not take
    # SPACE: O(combinations) + O(n)
    #   O(n) for prefix
    #   O(n) for recursion stack
    #   O(combinations) for the result
    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        self.combinations = []
        candidates.sort()
        self.helper(candidates, target, 0, [])
        return self.combinations

    def helper(
        self, candidates: List[int], remaining: int, i: int, prefix: List[int]
    ) -> None:
        if remaining == 0:
            self.combinations.append(list(prefix))
            return

        for curI in range(i, len(candidates)):
            # Only DFS duplicate numbers 1 time
            if curI > i and candidates[curI] == candidates[curI - 1]:
                continue

            num = candidates[curI]
            if remaining - num < 0:
                break

            prefix.append(num)
            self.helper(candidates, remaining - num, curI + 1, prefix)
            prefix.pop()


s = Solution()
print(s.combinationSum2(candidates=[10, 1, 2, 7, 6, 1, 5], target=8))
