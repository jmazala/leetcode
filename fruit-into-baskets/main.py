# https://leetcode.com/problems/fruit-into-baskets/

import collections
from typing import List


class Solution:
    # SLIDING WINDOW
    # Iterate over right and add a fruit to the basket
    # If we only have 2 baskets, this window is valid
    # This, keep iterating
    # otherwise, its not the right time to expand the window
    # keep its size.  Since we added a fruit on the right side, remove
    # a fruit from the left side
    # TIME: O(n)
    # SPACE: O(n) as, depending on the free, we could have 1 type of every single fruit remembered in baskets
    #   In the first half of the iteration, the window size is expanded to n/2, i.e. O(n)O(n)O(n).
    #   In the second half of the iteration, since we have to keep the window size, so it will contain all the n/2 types of
    #   fruits and end up with O(n)O(n)O(n) space.
    def totalFruit(self, fruits: List[int]) -> int:
        # Initialize our baskets
        baskets = collections.defaultdict(int)
        left = 0

        # we have to add another fruit every time
        for right, fruit in enumerate(fruits):
            baskets[fruit] += 1

            # if our sliding window exceeds 2 fruits, remove the earliest fruit
            if len(baskets) > 2:
                fruitToRemove = fruits[left]
                baskets[fruitToRemove] -= 1

                if baskets[fruitToRemove] == 0:
                    del baskets[fruitToRemove]

                left += 1

        # at the end of the iteration, the size of the sliding window represents the longest subarray
        return right - left + 1

    # SLIDING WINDOW 2
    # Keep window size as non-decreasing, but the window might contain O(n) types of fruits and take O(n) space
    # We could make sure we only have 2 baskets at any time
    # Whenever we add a new fruit on the right, if we have more than 2 baskets, just remove fruit from left
    # until current window only has 2 types of fruit
    # Window size may become smaller than before, so we can't use left and right to track
    # but we can remember max_picked to limit the contraction of the window
    def totalFruit(self, fruits: List[int]) -> int:
        baskets = collections.defaultdict(int)
        answer = 0
        left = 0

        for right, fruit in enumerate(fruits):
            baskets[fruit] += 1

            # shrink window until we've reached a valid case
            while len(baskets) > 2:
                fruitToRemove = fruits[left]
                baskets[fruitToRemove] -= 1

                if baskets[fruitToRemove] == 0:
                    del baskets[fruitToRemove]

                left += 1

            answer = max(answer, right - left + 1)

        return answer


s = Solution()
print(s.totalFruit([1, 2, 2, 1, 1, 3, 1, 2, 2, 2, 3, 3]))  # 5
