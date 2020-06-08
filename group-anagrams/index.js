/**
 * @param {string[]} strs
 * @return {string[][]}
 */

//USING A HASH OF CHAR COUNTS
var groupAnagrams = function (strs) {
  const OFFSET = 'a'.charCodeAt(0);
  const DELIMITER = ',';
  const hash = {};

  for (const s of strs) {
    const charCountString = getCharCountString(s);
    hash[charCountString] = hash[charCountString] || [];
    hash[charCountString].push(s);
  }

  return Object.values(hash);

  function getCharCountString(s) {
    const a = Array(26).fill(0);
    for (let i = 0; i < s.length; i++) {
      a[s[i].charCodeAt(0) - OFFSET]++;
    }

    return a.join(DELIMITER);
  }
}

//USING A HASH OF SORTED STRINGS
// var groupAnagrams = function (strs) {
//   const hash = {};
//   for (const s of strs) {
//     const sorted = Array.from(s).sort();
//     hash[sorted] = hash[sorted] || [];
//     hash[sorted].push(s);
//   }

//   return Object.values(hash);
// };

console.log(JSON.stringify(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))); //[["eat","tea","ate"],["tan","nat"],["bat"]]