# https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/description/


import collections


class Solution:
    def lengthOfLongestSubstringKDistinct(self, s: str, k: int) -> int:
        if len(s) < k:
            return len(s)

        hash = collections.defaultdict(int)
        left = 0
        answer = 0

        for right, c in enumerate(s):
            hash[c] += 1

            while len(hash) > k:
                cToRemove = s[left]
                hash[cToRemove] -= 1

                if hash[cToRemove] == 0:
                    del hash[cToRemove]

                left += 1

            answer = max(answer, right - left + 1)

        return answer


s = Solution()
print(s.lengthOfLongestSubstringKDistinct("eceba", 2))  # 3
print(s.lengthOfLongestSubstringKDistinct("aa", 1))  # 2
print(s.lengthOfLongestSubstringKDistinct("aa", 1))  # 2
print(s.lengthOfLongestSubstringKDistinct("abbaacabbbcc", 1))  # 3
print(s.lengthOfLongestSubstringKDistinct("abbaacabbbcc", 2))  # 5
