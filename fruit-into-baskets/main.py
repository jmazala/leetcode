class Solution:
    def totalFruit(self, tree: List[int]) -> int:
        if (tree is None or len(tree) == 0):
            return 0
    
        i = 0
        j = 0
        answer = 0
        hash = {}
        
        while j < len(tree):
            if len(hash.keys()) < 3:
                hash[tree[j]] = j
                j += 1
            
            if len(hash.keys()) == 3:
                minIndex = len(tree) + 1
                for treeType in hash.values():
                    minIndex = min(minIndex, treeType)
                
                i = minIndex + 1
                del hash[tree[minIndex]]
            
            answer = max(answer, j - i)
        
        return answer