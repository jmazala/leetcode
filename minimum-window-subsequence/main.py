class Solution(object):
    def minWindow(self, S, T):
        tPos = 0
        sPos = 0
        answer = ''
        minWindowSize = float("inf")

        # for each position in s try to start or continue a window
        while sPos < len(S):
            # as the chars match increment t pointer
            if S[sPos] == T[tPos]:
                tPos += 1

                # if we've exhausted t, that means we found a good candidate for a subsequence
                # but it could be shorter
                if tPos == len(T):
                    # go backwards from that t position to find the shortest subsequence window and overwrite
                    end = sPos + 1
                    tPos -= 1

                    while (tPos >= 0):
                        if S[sPos] == T[tPos]:
                            tPos -= 1

                        sPos -= 1

                    #j is at -1
                    tPos += 1
                    # i is one before the first char
                    sPos += 1

                    # we're guaranteed t to go forwards and backwards so we don't need to reset anything else

                    # see if our window is best
                    if (end - sPos) < minWindowSize:
                        minWindowSize = end - sPos
                        answer = S[sPos:end]
            sPos += 1

        return answer


s = Solution()
# print(s.minWindow('abcdebdde', 'bde'))  # bcde
print(s.minWindow("ffynmlzesdshlvugsigobutgaetsnjlizvqjdpccdylclqcbghhixpjihximvhapymfkjxyyxfwvsfyctmhwmfjyjidnfryiyajmtakisaxwglwpqaxaicuprrvxybzdxunypzofhpclqiybgniqzsdeqwrdsfjyfkgmejxfqjkmukvgygafwokeoeglanevavyrpduigitmrimtaslzboauwbluvlfqquocxrzrbvvplsivujojscytmeyjolvvyzwizpuhejsdzkfwgqdbwinkxqypaphktonqwwanapouqyjdbptqfowhemsnsl", "ntimcimzah"))
