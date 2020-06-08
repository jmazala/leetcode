const BATTLESHIP = 'X';

/**
 * @param {character[][]} board
 * @return {number}
 */
const countBattleships = function (board) {
  let count = 0;
  // traverse top to bottom, left to right
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] === BATTLESHIP) {
        // find either the bottom of the boat or the left of the boat to record it
        if (
          (i > 0 && board[i - 1][j] === BATTLESHIP) ||
          (j > 0 && board[i][j - 1] === BATTLESHIP)
        ) {
          continue;
        }
        count++;
      }
    }
  }

  return count;
};
