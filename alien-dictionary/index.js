/* eslint-disable no-restricted-syntax */
/**
 * @param {string[]} words
 * @return {string}
 */
const alienOrder = function (words) {
  // build a graph
  const counts = {};
  const adjacencies = {};

  for (const word of words) {
    for (const c of word.split('')) {
      counts[c] = 0;
      adjacencies[c] = [];
    }
  }

  for (let i = 0; i < words.length - 1; i++) {
    const word1 = words[i];
    const word2 = words[i + 1];

    if (word1.length > word2.length && word1.startsWith(word2)) {
      return '';
    }

    for (let j = 0; j < Math.min(word1.length, word2.length); j++) {
      if (word1[j] !== word2[j]) {
        counts[word2[j]]++;
        adjacencies[word1[j]].push(word2[j]);
        break;
      }
    }
  }

  // topological sort the graph
  const order = [];
  const queue = Object.keys(counts).filter((i) => counts[i] === 0);

  while (queue.length) {
    const c = queue.shift();
    order.push(c);

    for (const neighbor of adjacencies[c]) {
      counts[neighbor]--;
      if (counts[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  if (order.length !== Object.keys(counts).length) {
    return '';
  }

  return order.join('');
};

console.log(alienOrder(['x', 'z', 'x'])); // ""
console.log(alienOrder(['x', 'z'])); // xz
console.log(alienOrder(['za', 'zb', 'ca', 'cb'])); // abzc
console.log(alienOrder(['wrt', 'wrf', 'er', 'ett', 'rftt'])); // wertf
