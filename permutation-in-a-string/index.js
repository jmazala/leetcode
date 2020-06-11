const _ = require('lodash');

const OFFSET = 'a'.charCodeAt(0);

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
const checkInclusion = function (s1, s2) {
  if (s2.length < s1.length) {
    return false;
  }

  // since we have 26 finite characters it's faster to build array than a hash
  // hash is more readable though
  const s1CharMap = Array(26).fill(0);
  const s2CharMap = Array(26).fill(0);

  // use sliding window the length of s1
  // since permutation needs to contain all the characters
  // s1 char map is permanent
  // s2 char map is not permanent.
  // initial state of s2 char map is the first n characters
  // where n = s1.length
  for (let i = 0; i < s1.length; i++) {
    s1CharMap[s1.charCodeAt(i) - OFFSET]++;
    s2CharMap[s2.charCodeAt(i) - OFFSET]++;
  }

  // since sliding window is of size s1.length, we can't exceed
  // the entire length of s2 (i.e. starting index i is too far to the right)
  for (let i = 0; i < s2.length - s1.length; i++) {
    // does the current sliding window represent a permutation?
    if (_.isEqual(s1CharMap, s2CharMap)) {
      return true;
    }

    // move the sliding window right by 1
    const s2CharLost = s2[i];
    const s2CharGained = s2[i + s1.length];
    s2CharMap[s2CharGained.charCodeAt(0) - OFFSET]++;
    s2CharMap[s2CharLost.charCodeAt(0) - OFFSET]--;
  }

  // one more check at the very end
  return _.isEqual(s1CharMap, s2CharMap);
};

console.log(checkInclusion('adc', 'dcda')); // true
console.log(checkInclusion('ab', 'eidbaooo')); // true
console.log(checkInclusion('ab', 'eidboaoo')); // false
