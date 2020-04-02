class Solution {
  public boolean exist(char[][] board, String word) {
    for (int i = 0; i < board.length; i++) {
      for (int j = 0; j < board[0].length; j++) {
        if (dfs(board, word, i, j, 0)) {
          return true;
        }
      }
    }
    
    return false;
  }
  
  public boolean dfs(char[][]board, String word,int i, int j, int index) {
    if (i < 0 || j < 0 ||
      i >= board.length || j >= board[0].length ||
      board[i][j] != word.charAt(index)) {
      return false;
    }
    
    index++;
    
    if (index == word.length()) {
      return true;
    }
    
    //to not use spaces twice remove the character
    char temp = board[i][j];
    board[i][j] = ' ';
    boolean found = dfs(board, word, i+1, j, index) ||
      dfs(board, word, i-1, j, index) ||
      dfs(board, word, i, j-1, index) ||
      dfs(board, word, i, j+1, index);
    
    board[i][j] = temp;
    
    return found;
  }
}