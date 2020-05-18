const _ = require('lodash');
const OFFSET = 'a'.charCodeAt(0);

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function (s1, s2) {
  if (s2.length < s1.length) {
    return false;
  }

  const s1CharMap = Array(26).fill(0);
  const s2CharMap = Array(26).fill(0);

  for (let i = 0; i < s1.length; i++) {
    s1CharMap[s1.charCodeAt(i) - OFFSET]++;
    s2CharMap[s2.charCodeAt(i) - OFFSET]++;
  }

  for (let i = 0; i < s2.length - s1.length; i++) {
    if (_.isEqual(s1CharMap, s2CharMap)) {
      return true;
    }

    const s2CharLost = s2[i];
    const s2CharGained = s2[i + s1.length];
    s2CharMap[s2CharGained.charCodeAt(0) - OFFSET]++;
    s2CharMap[s2CharLost.charCodeAt(0) - OFFSET]--;
  }

  return _.isEqual(s1CharMap, s2CharMap);
};

console.log(checkInclusion("adc", "dcda")); //true
console.log(checkInclusion("ab", "eidbaooo")); //true
console.log(checkInclusion("ab", "eidboaoo")); //false