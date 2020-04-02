class Solution:
  def exist(self, board: List[List[str]], word: str) -> bool:
    def dfs(i, j, index, seen=[]):
      if (i == -1 or j == -1 or i >= len(board) or j >= len(board[0]) or board[i][j] != word[index]):
        return False
      
      index += 1
      
      if (index == len(word)):
        return True
      
      #for nextI, nextJ in up, down, left, right
      for nextI, nextJ in [(i-1, j), (i+1, j), (i, j-1), (i, j+1)]:
        if (nextI, nextJ) not in seen:
          nextSeen = seen.copy()
          nextSeen.append((nextI, nextJ))
          next = dfs(nextI, nextJ, index, nextSeen)
          if next:
            return True
      
      return False
    
    for i in range(len(board)):
      for j in range(len(board[0])):
        if dfs(i,j, 0, [(i,j)]):
          return True
    
    return False