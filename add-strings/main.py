class Solution:
  def addStrings(self, num1: str, num2: str) -> str:
    offset = ord("0")
    answer = 0
    for i in range(0, max(len(num1), len(num2))):
      if (i < len(num1)):
        answer += (ord(num1[len(num1)-i-1]) - offset) * pow(10, i)
      if (i < len(num2)):
        answer += (ord(num2[len(num2)-i-1]) - offset) * pow(10, i)
    
    return str(answer)

if __name__ == '__main__':
  s = Solution()
  print(s.addStrings("18582506933032752", "366213329703"))