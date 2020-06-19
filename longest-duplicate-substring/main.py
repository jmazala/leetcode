P = 2 ** 63 - 1


class Solution:
    def longestDupSubstring(self, S: str) -> str:
        def rabinKarp(mid):
            curHash = 0
            for i in range(mid):
                curHash = (curHash * 26 + nums[i]) % P

            hashes = {curHash}
            pos = -1
            maxPow = pow(26, mid, P)

            for i in range(mid, len(S)):
                curHash = (26 * curHash - nums[i - mid] * maxPow + nums[i]) % P

                if (curHash in hashes):
                    pos = i + 1 - mid

                hashes.add(curHash)

            return pos

        nums = [ord(c) for c in S]

        low = 0
        high = len(S) - 1
        start = 0
        end = 0

        while (low <= high):
            mid = (high + low) // 2
            pos = rabinKarp(mid)

            if (pos == -1):
                high = mid - 1
            else:
                start = pos
                end = pos + mid
                low = mid + 1

        return S[start:end]


s = Solution()
print(s.longestDupSubstring(''))  # ''
print(s.longestDupSubstring('ab'))  # ''
print(s.longestDupSubstring('aab'))  # 'a'
print(s.longestDupSubstring('abcvidavidbakyjvidcbakyjx'))  # 'bakyj'
