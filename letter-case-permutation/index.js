const _ = require('lodash');

/**
 * @param {string} S
 * @return {string[]}
 */
var letterCasePermutation = function (S) {
  const answer = [];
  helper(S, 0);
  return answer;

  function helper(s, index) {
    if (index >= s.length) {
      answer.push(s);
      return;
    }

    //if current char is a number do nothing
    if (!_.isNaN(parseInt(s[index]))) {
      helper(s, index + 1);
    } else {
      helper(s.slice(0, index) + s[index].toUpperCase() + s.slice(index + 1), index + 1);
      helper(s.slice(0, index) + s[index].toLowerCase() + s.slice(index + 1), index + 1);
    }
  }
};

console.log(letterCasePermutation("a1b2")); //["a1b2", "a1B2", "A1b2", "A1B2"]
console.log(letterCasePermutation("3z4")); //["3z4", "3Z4"]
console.log(letterCasePermutation('12345')); //['12345']