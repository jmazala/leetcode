# https://leetcode.com/problems/combination-sum-iii/

from typing import List


class Solution:
    # TIME: O(P(9,K) * O(K)) = O(9!K/(9-K)!)
    # In worst case scenario, must explore every single combination.
    # 9 choices, then 8, then 7, etc which is P(9, K) which is 9! / (9-K)!
    # And each iteration is constant time, except O(K) when we add a deep copy to self.combinations
    # SPACE: O(K) + O(9c3) is O(K) + O(1) is O(k)
    # O(k) for prefix
    # O(k) for recursion
    # For output array, this is upper bounded by 9c3 which is a constant.
    # But mathematically, there is no n such that every combination adds to n
    # So, it's whatever the number is for n that satisfies the most frequent sum of all
    # possible 3 digit combinations of 1-9 (LOL)
    def combinationSum3(self, k: int, n: int) -> List[List[int]]:
        # not possible with constraints of problem.  but good for function
        if k > 9 or k == 0 or n > 45:
            return []

        self.candidates = [i for i in range(1, 10)]
        self.combinations = []
        self.helper(n, k, 0, [])
        return self.combinations

    def helper(self, remaining, k, i, prefix):
        if len(prefix) > k:
            return

        if len(prefix) == k:
            if remaining == 0:
                self.combinations.append(list(prefix))

            return

        for curI in range(i, len(self.candidates)):
            num = self.candidates[curI]
            if remaining - num < 0:
                break
            prefix.append(num)
            self.helper(remaining - num, k, curI + 1, prefix)
            prefix.pop()


s = Solution()

print(s.combinationSum3(k=3, n=7))  # [[1,2,4]]
print(s.combinationSum3(k=3, n=9))  # [[1, 2, 6], [1, 3, 5], [2, 3, 4]]
print(s.combinationSum3(k=4, n=1))  # []
