/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const hash = new Map();
  strs.forEach(s => {
    s2 = Array.from(s).sort().join('');
    const words = hash.get(s2) || [];
    words.push(s);
    hash.set(s2, words);
  });

  return Array.from(hash.values());
};

console.log(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']));