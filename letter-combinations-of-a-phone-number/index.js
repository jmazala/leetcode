/**
 * @param {string} digits
 * @return {string[]}
 */

 /*
  * tried this with strings or with arrays thinking
  * arrays would be faster because strings are immutable in JS
  * but the measured time ended up being exactly the same
  * it's easier to read with strings so i'll keep it this way
  */
const DIGITS_HASH = {
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
  const answer = helper(0, []);
  return answer;
  
  function helper(index, prefixes) {
    if (index === digits.length) {
      return prefixes;
    }
  
    const digit = digits[index++];
    if (digit === '0' || digit === '1') {
      return helper(index, prefixes);  
    }

    if (prefixes.length === 0) {
      return helper(index, DIGITS_HASH[digit]);
    }

    const nextPrefixes = [];
    for (const prefix of prefixes) {
      for (const letter of DIGITS_HASH[digit]) {
        nextPrefixes.push(prefix.concat(letter));
      }
    }
    
    return helper(index, nextPrefixes);
  }
};

console.log(letterCombinations('23'));