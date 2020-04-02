import re

class Solution:
  def removeVowels(self, S: str) -> str:
    #given a string S, remove the vowels
    return re.sub("[aeiou]", "", S)
  

if __name__ == '__main__':
  s = Solution()
  print(s.removeVowels("To perform a substitution using a regular expression, use'"))
