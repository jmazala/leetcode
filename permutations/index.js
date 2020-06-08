var permute = function (nums) {
  const results = [];
  helper([], nums);
  return results;

  function helper(current, remaining) {
    if (!remaining.length) {
      results.push(Array.from(current));
      return;
    }

    for (let i = 0; i < remaining.length; i++) { // Loop through remaining elements
      current.push(remaining[i]); // Insert the iTH element onto the end of current
      
      //WITH SPLICE IS FASTER THAN WITH CONCAT
      const newRemaining = Array.from(remaining);
      newRemaining.splice(i, 1);
      helper(Array.from(current), Array.from(newRemaining));

      //WITH CONCAT (SLOW)
      // helper(Array.from(current), remaining.slice(0, i).concat(remaining.slice(i + 1))); // Recurse with inserted element removed
      
      current.pop(); // Remove last inserted element for next iteration
    }
  };
};


console.log(JSON.stringify(permute([1, 2, 3])));