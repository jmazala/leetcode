/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isSubsequence = function (s, t) {
  if (s.length === 0) {
    return true;
  }

  if (t.length < s.length) {
    return false;
  }

  let i = 0;

  for (let j = 0; j < t.length; j++) {
    if (t[j] === s[i]) {
      i++;

      if (i === s.length) {
        return true;
      }
    }
  }

  return false;
};

console.log(isSubsequence('abc', 'ahbgdc')); // true
