/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */

//STORE ONLY LAST 2 ROWS
var minDistance = function(word1, word2) {
  const small = word1.length < word2.length ? word1 : word2;
  const big = word1.length >= word2.length ? word1 : word2;
  
  const evenEdits = [];
  const oddEdits = Array(small.length + 1).fill(null);
  
  for (let i = 0; i <= small.length; i++) {
    evenEdits.push(i);
  }
  
  let currentEdits;
  let previousEdits;
  
  //big + 1 rows
  for (let i = 1; i <= big.length; i++) {
    if (i % 2 == 0) {
      currentEdits = evenEdits;
      previousEdits = oddEdits;
    } else {
      currentEdits = oddEdits;
      previousEdits = evenEdits;
    }
    
    currentEdits[0] = i;
    for (let j = 1; j <= small.length; j++) {
      if (big[i-1] === small[j-1]) {
        currentEdits[j] = previousEdits[j-1];
      } else {
        //look up, left, diagonal up and left
        currentEdits[j] = 1 + Math.min(previousEdits[j-1], currentEdits[j-1], previousEdits[j]);
      }
    }
  }
  
  return big.length % 2 === 0 ? evenEdits[evenEdits.length - 1] : oddEdits[oddEdits.length - 1];
};
