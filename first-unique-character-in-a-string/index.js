/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function (s) {
  const letters = {};

  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c in letters) {
      letters[c] = -1;
    } else {
      letters[c] = i;
    }
  }

  for (let i = 0; i < s.length; i++) {
    if (letters[s[i]] !== -1) {
      return i;
    }
  }

  return -1;
};