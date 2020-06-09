/**
 * @param {string} s
 * @return {boolean}
 */
const validPalindrome = function (s, tryAgain = true) {
  let start = 0;
  let end = s.length - 1;

  while (start < end) {
    if (s[start] !== s[end]) {
      if (!tryAgain) {
        return false;
      }

      // chop off the END character or chop off the START character
      return (
        validPalindrome(s.slice(start, end), false) ||
        validPalindrome(s.slice(start + 1, end + 1), false)
      );
    }

    start++;
    end--;
  }

  return true;
};

console.log(validPalindrome('')); // true
console.log(validPalindrome('aa')); // true
console.log(validPalindrome('aac')); // true
console.log(validPalindrome('aba')); // true
console.log(validPalindrome('abca')); // true
console.log(validPalindrome('abeea')); // true
console.log(validPalindrome('aacc')); // false
console.log(validPalindrome('abeefa')); // false
