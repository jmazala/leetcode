//https://leetcode.com/problems/partition-labels/
/**
 * @param {string} S
 * @return {number[]}
 */
var partitionLabels = function(S) {
    const hash = {};
    let currentPartition = [];
    const answer = [];

    for (let i = 0; i < S.length; i++) {
      const c = S[i];
      if (c in hash) {
        continue;
      }

      hash[c] = S.lastIndexOf(c);
    }

    console.log(hash);

    let i = 0;
    while (i < S.length) {
      const c = S[i];
      let end = hash[c];
      let j = i;
      
      while (j !== end) {
        end = Math.max(end, hash[S[j]]);
        j++;
      }

      answer.push(j - i + 1);
      i = j + 1;
    }

    
    return answer;
};

console.log(partitionLabels('ababcbacadefegdehijhklij'));