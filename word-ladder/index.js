/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
const ladderLength = function (beginWord, endWord, wordList) {
  const dictionary = preProcess(wordList);
  const seen = new Set([beginWord]);
  const queue = [beginWord];
  let steps = 0;

  while (queue.length) {
    steps++;

    let numNodes = queue.length;
    while (numNodes) {
      const currentWord = queue.shift();
      numNodes--;

      for (const genericWord of getGenericWords(currentWord)) {
        for (const nextWord of dictionary[genericWord] || []) {
          if (seen.has(nextWord)) {
            continue;
          }

          if (nextWord === endWord) {
            return steps + 1;
          }

          seen.add(nextWord);
          queue.push(nextWord);
        }
      }
    }
  }

  return 0;
};

const preProcess = function (wordList) {
  const dictionary = {};

  for (const word of wordList) {
    for (const genericWord of getGenericWords(word)) {
      dictionary[genericWord] = dictionary[genericWord] || [];
      dictionary[genericWord].push(word);
    }
  }

  return dictionary;
};

/**
 * preprocess function to put wildcard characters in each position
 * helps to build a word ladder
 * @param {*} word
 */
const getGenericWords = (word) => {
  const genericWords = [];
  const wordLength = word.length;

  for (let i = 0; i < wordLength; i++) {
    genericWords.push(`${word.substr(0, i)}*${word.substr(i + 1)}`);
  }

  return genericWords;
};

console.log(
  ladderLength('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog'])
); // 5

console.log(ladderLength('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log'])); // 0
