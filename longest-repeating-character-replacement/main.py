# https://leetcode.com/problems/longest-repeating-character-replacement/
import collections


class Solution:
    # Sliding window.  Find max sliding window where there are at most 3 distinct chars
    def characterReplacement(self, s: str, k: int) -> int:
        charHash = collections.defaultdict(int)
        maxFrequency = 0
        left = 0

        for right in range(len(s)):
            # do calculations
            c = s[right]
            charHash[c] += 1
            maxFrequency = max(charHash[c], maxFrequency)
            windowSize = right - left + 1

            # shrink window if needed
            # validity is windowSize - maxFrequency <= k
            # Because we never decrement max frequency, we'll never shrink beyond
            # the largest sliding window seen.
            if windowSize - maxFrequency > k:
                charToRemove = s[left]
                charHash[charToRemove] -= 1
                left += 1

            # expand window (implicit in for loop)

        # right - left + 1 is the largest window we've seen
        # because we never shrink a window beyond when its found to be valid
        return right - left + 1


s = Solution()
print(s.characterReplacement("ABAB", 2))  # 4
print(s.characterReplacement("AABABBA", 1))  # 4
