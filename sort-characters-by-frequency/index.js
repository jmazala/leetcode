/**
 * @param {string} s
 * @return {string}
 */
var frequencySort = function (s) {
  if (s.length < 2) {
    return s;
  }

  //put all characters in a hash
  const charCounts = {};
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    charCounts[c] = charCounts[c] || 0;
    charCounts[c]++;
  }

  //sort the keys
  const sortedKeys = Object.keys(charCounts).sort((a, b) => charCounts[b] - charCounts[a]);

  //exhaust them
  const answer = [];
  for (const c of sortedKeys) {
    for (let i = 0; i < charCounts[c]; i++) {
      answer.push(c);
    }
  }

  return answer.join('');
};