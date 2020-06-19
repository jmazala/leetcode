/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */

// USING DYNAMIC PROGRAMMING
// TIME:  O(n) to make DP array:
//    O(w log w) to sort words array
//    O(n) for outer for loop
//    O(w) for inner for loop = O(n * w)
//    O(w) for startsWith
//   = O(w log w) + O(n) * O(w) * O(w) = O(n * w^2) + O(w log w) = O(n * w^2)
// SPACE:  O(n) for dp array
const wordBreak = function (s, wordDict) {
  if (wordDict.length === 0) {
    return s.length === 0;
  }
  /*
   * we can divide this into subproblems s1 & s2
   * i.e. "catsanddog" => "catsand" / "dog" => "cats" / "and" / "dog"
   */

  const dp = Array(s.length + 1).fill(false);
  dp[0] = true;

  // we could sort the array of words to have `end` start further up
  // depending on the makeup of our words dictionary this could save us a lot of iterations
  wordDict.sort((a, b) => a.length - b.length);

  for (let end = wordDict[0].length; end <= s.length; end++) {
    for (const word of wordDict) {
      const start = end - word.length;
      if (start < 0) {
        continue;
      }

      const canGetHere = dp[start] && s.startsWith(word, start);
      if (canGetHere) {
        dp[end] = true;
        // don't need to find other ways to get here.  we just can and it's fine.
        break;
      }
    }
  }

  return dp[dp.length - 1];
};

// USING BFS
// TIME: O(n^2) for every start index, search can continue until the end of the string
// SPACE: O(n) assuming every character in s adds a new substring to the dictionary
// const wordBreak = function (s, wordDict) {
//   /*
//    * the string is a tree where each node represents the prefix up to an index end
//    * Two nodes are connected when the substring between the indices
//    * linked with those nodes is also a valid string which is present in the dictionary.
//    * 1 - start with the first character of the given string to act as the root
//    * 2 - find every possible substring starting with that character which is a part of the dictionary
//    * 3 - push the ending index on the queue which will be used for Breadth First Search
//    * 4 - if we get to the last element of the tree return true
//    */

//   const queue = []; // queue of starting indices
//   const seen = Array(s.length);
//   queue.push(0);

//   while (queue.length) {
//     const start = queue.shift();
//     if (seen[start]) {
//       continue;
//     }

//     seen[start] = true;

//     for (const word of wordDict) {
//       if (s.startsWith(word, start)) {
//         const next = start + word.length;
//         if (next === s.length) {
//           return true;
//         }

//         queue.push(next);
//       }
//     }
//   }

//   return false;
// };

// RECURSIVE WITH MEMOIZATION
// TIME: O(n^2) based on how big the recursion tree can go
// SPACE: O(n) for recursion stack
// const wordBreak = function (s, wordDict) {
//   const memo = Array(s.length).fill(undefined);

//   // wordDict.sort((a, b) => b.length - a.length);
//   return helper(0);

//   function helper(index) {
//     if (index >= s.length) {
//       return true;
//     }

//     if (memo[index] !== undefined) {
//       return memo[index];
//     }

//     for (const word of wordDict) {
//       const answer = s.startsWith(word, index) && helper(index + word.length);
//       if (answer) {
//         memo[index] = true;
//         return true;
//       }
//     }

//     memo[index] = false;
//     return false;
//   }
// };

console.log(wordBreak('applepeniapple', ['apple', 'pen'])); // false
console.log(wordBreak('catsandog', ['cats', 'dog', 'sand', 'and', 'cat'])); // false
console.log(wordBreak('catsanddog', ['cats', 'dog', 'sand', 'and', 'cat'])); // true
console.log(wordBreak('applepenapple', ['apple', 'pen'])); // true
console.log(wordBreak('leetcode', ['leet', 'code'])); // true
