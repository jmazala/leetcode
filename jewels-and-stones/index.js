/**
 * @param {string} J
 * @param {string} S
 * @return {number}
 */
var numJewelsInStones = function (J, S) {
  const set = new Set(Array.from(J));
  return Array.from(S).filter(i => set.has(i)).length;
};