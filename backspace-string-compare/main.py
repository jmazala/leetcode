import re
class Solution:
    def backspaceCompare(self, S: str, T: str) -> bool:
        s2 = ""
        t2 = ""
        for i in range(len(S)):
          if (S[i] == '#'):
            s2 = s2[:-1]
          else:
            s2 += S[i]
        for i in range(len(T)):
          if (T[i] == '#'):
            t2 = t2[:-1]
          else:
            t2 += T[i]
        
        return s2 == t2

if __name__ == '__main__':
  s = Solution()
  print(s.backspaceCompare("ab##", "c#d#"))
  print(s.backspaceCompare("ab##", "c#d#"))
  print(s.backspaceCompare("a##c", "#a#c"))
  print(s.backspaceCompare("a#c", "b"))
        