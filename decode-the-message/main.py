# https://leetcode.com/problems/decode-the-message/


class Solution:
    def decodeMessage(self, key: str, message: str) -> str:
        i = 0
        charOrd = 97  # 'a'
        hash = {" ": " "}

        for c in key:
            if c in hash:
                continue

            hash[c] = chr(charOrd)
            charOrd += 1

            if charOrd == 123:
                break

        return "".join(hash[c] for c in message)


s = Solution()
print(
    s.decodeMessage("the quick brown fox jumps over the lazy dog", "vkbs bs t suepuv")
)
