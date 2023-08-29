# https://leetcode.com/problems/encode-and-decode-strings/

import io
from typing import List

DELIMITER = "π"


# METHOD 1 - USE A NON-ASCII DELIMITER
class Codec:
    def encode(self, strs: List[str]) -> str:
        return DELIMITER.join(strs)

    def decode(self, s: str) -> List[str]:
        return s.split(DELIMITER)


# METHOD 2 - ESCAPING (Using StringIO)
# Similar to delimeter, except that the delimeter might appear in the string
class Codec:
    def encode(self, strs: List[str]) -> str:
        encodedString = io.StringIO()

        for s in strs:
            encodedString.write(s.replace("/", "//") + "/:")

        return encodedString.getvalue()

    def decode(self, s: str) -> List[str]:
        decodedStrings = []
        currentString = io.StringIO()
        i = 0

        while i < len(s):
            if s[i : i + 2] == "/:":
                decodedStrings.append(currentString.getvalue())
                currentString = io.StringIO()
                i += 2

            elif s[i : i + 2] == "//":
                currentString.write("/")
                i += 2
            else:
                currentString.write(s[i])
                i += 1

        return decodedStrings


# METHOD 3 - ESCAPING (Using string addition)
# Similar to delimeter, except that the delimeter might appear in the string
class Codec:
    def encode(self, strs: List[str]) -> str:
        encodedString = ""

        for s in strs:
            encodedString += s.replace("/", "//") + "/:"

        return encodedString

    def decode(self, s: str) -> List[str]:
        decodedStrings = []
        currentString = ""
        i = 0

        while i < len(s):
            if s[i : i + 2] == "/:":
                decodedStrings.append(currentString)
                currentString = ""
                i += 2

            elif s[i : i + 2] == "//":
                currentString += "/"
                i += 2
            else:
                currentString += s[i]
                i += 1

        return decodedStrings


# Your Codec object will be instantiated and called as such:
codec = Codec()
print(codec.decode(codec.encode(["Hello", "World"])))
