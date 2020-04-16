/**
 * @param {string} tiles
 * @return {number}
 */
//using a branch and a map
var numTilePossibilities = function (tiles) {
  const letterCounts = new Map(); //use a map instead of an object to iterate
  for (let i = 0; i < tiles.length; i++) {
    const letter = tiles[i];
    letterCounts.set(letter, (letterCounts.get(letter) || 0) + 1);
  };

  return helper(letterCounts);
};

function helper(letterCounts) {
  let sum = 0;

  for (let [letter, count] of letterCounts.entries()) {
    if (count === 0) {
      continue;
    }

    sum++;
    //take this letter
    letterCounts.set(letter, letterCounts.get(letter) - 1);
    sum += helper(letterCounts);
    //don't take this letter
    letterCounts.set(letter, letterCounts.get(letter) + 1);
  }

  return sum;
}

//GENERATING ALL PERMUTATIONS
// var numTilePossibilities = function (tiles) {
//   const answer = new Set();
//   helper('', tiles);
//   return answer.size;

//   function helper(used, remaining) {
//     if (remaining.length === 0) {
//       if (used) {
//         answer.add(used);
//       }

//       return;
//     }


//     for (let i = 0; i < remaining.length; i++) {
//       //we can either:
//       //use a tile in the next spot
//       const tile = remaining[i];
//       helper(used + tile, remaining.slice(0, i).concat(remaining.slice(i + 1)));

//       //don't use it and remove it
//       helper(used, remaining.slice(0, i).concat(remaining.slice(i + 1)));
//     }

//   }
// };

console.log(numTilePossibilities('AAB')); //8
console.log(numTilePossibilities('AAABBC')); //188