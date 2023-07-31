# https://leetcode.com/problems/text-justification/

from typing import List


class Solution:
    def fullJustify(self, words: List[str], maxWidth: int) -> List[str]:
        output = []
        i = 0

        while i < len(words):
            line = Solution.getNextLine(words, i, maxWidth)
            i += len(line)
            output.append(Solution.justifyLine(line, maxWidth, i == len(words)))

        return output

    @staticmethod
    def getNextLine(words: List[str], i: int, maxWidth: int) -> List[str]:
        line = []
        length = 0

        # Cram as many words per line as we can
        while (
            i < len(words) and length + len(words[i]) <= maxWidth
        ):  # Don't need a +1 here as just trying to fit words
            line.append(words[i])
            length += (
                len(words[i]) + 1  # Add 1 to account for the space between every word
            )
            i += 1

        return line

    @staticmethod
    def justifyLine(line: List[str], maxWidth: int, isFinalLine) -> str:
        lengthOfWords = sum([len(word) for word in line])

        # (last word doesn't have a trailing space)
        # before justification, every gap is a single space
        numGaps = len(line) - 1
        charsUsed = lengthOfWords + numGaps
        charsRemaining = maxWidth - charsUsed

        # left-justify if a single word, or remaining line
        if len(line) == 1 or isFinalLine:
            return " ".join(line) + " " * charsRemaining

        # use floor because extra spaces go to earliest words in line
        spacesPerGap = charsRemaining // numGaps
        extraSpaces = charsRemaining % numGaps

        # distribute spaces to all gaps
        for j in range(numGaps):
            line[j] += " " * spacesPerGap

        # add spaces to earlier words
        for j in range(extraSpaces):
            line[j] += " "

        return " ".join(line)


s = Solution()

print(
    s.fullJustify(
        [
            "ask",
            "not",
            "what",
            "your",
            "country",
            "can",
            "do",
            "for",
            "you",
            "ask",
            "what",
            "you",
            "can",
            "do",
            "for",
            "your",
            "country",
        ],
        16,
    )
)


print(
    s.fullJustify(["This", "is", "an", "example", "of", "text", "justification."], 16)
)

print(
    s.fullJustify(
        words=["What", "must", "be", "acknowledgment", "shall", "be"], maxWidth=16
    )
)

print(
    s.fullJustify(
        [
            "Science",
            "is",
            "what",
            "we",
            "understand",
            "well",
            "enough",
            "to",
            "explain",
            "to",
            "a",
            "computer.",
            "Art",
            "is",
            "everything",
            "else",
            "we",
            "do",
        ],
        maxWidth=20,
    )
)
