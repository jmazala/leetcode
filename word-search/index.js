//https://leetcode.com/problems/word-search/submissions/
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
//DFS
var exist = function (board, word) {
  if (word.length > (board.length * board[0].length)) {
    return false;
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (helper(i, j, 0)) {
        return true;
      }
    }
  }

  return false;

  function helper(i, j, index) {
    if (i < 0 || j < 0 || i >= board.length || j >= board[0].length || word[index] !== board[i][j]) {
      return false;
    }

    index++;

    if (index === word.length) {
      return true;
    }

    //so we don't need a seen set
    const temp = board[i][j];
    board[i][j] = ' ';

    const result = helper(i - 1, j, index) ||
      helper(i + 1, j, index) || helper(i, j - 1, index) ||
      helper(i, j + 1, index);

    board[i][j] = temp;

    return result;
  }
};

console.log(exist([
  ["A","B","C","E"],
  ["S","F","C","S"],
  ["A","D","E","E"]], "ABCCED"));