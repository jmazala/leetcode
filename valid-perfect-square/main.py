class Solution:
    def isPerfectSquare(self, num: int) -> bool:
        if num == 0:
            return True
        
        i = 1
        while num >= (i * i):
            if (num / i) == i:
                return True
            i += 1
        
        return False