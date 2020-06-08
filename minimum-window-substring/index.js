/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  if (s.length === 0 || t.length === 0 || s.length < t.length) {
    return '';
  }

  let left = 0;
  let right = 0;
  let answer = [-Infinity, Infinity];

  const tHash = {};
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    tHash[c] = tHash[c] || 0;
    tHash[c]++;
  }

  while (right < s.length) {
    const c = s[right];
    tHash[c]--;

    while (coversChars()) {
      //compare with answer.overwrite if it's smaller
      if ((right - left) < (answer[1] - answer[0])) {
        answer = [left, right];
      }

      //contract window
      const charToAddBack = s[left];
      tHash[charToAddBack]++;
      left++;
    }

    right++;
  }

  if (answer[0] === -Infinity) {
    return '';
  }

  return s.slice(answer[0], answer[1] + 1);

  function coversChars() {
    for (let i = 0; i < t.length; i++) {
      const c = t[i];
      if (tHash[c] > 0) {
        return false;
      }
    }

    return true;
  }
};

console.log(minWindow('ADOBECODEBANC', 'ABCF')); //''
console.log(minWindow('ADOBECODEBANC', 'A')); //A
console.log(minWindow('ADOBECODEBANC', 'ABC')); //BANC
console.log(minWindow('ADOBECODEBANC', 'ADO')); //ADO
console.log(minWindow('ADOBECODEBANC', 'ADOC')); //ADOBEC
console.log(minWindow('ADOBECODEBANC', 'ECD')); //ECOD
console.log(minWindow('ADOBECODEBANC', 'ACC')); //CODEBANC
console.log(minWindow('ADOBECODEBANC', 'AACC')); //ADOBECODEBANC