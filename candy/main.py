# https://leetcode.com/problems/candy


from typing import List


class Solution:
    # APPROACH 1 - 2 passes through the array, 2 arrays
    # Consider how many candies a child would get based on only the left neighbor
    # Do the same for the right neighbor
    # Thus, the candy a child gets would be whichever is greater (based on left or based on right)
    # TIME: O(n)
    # SPACE: O(n)
    def candy(self, ratings: List[int]) -> int:
        leftCandies = [1] * len(ratings)
        for i in range(1, len(ratings)):
            if ratings[i] > ratings[i - 1]:
                leftCandies[i] = 1 + leftCandies[i - 1]

        rightCandies = [1] * len(ratings)
        for i in range(len(ratings) - 2, -1, -1):
            if ratings[i] > ratings[i + 1]:
                rightCandies[i] = 1 + rightCandies[i + 1]

        sum = 0
        for i in range(len(ratings)):
            sum += max(leftCandies[i], rightCandies[i])

        return sum

    # APPROACH 2 - 2 passes through the array, 1 array
    # The same as above, but only use 1 intermediary array
    def candy(self, ratings: List[int]) -> int:
        candies = [1] * len(ratings)

        for i in range(1, len(ratings)):
            if ratings[i] > ratings[i - 1]:
                candies[i] = 1 + candies[i - 1]

        sum = candies[len(ratings) - 1]
        for i in range(len(ratings) - 2, -1, -1):
            if ratings[i] > ratings[i + 1]:
                candies[i] = max(candies[i], 1 + candies[i + 1])

            sum += candies[i]

        return sum

    # APPROACH 3 - single pass, constant space
    # Candies are always distributed in increments of 1
    # local minimum number of candies is 1.  So sub-distributions are
    # 1,2,3, ... n or n,...,2,1
    # Which is n(n+1) / 2
    # Rankings array is really a series of rising and falling slopes
    # When slope is rising, distribution is 1,2,... n
    # When falling, distribution is n, ..., 2, 1
    # Where do we put the peak?
    # peak point count needs to be max of the rising or falling slope on either side
    # thus peak is included in whichever slope is longer
    # Same with valleys (but a valley is always 1)
    def candy(self, ratings: List[int]) -> int:
        if len(ratings) <= 1:
            return len(ratings)

        candies = 0
        up = 0
        down = 0
        oldSlope = 0

        for i in range(1, len(ratings)):
            newSlope = 0
            if ratings[i] > ratings[i - 1]:
                newSlope = 1
            elif ratings[i] < ratings[i - 1]:
                newSlope = -1

            if oldSlope > 0 and newSlope == 0 or oldSlope < 0 and newSlope >= 0:
                candies += count(up) + count(down) + max(up, down)
                up = 0
                down = 0

            if newSlope > 0:
                up += 1
            elif newSlope < 0:
                down += 1
            else:
                candies += 1

            oldSlope = newSlope

        candies += count(up) + count(down) + max(up, down) + 1
        return candies


def count(n):
    return (n * (n + 1)) // 2


s = Solution()
print(s.candy([12, 4, 3, 11, 34, 34, 1, 67]))  # 16
