class Solution:
    def partitionLabels(self, S: str) -> List[int]:
        hash = {}
        answer = []
        for i in range(len(S)):
            hash[S[i]] = S.rindex(S[i])
        
        i = 0
        while (i < len(S)):
            j = i
            end = hash[S[i]]
            
            while (j != end):
                end = max(end, hash[S[j]])
                j += 1
            
            answer.append(j - i + 1)
            i = j+1
            
        return answer
            