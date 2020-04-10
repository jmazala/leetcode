/**
 * @param {number} n
 * @return {string[]}
 */
//BACKTRACKING
//DP
//STACKS
//POINTERS
var generateParenthesis = function (n) {
  const answer = [];
  helper('', 0, 0);

  return answer;

  function helper(prefix, open, closed) {
    if (prefix.length === n * 2) {
      answer.push(prefix);
    }

    if (open < n) {
      helper(prefix + '(', open + 1, closed);
    }

    if (closed < open) {
      helper(prefix + ')', open, closed + 1);
    }
  }
};

console.log(generateParenthesis(3));