/**
 * @param {string} J
 * @param {string} S
 * @return {number}
 */
var numJewelsInStones = function (J, S) {
  // return Array.from(S).filter(i => {return J.indexOf(i) !== -1}).length;
  const hash = {};

  for (let i = 0; i < J.length; i++) {
    hash[J[i]] = 1;
  }

  let count = 0;
  for (let i = 0; i < S.length; i++) {
    if (S[i] in hash) count++
  }

  return count;
};