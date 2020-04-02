const totalFruit = trees => {
  if (!trees) {
    return 0;
  }

  let i = 0;
  let j = 0;
  let max = -1;
  const hash = {}; //map fruit to most recent index where it occurred

  while (j < trees.length) {
    if (Object.keys(hash).length <= 2) {
      //add fruit
      hash[trees[j]] = j++;
    }

    if (Object.keys(hash).length > 2) {
      //find earliest index in the hash
      let minIndex = trees.length - 1;
      Object.keys(hash).forEach(treeType => {
        minIndex = Math.min(minIndex, hash[treeType]);
      });

      i = minIndex + 1;
      delete hash[trees[minIndex]];
    }

    max = Math.max(max, j - i);
  }

  return max;
};

console.log(totalFruit([1, 2, 1]));
console.log(totalFruit([0, 1, 2, 2]));
console.log(totalFruit([3,3,3,1,2,1,1,2,3,3,4]));