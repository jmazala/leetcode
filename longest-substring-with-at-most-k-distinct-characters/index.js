/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var lengthOfLongestSubstringKDistinct = function (s, k) {
  if (k === 0 || s.length === 0) {
    return 0;
  }

  let left = 0;
  let right = 0;
  let answer = 0;
  let substring = [];
  let hash = {};

  while (right < s.length) {
    const c = s[right++];
    substring.push(c);
    hash[c] = hash[c] || 0;
    hash[c]++;

    while (hashSize() > k) {
      const toRemove = s[left];
      hash[toRemove]--;

      if (hash[toRemove] === 0) {
        delete hash[toRemove];
      }

      substring.shift();
      left++;
    }

    if (hashSize() <= k && substring.length > answer) {
      answer = substring.length;
    }
  }

  return answer;

  function hashSize() {
    return Object.keys(hash).length;
  }
};

console.log(lengthOfLongestSubstringKDistinct('abcde', 0)); // 0
console.log(lengthOfLongestSubstringKDistinct('', 99)); //0
console.log(lengthOfLongestSubstringKDistinct('a', 2)); // 1
console.log(lengthOfLongestSubstringKDistinct('abcdea', 1)); //1
console.log(lengthOfLongestSubstringKDistinct('aa', 1)); //2
console.log(lengthOfLongestSubstringKDistinct('aa', 2)); //2
console.log(lengthOfLongestSubstringKDistinct('eceba', 2)); //3
console.log(lengthOfLongestSubstringKDistinct('abaccc', 2)); //4
