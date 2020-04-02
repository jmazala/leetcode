/**
 * @param {string} digits
 * @return {string[]}
 */
const DIGITS_HASH = {
  // 0: [],
  // 1: [],
  2: ['a', 'b', 'c'],
  3: ['d', 'e', 'f'],
  4: ['g', 'h', 'i'],
  5: ['j', 'k', 'l'],
  6: ['m', 'n', 'o'],
  7: ['p', 'q', 'r', 's'],
  8: ['t', 'u', 'v'],
  9: ['w', 'x', 'y', 'z']
};

var letterCombinations = function (digits) {
  if (!digits) {
    return [];
  }

  //if we're on the last digit return an array of single chars
  if (digits.length == 1) {
    return DIGITS_HASH[digits[0]];
  }

  //otherwise create n prefixes and add those to all other combos
  const newPrefixes = DIGITS_HASH[digits[0]];
  const next = letterCombinations(digits.slice(1));
  const answer = [];
  newPrefixes.forEach(np => {
    next.forEach(p => {
      answer.push(`${np}${p}`);
    });
  });

  return answer;
};

console.log(letterCombinations('232'));