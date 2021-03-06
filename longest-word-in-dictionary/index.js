//USING A TRIE
function TrieNode(children, isWord) {
  this.children = children;
  this.isWord = isWord;
  return this;
}

/**
 * @param {string[]} words
 * @return {string}
 */
var longestWord = function (words) {
  let longestWord = '';

  if (!words) {
    return longestWord;
  }

  //turn all the words into a trie
  const root = new TrieNode({}, false);
  buildTrie();
  dfs(root, '');
  return longestWord;

  //DFS to the bottom keeping track of max word.  every child we iterate needs to be a word in itself.
  function dfs(node, prefix) {
    if (!node) { //this should never happen
      return;
    }

    if (node.isWord) { //reached the bottom of the tree
      if (prefix.length > longestWord.length) {
        longestWord = prefix;
      }
    }

    //sort bc problem statement wants lexographic first
    Object.keys(node.children).sort().forEach(nextChar => {
      if (node.children[nextChar].isWord) {
        dfs(node.children[nextChar], prefix + nextChar);
      }
    });
  }

  function buildTrie() {
    words.forEach(word => {
      let current = root;

      for (let i = 0; i < word.length; i++) {
        const char = word[i];

        if (!current.children[char]) {
          current.children[char] = new TrieNode({}, false);
        }

        current = current.children[char];
      }

      current.isWord = true;
    });
  }
};

//USING A SET
// const longestWord = function (words) {
//   let longestWord = '';
//   if (!words || words.length === 0) {
//     return false;
//   }
  
//   const hash = {'': true};
//   words.forEach(word => hash[word] = true);
//   words.sort();
//   words.forEach(word => {
//     for (let i = 0; i < words.length; i++) {
//       //this is expensive bc we keep copying the string
//       if (!hash[word.slice(0, i)]) {
//         return;
//       }
//     }

//     if (word.length > longestWord.length) {
//       longestWord = word;
//     }
//   });

//   return longestWord;
// };

console.log(longestWord(["w", "wo", "wor", "worl", "world", "worlm", "worlz"])); //world
console.log(longestWord(["a", "banana", "app", "appl", "ap", "applk", "apply", "apple"])); //apply