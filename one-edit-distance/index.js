/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isOneEditDistance = function (s, t, distance = 0) {
  if (Math.abs(s.length - t.length) > 1) {
    return false;
  }

  // if they're the same length, compare the chars
  if (s.length === t.length) {
    for (let i = 0; i < s.length; i++) {
      if (s[i] !== t[i]) {
        distance++;

        if (distance > 1) {
          return false;
        }
      }
    }

    return distance === 1;
  }

  const big = s.length > t.length ? s : t;
  const small = s.length > t.length ? t : s;

  for (let i = 0; i < small.length; i++) {
    if (small[i] !== big[i]) {
      const newSmall = small.slice(0, i) + big[i] + small.slice(i, t.length);
      return isOneEditDistance(newSmall, big, 1);
    }
  }

  return true;
};

console.log(isOneEditDistance('', '')); // false
console.log(isOneEditDistance('dab', 'ad')); // false
console.log(isOneEditDistance('cab', 'ad')); // false
console.log(isOneEditDistance('apb', 'apd')); // true
console.log(isOneEditDistance('1230', '1231')); // true
console.log(isOneEditDistance('ab', 'acb')); // true
console.log(isOneEditDistance('acb', 'ab')); // true
