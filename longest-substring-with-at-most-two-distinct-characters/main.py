# https://leetcode.com/problems/longest-substring-with-at-most-two-distinct-characters


import collections


class Solution:
    def lengthOfLongestSubstringTwoDistinct(self, s: str) -> int:
        if len(s) < 3:
            return len(s)

        answer = 0
        hash = collections.defaultdict(int)
        left = 0

        for right, c in enumerate(s):
            # do calculation
            hash[c] += 1

            # try to shrink window
            while len(hash) > 2:
                cToRemove = s[left]
                hash[cToRemove] -= 1

                if hash[cToRemove] == 0:
                    del hash[cToRemove]

                left += 1

            # update answer if necessary
            answer = max(answer, right - left + 1)

            # (implicit bc for loop) increase sliding window

        return answer


s = Solution()
print(s.lengthOfLongestSubstringTwoDistinct("abbaacabbbcc"))  # 5
