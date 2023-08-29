import collections
from typing import List


class Solution:
    # METHOD 1 - 3 pointers
    # TIME:  O(n^2)
    #   O(n log n) for sorting
    #   O(n) for outer loop
    #     O(n) for twoSum
    # SPACE:  O(x) for answer array where x is # of combos
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        if len(nums) < 3:
            return []

        nums.sort()
        answer = []

        for i in range(len(nums) - 2):
            if nums[i] > 0:
                break

            if i == 0 or nums[i] != nums[i - 1]:
                self.twoSum(nums, i, answer)

        return answer

    def twoSum(self, nums: List[int], i: int, answer: List[List[int]]):
        j = i + 1
        k = len(nums) - 1

        while j < k:
            sum = nums[i] + nums[j] + nums[k]

            if sum > 0:
                k -= 1
            elif sum < 0:
                j += 1
            else:  # sum == 0
                answer.append([nums[i], nums[j], nums[k]])
                j += 1
                k -= 1

                # skip duplicates for j
                while j < k and nums[j] == nums[j - 1]:
                    j += 1

    # METHOD 2 - Use a hash
    # TIME: O(n^3)
    # O(n^2) to build twoSumHash
    # O(n) for outer loop
    #   O(n^2) for inner loop
    # SPACE:
    #   O(n^2) for twoSumHash
    #   O(n^3) for entries
    # SPACE:
    # def threeSum(self, nums: List[int]) -> List[List[int]]:
    #     if len(nums) < 3:
    #         return []

    #     twoSumHash = collections.defaultdict(list)

    #     for i in range(len(nums) - 1):
    #         for j in range(i + 1, len(nums)):
    #             twoSum = nums[i] + nums[j]
    #             twoSumHash[twoSum].append((i, j))

    #     mySet = set()
    #     answer = []

    #     for i in range(len(nums)):
    #         difference = 0 - nums[i]

    #         if difference in twoSumHash:
    #             for j, k in twoSumHash[difference]:
    #                 if i == j or i == k:
    #                     continue

    #                 entry = sorted([nums[i], nums[j], nums[k]])
    #                 setKey = ",".join([str(x) for x in entry])
    #                 if setKey in mySet:
    #                     continue

    #                 mySet.add(setKey)
    #                 answer.append(entry)

    #     return answer


if __name__ == "__main__":
    s = Solution()
    print(s.threeSum([-1, 0, 1, 2, -1, -4]))  # [[-1, -1, 2], [-1, 0, 1]]
