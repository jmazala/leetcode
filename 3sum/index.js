/**
 * @param {number[]} nums
 * @return {number[][]}
 */

const threeSum = function (nums) {
  const twoSumHash = {};
  const answer = [];
  const set = new Set();

  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      const twoSum = nums[i] + nums[j];
      twoSumHash[twoSum] = twoSumHash[twoSum] || [];
      twoSumHash[twoSum].push([i, j]);
    }
  }

  for (let i = 0; i < nums.length; i++) {
    const difference = 0 - nums[i];
    if (difference in twoSumHash) {
      for (const [j, k] of twoSumHash[difference]) {
        if (i === j || i === k) {
          continue;
        }

        const entry = [nums[i], nums[j], nums[k]].sort();
        const setKey = entry.join(',');
        if (set.has(setKey)) {
          continue;
        }

        answer.push(entry);
        set.add(setKey);
      }
    }
  }

  return answer;
};

// with 3 pointers
// var threeSum = function (nums) {
//   nums.sort((a, b) => a - b);
//   const answer = [];

//   //fix the first number in place.
//   for (let i = 0; i < nums.length - 2; i++) {
//     if (nums[i] > 0) {
//       break;
//     }

//     if (i > 0 && nums[i] === nums[i - 1]) {
//       continue; //no duplicate nums
//     }

//     let left = i + 1;
//     let right = nums.length - 1;

//     while (left < right) {
//       const sum = nums[left] + nums[right] + nums[i];

//       if (sum === 0) {
//         answer.push([nums[left], nums[right], nums[i]]);
//         //skip duplicates
//         while (left < right - 1 && nums[left] === nums[left + 1]) {
//           left++;
//         }

//         while (left < right - 1 && nums[right] === nums[right - 1]) {
//           right--;
//         }

//         left++;
//         right--;
//         continue;
//       }

//       if (sum < 0) {
//         left++;
//         continue;
//       }

//       if (sum > 0) {
//         right--;
//       }
//     }
//   }
//   return answer;
// };

// with a hash table
// var threeSum = function (nums) {
//   const twoSum = {};
//   const answer = [];
//   const set = new Set();

//   for (let i = 0; i < nums.length - 1; i++) {
//     for (let j = i + 1; j < nums.length; j++) {
//       const sum = nums[i] + nums[j];
//       twoSum[sum] = twoSum[sum] || [];
//       twoSum[sum].push([i, j]);
//     }
//   }

//   for (let i = 0; i < nums.length; i++) {
//     const num = nums[i];
//     const desired = 0 - num;
//     const match = twoSum[desired] || [];
//     match.forEach(([x, y]) => {
//       if (i !== x && i !== y) {
//         const newEntry = [num, nums[x], nums[y]].sort();
//         const setString = newEntry.join(',');
//         if (!set.has(setString)) {
//           answer.push(newEntry);
//           set.add(setString);
//         }
//       }
//     });
//     //  if (twoSum[desired] && twoSum[desired][0] !== i && twoSum[desired][1] !== i) {
//     //   answer.push([i, twoSum[desired][0], twoSum[desired][1]]);
//     //  }
//   }

//   return answer;
// };

// recursively
// var threeSum = function (nums) {
//   const answer = [];
//   const set = new Set();
//   helper(0, []);
//   return answer;

//   function helper(index, prefix) {
//     if (prefix.length === 3) {
//       const combination = Array.from(prefix).sort().join(',');
//       if (set.has(combination)) {
//         return;
//       }

//       set.add(combination);
//       if (_.sum(prefix) === 0) {
//         answer.push(Array.from(prefix));
//       }

//       return;
//     }

//     for (let i = index; i < nums.length; i++) {
//       //take this number
//       prefix.push(nums[i]);
//       helper(i + 1, prefix);
//       prefix.pop();
//       //dont take this number;
//       helper(i + 1, prefix);
//     }
//   }
// };

console.log(JSON.stringify(threeSum([1, -1, -1, 0]))); // [[-1,0,1]]
console.log(JSON.stringify(threeSum([-1, 0, 1, 2, -1, -4]))); // [[-1,0,1],[-1,-1,2]]
console.log(JSON.stringify(threeSum([0, 0, 0, 0]))); // [0,0,0]
console.log(
  JSON.stringify(
    threeSum([-4, -2, 1, -5, -4, -4, 4, -2, 0, 4, 0, -2, 3, 1, -5, 0])
  )
); // [[-4,1,3],[-4,0,4],[-2,1,1],[-2,-2,4],[-5,1,4],[0,0,0]]
