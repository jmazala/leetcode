/**
 * @param {string} s
 * @return {number}
 */
const firstUniqChar = function (s) {
  const map = new Map(); // to preserve insertion order

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (!map.has(char)) {
      map.set(char, i);
    } else {
      map.set(char, false); // might as well just use false
    }
  }

  for (const value of map.values()) {
    if (value !== false) {
      return value;
    }
  }

  return -1;
};

console.log(firstUniqChar('leetcode')); // 0
console.log(firstUniqChar('loveleetcode')); // 2
