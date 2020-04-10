var permute = function (nums) {
  let results = [];
  permutations([], nums);
  return results;

  function permutations(current, remaining) {
    if (!remaining.length) {
      results.push(Array.from(current));
      return;
    }

    for (let i = 0; i < remaining.length; i++) { // Loop through remaining elements
      current.push(remaining[i]); // Insert the iTH element onto the end of current
      permutations(Array.from(current), remaining.slice(0, i).concat(remaining.slice(i + 1))); // Recurse with inserted element removed
      current.pop(); // Remove last inserted element for next iteration
    }
  };
};


console.log(permute([1, 2, 3]));