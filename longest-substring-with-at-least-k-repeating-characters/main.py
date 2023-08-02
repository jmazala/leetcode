# https://leetcode.com/problems/longest-substring-with-at-least-k-repeating-characters/


import collections


class Solution:
    # APPROACH 1 - SLIDING WINDOW
    # We can't naturally expand and shrink a window once, but we could if we had some additional bounds
    # Iterate through the array and look for a certain # of unique characters allowed in the string
    # Start with looking for 1 unique char, and continue to n unique chars
    # (iterate through s to find how many unique chars there are)
    # At each iteration, try to build a substring with [up to] that many unique characters.
    # Keep track of each characters frequency along the way
    # If all char frequencies are >= k, this would be an acceptable string
    # (... I wonder if we could optimize this by starting each iteration with a substring
    # of length we already found to be valid.  But, the acceptance criteria check is O(1)
    # So this isn't much of an optimization. Just check anyway and use max.
    # TIME: O(N) (really O(26N)
    #   O(n) to find maxUnique
    #   O(u) for looping through max unique chars.  This isn't O(n) because the alphabet has a limited number of characters
    #   (i.e. this tops out at O(26)
    #     O(n) for sliding window
    # SPACE: O(1)
    # O(u) for charMap i.e. O(26)
    # O(1) for answer, left, right, etc
    def longestSubstring(self, s: str, k: int) -> int:
        maxUnique = len(set(s))
        charMap = None
        answer = 0

        for uniqueNeeded in range(1, maxUnique + 1):
            charMap = collections.defaultdict(int)

            left = 0
            right = 0
            uniqueFound = 0
            countWithAtLeastK = 0

            while right < len(s):
                # expand sliding window
                if uniqueFound <= uniqueNeeded:
                    c = s[right]
                    if charMap[c] == 0:
                        uniqueFound += 1

                    charMap[c] += 1
                    if charMap[c] == k:
                        countWithAtLeastK += 1

                    right += 1
                else:
                    # shrink sliding window
                    cToRemove = s[left]
                    if charMap[cToRemove] == k:
                        countWithAtLeastK -= 1

                    charMap[cToRemove] -= 1
                    if charMap[cToRemove] == 0:
                        uniqueFound -= 1
                    left += 1

                # check acceptance criteria
                if uniqueFound == uniqueNeeded and uniqueFound == countWithAtLeastK:
                    answer = max(answer, right - left)

        return answer

    # APPROACH 2 - DIVIDE AND CONQUER
    # Divide the problem into sub phases
    # Solve subproblems
    # Split the string when we find an invalid character (less than frequency k)
    # Since that char can't be part of the result, split the string at that index and search
    # Then combine results (max operator)
    # This is much more readable because cleaner code in python,
    # but way slower than the similar approach 3 (with indices)
    def longestSubstring(self, s: str, k: int) -> int:
        if len(s) < k:
            return 0

        charMap = collections.defaultdict(int)
        for c in s:
            charMap[c] += 1

        for i, c in enumerate(s):
            if charMap[c] >= k:
                continue

            next = i
            while next < len(s) and charMap[s[next]] < k:
                next += 1

            return max(
                self.longestSubstring(s[0 : next - 1], k),
                self.longestSubstring(s[next:], k),
            )

        return len(s)

    # APPROACH 3 - DIVIDE AND CONQUER
    # Same as above, but use indices instead of substrings
    # This reduces time SIGNIFICANTLY (sigh)
    def longestSubstring(self, s: str, k: int) -> int:
        return Solution.helper(s, 0, len(s), k)

    @staticmethod
    def helper(s: str, start: int, end: int, k: int) -> int:
        if end < k:
            return 0

        charMap = collections.defaultdict(int)
        for i in range(start, end):
            charMap[s[i]] += 1

        # we could search for any value < k in charMap.values() but this is O(n)
        # the loop below is also O(n).
        # If we did a search there, we'd have code that's tough to read because
        # the programmer may not know that we'll always exit inside the for loop
        for mid in range(start, end):
            c = s[mid]
            if charMap[c] >= k:
                continue

            # skip all invalid characters, then  divide and conquer
            nextMid = mid + 1
            while nextMid < end and charMap[s[nextMid]] < k:
                nextMid += 1

            return max(
                Solution.helper(s, start, mid, k), Solution.helper(s, nextMid, end, k)
            )

        # no invalid characters
        return end - start


s = Solution()
print(s.longestSubstring("abababbdabcabc", 2))  # 7 (abababb)
print(s.longestSubstring("aaabb", 3))  # 3
print(s.longestSubstring("ababbc", 2))  # 5
