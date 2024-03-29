# https://leetcode.com/problems/combination-sum/

from typing import List


class Solution:
    # RECURSION + BACKTRACKING (DFS)
    # Add numbers to the combination until you hit the target
    # If adding the number would exceed target, do not add it
    # TIME: O(N^# combinations + 1)
    #   This is DFS of n-ary tree where # of steps = # of nodes in the tree
    #   At each node, constant time to process
    #   Duplicating the array (to store in output) would, at worst case be at a leaf node of this n-ary tree
    #   Which means it would take O(target / min(candidate))
    # Number of nodes in an N-ary tree of (# combinations) height is N^(# combiations + 1)
    # SPACE: O(number of combinations)
    #   Prefix / recursion stack is upper bounded by O(target / min(candidates))
    #   Output array is upper bounded by # of combinations possible
    # NOTE:  Problem statement says all candidate values are between 2 and 40
    # The algorithm would differ if we allowed negative numbers (theoretically infinite as x + -x = 0)
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        self.combinations = []
        candidates.sort()  # So we can stop early
        self.findCombinations(candidates, target, 0, [])
        return self.combinations

    # pass in i to avoid duplicate combinations in a different order
    def findCombinations(self, candidates, remaining, i, prefix):
        print(
            f"findCombinations(candidates={candidates}, remaining={remaining}, i={i}, prefix={prefix})"
        )
        if remaining == 0:
            self.combinations.append(list(prefix))  # deep copy
            return

        # This doesn't work I don't know why.  At some point in debugger i see curI = 1 and num = 2 but candidates[1] is 3 (??)
        # for curI, num in enumerate(candidates, start=i):
        for curI in range(i, len(candidates)):
            num = candidates[curI]

            # this is where sorting the array could be an optimization
            # but that depends on the distribution of candidates, w.r.t value of target
            if remaining - num < 0:
                break

            prefix.append(num)
            self.findCombinations(candidates, remaining - num, curI, prefix)
            prefix.pop()


s = Solution()
print(s.combinationSum(candidates=[2, 3, 6, 7], target=7))  # [[2,2,3],[7]]
# print(
#     s.combinationSum(candidates=[2, 3, 5], target=8)
# )  # [[2, 2, 2, 2], [2, 3, 3], [3, 5]]
# print(s.combinationSum(candidates=[2], target=1))  # []
