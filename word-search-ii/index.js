let NODE_ID = 0;

function TrieNode(char, children) {
  this.char = char;
  this.children = children;
  this.id = NODE_ID++;
  return this;
}

const DIRECTIONS = [[-1, 0], [1, 0], [0, -1], [0, 1]];
/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function (board, words) {
  if (!board || !board.length) {
    return [];
  }

  const wordsSet = new Set(words);
  const charToNodeHash = {};
  const M = board.length;
  const N = board[0].length;
  const trieNodes = []; //2d array but same as a hash

  //O(M * N)
  //create a TrieNode for every char in the word search
  for (let i = 0; i < M; i++) {
    if (!trieNodes[i]) {
      trieNodes[i] = [];
    }

    for (let j = 0; j < N; j++) {
      const char = board[i][j];
      const trieNode = new TrieNode(char, {});
      trieNodes[i].push(trieNode);

      charToNodeHash[char] = charToNodeHash[char] || [];
      charToNodeHash[char].push(trieNode);
    }
  }

  //we can traverse the weard search and build the trie node edges
  //O(N * M)
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      const node = trieNodes[i][j];

      DIRECTIONS.forEach(direction => {
        const nextI = i + direction[0];
        const nextJ = j + direction[1];

        if (nextI < 0 || nextJ < 0 || nextI >= M || nextJ >= N) {
          return;
        }
        const adjacentNode = trieNodes[nextI][nextJ];

        if (node.children[adjacentNode.char] === undefined) {
          node.children[adjacentNode.char] = [];
        }

        node.children[adjacentNode.char].push(adjacentNode);
      });
    }
  }

  //ok now the trie is built.  we can DFS for each word and try and see if the trie supports it
  //this will be inefficient if some words are prefixes of other words
  //O(w) where w is the number of words
  return words.filter(word => {
    //find trie nodes matching the first character in searched for word
    let startingTrieNodes = charToNodeHash[word[0]] || [];

    for (let startIndex = 0; startIndex < startingTrieNodes.length; startIndex++) {
      let startNode = startingTrieNodes[startIndex];

      //O(log(w))
      if (dfsTrie(startNode, word, 0, new Set())) {
        return true;
      }
    }

    return false;
  });

  //traverse the trie with DFS and remember where you've been
  function dfsTrie(node, word, numCharsSeen, seen) {
    numCharsSeen++;
    //if we've seen this node before we're in a cycle.  return false.
    if (seen.has(node.id)) {
      return false;
    }

    if (numCharsSeen === word.length) {
      return true;
    }

    seen.add(node.id);
    
    //look for the next character by traversing the trie
    const nextChar = word[numCharsSeen];
    const nextChildren = node.children[nextChar] || [];

    for (let i = 0; i < nextChildren.length; i++) {
      if (dfsTrie(nextChildren[i], word, numCharsSeen, seen)) {
        return true;
      }
    }

    return false;
  }
};

// const board1 = [
//   ['o', 'a', 'a', 'n'],
//   ['e', 't', 'a', 'e'],
//   ['i', 'h', 'k', 'r'],
//   ['i', 'f', 'l', 'v']
// ];

// const words1 = ['oath', 'pea', 'eat', 'rain'];
// console.log(findWords(board1, words1)); //['eat','oath']
// const board2 = [
//   ['a', 'b'],
//   ['c', 'd']
// ];
// const words2 = ['acdb'];
// console.log(findWords(board2, words2)); //[]

const board3 = [
  ["b", "a", "a", "b", "a", "b"],
  ["a", "b", "a", "a", "a", "a"],
  ["a", "b", "a", "a", "a", "b"],
  ["a", "b", "a", "b", "b", "a"],
  ["a", "a", "b", "b", "a", "b"],
  ["a", "a", "b", "b", "b", "a"],
  ["a", "a", "b", "a", "a", "b"]
];

const words3 = ["bbaabaabaaaaabaababaaaaababb", "aabbaaabaaabaabaaaaaabbaaaba", "babaababbbbbbbaabaababaabaaa", "bbbaaabaabbaaababababbbbbaaa", "babbabbbbaabbabaaaaaabbbaaab", "bbbababbbbbbbababbabbbbbabaa", "babababbababaabbbbabbbbabbba", "abbbbbbaabaaabaaababaabbabba", "aabaabababbbbbbababbbababbaa", "aabbbbabbaababaaaabababbaaba", "ababaababaaabbabbaabbaabbaba", "abaabbbaaaaababbbaaaaabbbaab", "aabbabaabaabbabababaaabbbaab", "baaabaaaabbabaaabaabababaaaa", "aaabbabaaaababbabbaabbaabbaa", "aaabaaaaabaabbabaabbbbaabaaa", "abbaabbaaaabbaababababbaabbb", "baabaababbbbaaaabaaabbababbb", "aabaababbaababbaaabaabababab", "abbaaabbaabaabaabbbbaabbbbbb", "aaababaabbaaabbbaaabbabbabab", "bbababbbabbbbabbbbabbbbbabaa", "abbbaabbbaaababbbababbababba", "bbbbbbbabbbababbabaabababaab", "aaaababaabbbbabaaaaabaaaaabb", "bbaaabbbbabbaaabbaabbabbaaba", "aabaabbbbaabaabbabaabababaaa", "abbababbbaababaabbababababbb", "aabbbabbaaaababbbbabbababbbb", "babbbaabababbbbbbbbbaabbabaa"];
console.log(findWords(board3, words3)); //["aabbbbabbaababaaaabababbaaba","abaabbbaaaaababbbaaaaabbbaab","ababaababaaabbabbaabbaabbaba"]