# https://leetcode.com/problems/longest-substring-without-repeating-characters/

import collections


class Solution:
    # METHOD 1 - WITH SLIDING WINDOW FORMULA
    def lengthOfLongestSubstring(self, s: str) -> int:
        if len(s) < 2:
            return len(s)

        counts = collections.defaultdict(int)
        left = 0
        right = 0
        answer = 0

        while right < len(s):
            cR = s[right]
            # # modify current state
            counts[cR] += 1

            # # try to shrink the window
            while left <= right and counts[cR] > 1:
                # do calculations
                cL = s[left]
                counts[cL] -= 1
                left += 1

            answer = max(answer, right - left + 1)

            # expand the window
            right += 1

        return answer

    # METHOD 2 - NOTICE WE ONLY HAVE 1 VARIABLE TO TRACK (SAME CHAR)
    def lengthOfLongestSubstring(self, s: str) -> int:
        if len(s) < 2:
            return len(s)

        charSet = set()
        answer = 0
        left = 0
        right = 0

        while right < len(s):
            cR = s[right]

            if cR not in charSet:
                charSet.add(cR)
                answer = max(answer, right - left + 1)
                right += 1
            else:
                cL = s[left]
                charSet.remove(cL)
                left += 1

        return answer

    # METHOD 3 - JUMP INDICES
    def lengthOfLongestSubstring(self, s: str) -> int:
        if len(s) < 2:
            return len(s)

        hash = {}
        answer = 0
        left = 0
        right = 0

        while right < len(s):
            cR = s[right]

            if cR in hash:
                # We need the max operator here, because left
                # may have already skipped past the previous index of
                # this repeated char
                left = max(hash[cR] + 1, left)

            answer = max(answer, right - left + 1)
            hash[cR] = right
            right += 1

        return answer


s = Solution()
print(s.lengthOfLongestSubstring("abcabcbb"))  # 3
print(s.lengthOfLongestSubstring("bbbbb"))  # 1
print(s.lengthOfLongestSubstring("pwwkew"))  # 3
print(s.lengthOfLongestSubstring("abcabcbbabcd"))  # 4
