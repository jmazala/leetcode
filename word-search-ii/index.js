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

  trieNodes = Array(M).fill().map(i => Array(N).fill());

  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      const char = board[i][j];
      const trieNode = new TrieNode(char, {});
      trieNodes[i][j] = trieNode;

      charToNodeHash[char] = charToNodeHash[char] || [];
      charToNodeHash[char].push(trieNode);
    }
  }

  //now we have every char in the word search as it's own node
  //we can traverse the matrix and start building the trie

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
  return words.filter(word => {
    //find trie nodes with the first character in word
    let startingTrieNodes = charToNodeHash[word[0]];
    if (!startingTrieNodes) {
      return false;
    }

    //this has n children.  check next char for them
    for (let startIndex = 0; startIndex < startingTrieNodes.length; startIndex++) {
      let startNode = startingTrieNodes[startIndex];
      if (dfsTrie(startNode, word, 1, {})) {
        return true;
      }
    }

    return false;
  });

  //i think i need to recursively go through the trie and keep track of where i've been

  function dfsTrie(node, word, wordIndex, seen) {
    //if we've seen this node before we're in a cycle.  return false.
    if (seen[node.id]) {
      return false;
    }

    if (!node) {
      return false; //this should never happen
    }

    if (wordIndex > word.length) {
      return false; //this should never happen
    }

    if (wordIndex === word.length) {
      return true;
    }

    seen[node.id] = true;
    const nextChar = word[wordIndex++];

    const nextChildren = node.children[nextChar];

    if (!nextChildren) {
      return false;
    }

    for (let i = 0; i < nextChildren.length; i++) {
      if (dfsTrie(nextChildren[i], word, wordIndex, seen)) {
        return true;
      }
    }

    return false;
  }
};

const board = [
  ['o', 'a', 'a', 'n'],
  ['e', 't', 'a', 'e'],
  ['i', 'h', 'k', 'r'],
  ['i', 'f', 'l', 'v']
];

const words = ['oath', 'pea', 'eat', 'rain'];
console.log(findWords(board, words)); //['eat','oath']
const board2 = [
  ['a', 'b'],
  ['c', 'd']
];
const words2 = ['acdb'];
console.log(findWords(board2, words2)); //[]

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