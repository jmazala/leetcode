/**
 * @param {number} N
 * @param {number[][]} dislikes
 * @return {boolean}
 */

// WITH A FOR LOOP
const possibleBipartition = function (N, dislikes) {
  if (N === 1 || dislikes.length === 0) {
    return true;
  }

  const dislikeHash = Array(N + 1)
    .fill()
    .map((i) => Array(0).fill());

  // each dislike is an EDGE on the GRAPH we can't traverse
  for (const [person1, person2] of dislikes) {
    dislikeHash[person1].push(person2);
    dislikeHash[person2].push(person1);
  }

  // groupAssignments[i] = GROUP 0 or GROUP 1 for person i
  const groupAssignments = {};

  for (let i = 1; i <= N; i++) {
    if (i in groupAssignments) {
      continue;
    }

    groupAssignments[i] = 0;

    const stack = [i];
    while (stack.length) {
      const person = stack.pop();

      for (const dislikedPerson of dislikeHash[person]) {
        if (dislikedPerson in groupAssignments) {
          if (groupAssignments[dislikedPerson] === groupAssignments[person]) {
            return false;
          }
        } else {
          groupAssignments[dislikedPerson] =
            groupAssignments[person] === 0 ? 1 : 0;
          stack.push(dislikedPerson);
        }
      }
    }
  }

  return true;
};

// WITH A GRAPH AND DFS
// var possibleBipartition = function (N, dislikes) {
//   if (N === 1 || dislikes.length === 0) {
//     return true;
//   }

//   const dislikeHash = Array(N + 1).fill().map(i => Array(0).fill());

//   //each dislike is an EDGE on the GRAPH we can't traverse
//   for ([person1, person2] of dislikes) {
//     dislikeHash[person1].push(person2);
//     dislikeHash[person2].push(person1);
//   }

//   //groupAssignments[i] = GROUP 0 or GROUP 1 for person i
//   const groupAssignments = {};

//   for (let i = 1; i <= N; i++) {
//     if (i in groupAssignments) {
//       continue; //already been assigned to a group from the DFS
//     }

//     if (!dfs(i, 0)) {
//       return false;
//     }
//   }

//   return true;

//   function dfs(person, groupNumber) {
//     if (person in groupAssignments) {
//       return groupAssignments[person] === groupNumber;
//     }

//     groupAssignments[person] = groupNumber;

//     const dislikedGroupNumber = groupNumber === 0 ? 1 : 0;
//     for (const dislikedPerson of dislikeHash[person]) {
//       //try and put them in the other group with the dfs call
//       if (!dfs(dislikedPerson, dislikedGroupNumber)) {
//         return false;
//       }
//     }

//     return true;
//   }
// }

// recursive iterations, trying all combinations.  time limit exceeded
// var possibleBipartition = function (N, dislikes) {
//   const dislikeHash = {};
//   for (let i = 1; i <= N; i++) {
//     dislikeHash[i] = new Set();
//   }

//   for ([person1, person2] of dislikes) {
//     dislikeHash[person1].add(person2);
//     dislikeHash[person2].add(person1);
//   }

//   return helper(1, new Set(), new Set());

//   function helper(person, group1, group2) {
//     if (person > N) {
//       return true;
//     }

//     //try to add person to group1 or group2
//     let result = false;
//     let addToGroup1 = true;
//     for (disliked of dislikeHash[person]) {
//       if (group1.has(disliked)) {
//         addToGroup1 = false;
//         break
//       }
//     }

//     if (addToGroup1) {
//       group1.add(person);
//       result = helper(person + 1, group1, group2);
//     }

//     group1.delete(person);

//     if (result) {
//       return true;
//     }

//     let addToGroup2 = true;
//     for (disliked of dislikeHash[person]) {
//       if (group2.has(disliked)) {
//         addToGroup2 = false;
//         break
//       }
//     }

//     if (addToGroup2) {
//       group2.add(person);
//       result = helper(person + 1, group1, group2);
//     }

//     group2.delete(person);
//     return result;
//   }
// };

console.log(
  possibleBipartition(50, [
    [21, 47],
    [4, 41],
    [2, 41],
    [36, 42],
    [32, 45],
    [26, 28],
    [32, 44],
    [5, 41],
    [29, 44],
    [10, 46],
    [1, 6],
    [7, 42],
    [46, 49],
    [17, 46],
    [32, 35],
    [11, 48],
    [37, 48],
    [37, 43],
    [8, 41],
    [16, 22],
    [41, 43],
    [11, 27],
    [22, 44],
    [22, 28],
    [18, 37],
    [5, 11],
    [18, 46],
    [22, 48],
    [1, 17],
    [2, 32],
    [21, 37],
    [7, 22],
    [23, 41],
    [30, 39],
    [6, 41],
    [10, 22],
    [36, 41],
    [22, 25],
    [1, 12],
    [2, 11],
    [45, 46],
    [2, 22],
    [1, 38],
    [47, 50],
    [11, 15],
    [2, 37],
    [1, 43],
    [30, 45],
    [4, 32],
    [28, 37],
    [1, 21],
    [23, 37],
    [5, 37],
    [29, 40],
    [6, 42],
    [3, 11],
    [40, 42],
    [26, 49],
    [41, 50],
    [13, 41],
    [20, 47],
    [15, 26],
    [47, 49],
    [5, 30],
    [4, 42],
    [10, 30],
    [6, 29],
    [20, 42],
    [4, 37],
    [28, 42],
    [1, 16],
    [8, 32],
    [16, 29],
    [31, 47],
    [15, 47],
    [1, 5],
    [7, 37],
    [14, 47],
    [30, 48],
    [1, 10],
    [26, 43],
    [15, 46],
    [42, 45],
    [18, 42],
    [25, 42],
    [38, 41],
    [32, 39],
    [6, 30],
    [29, 33],
    [34, 37],
    [26, 38],
    [3, 22],
    [18, 47],
    [42, 48],
    [22, 49],
    [26, 34],
    [22, 36],
    [29, 36],
    [11, 25],
    [41, 44],
    [6, 46],
    [13, 22],
    [11, 16],
    [10, 37],
    [42, 43],
    [12, 32],
    [1, 48],
    [26, 40],
    [22, 50],
    [17, 26],
    [4, 22],
    [11, 14],
    [26, 39],
    [7, 11],
    [23, 26],
    [1, 20],
    [32, 33],
    [30, 33],
    [1, 25],
    [2, 30],
    [2, 46],
    [26, 45],
    [47, 48],
    [5, 29],
    [3, 37],
    [22, 34],
    [20, 22],
    [9, 47],
    [1, 4],
    [36, 46],
    [30, 49],
    [1, 9],
    [3, 26],
    [25, 41],
    [14, 29],
    [1, 35],
    [23, 42],
    [21, 32],
    [24, 46],
    [3, 32],
    [9, 42],
    [33, 37],
    [7, 30],
    [29, 45],
    [27, 30],
    [1, 7],
    [33, 42],
    [17, 47],
    [12, 47],
    [19, 41],
    [3, 42],
    [24, 26],
    [20, 29],
    [11, 23],
    [22, 40],
    [9, 37],
    [31, 32],
    [23, 46],
    [11, 38],
    [27, 29],
    [17, 37],
    [23, 30],
    [14, 42],
    [28, 30],
    [29, 31],
    [1, 8],
    [1, 36],
    [42, 50],
    [21, 41],
    [11, 18],
    [39, 41],
    [32, 34],
    [6, 37],
    [30, 38],
    [21, 46],
    [16, 37],
    [22, 24],
    [17, 32],
    [23, 29],
    [3, 30],
    [8, 30],
    [41, 48],
    [1, 39],
    [8, 47],
    [30, 44],
    [9, 46],
    [22, 45],
    [7, 26],
    [35, 42],
    [1, 27],
    [17, 30],
    [20, 46],
    [18, 29],
    [3, 29],
    [4, 30],
    [3, 46],
  ])
); // true
console.log(possibleBipartition(99, [])); // true
console.log(
  possibleBipartition(4, [
    [1, 2],
    [1, 3],
    [2, 4],
  ])
); // true group1=[1,4] group2=[2,3]
console.log(
  possibleBipartition(5, [
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],
  ])
); // true
console.log(
  possibleBipartition(200, [
    [44, 117],
    [90, 187],
    [62, 64],
    [10, 170],
    [23, 60],
    [3, 170],
    [65, 187],
    [85, 168],
    [131, 149],
    [153, 160],
    [76, 100],
    [34, 153],
    [20, 136],
    [135, 139],
    [17, 46],
    [58, 152],
    [110, 138],
    [138, 145],
    [1, 122],
    [8, 107],
    [64, 88],
    [107, 163],
    [38, 149],
    [130, 170],
    [46, 97],
    [92, 116],
    [54, 104],
    [124, 187],
    [11, 92],
    [48, 152],
    [90, 152],
    [29, 63],
    [10, 75],
    [23, 95],
    [36, 101],
    [55, 139],
    [2, 53],
    [1, 53],
    [140, 153],
    [19, 174],
    [20, 32],
    [62, 75],
    [62, 149],
    [23, 53],
    [35, 190],
    [4, 35],
    [55, 161],
    [138, 151],
    [85, 177],
    [104, 122],
    [30, 64],
    [148, 152],
    [63, 83],
    [14, 153],
    [29, 95],
    [104, 115],
    [10, 153],
    [34, 138],
    [106, 149],
    [35, 41],
    [2, 99],
    [144, 174],
    [52, 159],
    [46, 197],
    [25, 159],
    [85, 118],
    [101, 140],
    [47, 64],
    [62, 104],
    [12, 159],
    [54, 92],
    [112, 174],
    [177, 187],
    [18, 107],
    [1, 33],
    [75, 102],
    [20, 176],
    [137, 170],
    [2, 38],
    [60, 75],
    [88, 135],
    [2, 128],
    [153, 178],
    [35, 132],
    [69, 135],
    [75, 124],
    [96, 199],
    [44, 159],
    [96, 144],
    [28, 174],
    [29, 88],
    [25, 104],
    [53, 83],
    [39, 159],
    [38, 135],
    [83, 125],
    [150, 187],
    [94, 158],
    [4, 100],
    [30, 86],
    [158, 171],
    [170, 184],
    [8, 104],
    [85, 143],
    [159, 162],
    [20, 200],
    [12, 29],
    [92, 199],
    [64, 99],
    [75, 176],
    [20, 196],
    [96, 111],
    [104, 126],
    [79, 158],
    [166, 170],
    [93, 96],
    [126, 158],
    [35, 167],
    [25, 55],
    [29, 81],
    [7, 149],
    [57, 152],
    [81, 159],
    [74, 85],
    [46, 122],
    [38, 55],
    [129, 170],
    [114, 117],
    [117, 163],
    [65, 109],
    [2, 30],
    [108, 153],
    [55, 105],
    [90, 159],
    [64, 134],
    [85, 197],
    [35, 90],
    [127, 149],
    [104, 111],
    [101, 126],
    [75, 106],
    [2, 82],
    [29, 42],
    [8, 170],
    [104, 132],
    [153, 186],
    [83, 146],
    [81, 107],
    [140, 152],
    [149, 160],
    [29, 126],
    [42, 170],
    [53, 104],
    [24, 153],
    [23, 99],
    [35, 169],
    [78, 96],
    [101, 129],
    [104, 176],
    [64, 157],
    [100, 190],
    [2, 186],
    [64, 98],
    [43, 100],
    [94, 96],
    [46, 51],
    [10, 83],
    [75, 99],
    [20, 171],
    [37, 86],
    [85, 191],
    [118, 135],
    [63, 170],
    [23, 164],
    [118, 185],
    [86, 194],
    [20, 118],
    [27, 117],
    [92, 182],
    [105, 138],
    [27, 107],
    [92, 172],
    [100, 143],
    [10, 20],
    [5, 101],
    [7, 85],
    [80, 170],
    [104, 183],
    [1, 13],
    [117, 119],
    [86, 112],
    [75, 189],
    [96, 106],
    [109, 168],
    [23, 76],
    [20, 178],
    [4, 20],
    [152, 181],
    [23, 199],
    [85, 184],
    [22, 35],
    [64, 160],
    [23, 42],
    [99, 170],
    [23, 189],
    [7, 158],
    [29, 173],
    [83, 160],
    [138, 192],
    [109, 127],
    [31, 64],
    [20, 91],
    [27, 96],
    [101, 169],
    [46, 113],
    [45, 104],
    [64, 78],
    [29, 106],
    [15, 159],
    [1, 143],
    [90, 104],
    [74, 187],
    [21, 75],
    [36, 149],
    [55, 155],
    [35, 113],
    [80, 109],
    [101, 133],
    [96, 97],
    [30, 75],
    [23, 69],
    [72, 109],
    [21, 64],
    [153, 197],
    [50, 101],
    [36, 104],
    [40, 170],
    [29, 37],
    [20, 167],
    [83, 190],
    [35, 189],
    [68, 149],
    [1, 102],
    [6, 83],
    [26, 83],
    [83, 93],
    [135, 142],
    [16, 104],
    [75, 196],
    [35, 131],
    [109, 120],
    [78, 83],
    [29, 73],
    [121, 185],
    [169, 170],
    [26, 158],
    [98, 153],
    [29, 99],
    [51, 138],
    [104, 165],
    [53, 109],
    [68, 75],
    [109, 128],
    [17, 101],
    [64, 123],
    [158, 186],
    [117, 192],
    [92, 125],
    [17, 109],
    [143, 149],
    [100, 177],
    [85, 195],
    [25, 187],
    [91, 107],
    [109, 180],
    [83, 193],
    [61, 109],
    [89, 170],
    [112, 138],
    [117, 155],
    [60, 170],
    [84, 159],
    [23, 193],
    [101, 120],
    [149, 196],
    [32, 96],
    [117, 133],
    [100, 195],
    [75, 88],
    [33, 158],
    [96, 154],
    [67, 185],
    [87, 170],
    [56, 149],
    [107, 197],
    [96, 146],
    [35, 127],
    [33, 83],
    [109, 192],
    [69, 86],
    [2, 184],
    [44, 104],
    [140, 149],
    [97, 117],
    [138, 190],
    [1, 44],
    [40, 46],
    [104, 193],
    [6, 86],
    [29, 33],
    [109, 199],
    [29, 121],
    [155, 159],
    [29, 91],
    [1, 50],
    [1, 119],
    [83, 129],
    [76, 159],
    [76, 83],
    [70, 153],
    [1, 105],
    [15, 83],
    [55, 121],
    [33, 187],
    [16, 101],
    [30, 117],
    [86, 118],
    [34, 104],
    [35, 74],
    [101, 146],
    [64, 140],
    [23, 78],
    [104, 198],
    [26, 170],
    [159, 168],
    [27, 86],
    [96, 156],
    [79, 187],
    [51, 92],
    [149, 173],
    [94, 149],
    [135, 189],
    [28, 170],
    [26, 86],
    [174, 198],
    [101, 116],
    [179, 185],
    [8, 29],
    [57, 101],
    [49, 86],
    [55, 88],
    [29, 197],
    [135, 169],
    [26, 149],
    [96, 160],
    [19, 83],
    [20, 67],
    [61, 138],
    [121, 152],
    [19, 109],
    [74, 185],
    [35, 200],
    [64, 102],
    [126, 170],
    [35, 115],
    [46, 67],
    [96, 99],
    [100, 180],
    [23, 71],
    [29, 144],
    [45, 86],
    [55, 179],
    [20, 24],
    [79, 185],
    [86, 160],
    [148, 170],
    [59, 170],
    [185, 193],
    [20, 143],
    [13, 170],
    [1, 65],
    [23, 146],
    [85, 147],
    [36, 170],
    [91, 187],
    [36, 185],
    [104, 129],
    [23, 65],
    [23, 136],
    [134, 149],
    [56, 100],
    [107, 160],
    [79, 107],
    [117, 164],
    [61, 152],
    [97, 138],
    [36, 158],
    [55, 146],
    [125, 187],
    [44, 85],
    [32, 86],
    [109, 151],
    [159, 189],
    [116, 117],
    [18, 29],
    [137, 153],
    [88, 153],
    [64, 176],
    [23, 58],
    [20, 168],
    [85, 178],
    [7, 23],
    [113, 153],
    [35, 47],
    [110, 170],
    [153, 189],
    [148, 159],
    [18, 174],
    [46, 89],
    [28, 86],
    [52, 138],
    [83, 150],
    [23, 129],
    [12, 170],
    [95, 158],
    [98, 174],
    [20, 81],
    [117, 196],
    [135, 181],
    [1, 22],
    [17, 92],
    [96, 134],
    [41, 86],
    [51, 187],
    [37, 152],
    [64, 145],
    [109, 145],
    [30, 138],
    [12, 158],
    [114, 152],
    [125, 174],
    [108, 170],
    [127, 158],
    [92, 108],
    [48, 109],
    [18, 55],
    [104, 195],
    [3, 153],
    [93, 104],
    [97, 109],
    [47, 149],
    [55, 94],
    [1, 196],
    [42, 187],
    [20, 157],
    [96, 198],
    [4, 55],
    [2, 67],
    [13, 83],
    [82, 138],
    [92, 178],
    [49, 83],
    [152, 199],
    [55, 93],
    [47, 96],
    [1, 200],
    [83, 133],
    [2, 151],
    [31, 109],
    [20, 70],
    [55, 123],
    [145, 187],
    [12, 149],
    [75, 177],
    [35, 76],
    [48, 100],
    [20, 53],
    [109, 164],
    [60, 92],
    [20, 190],
    [55, 180],
    [75, 151],
    [35, 82],
    [44, 170],
    [74, 96],
    [101, 179],
    [109, 116],
    [92, 147],
    [68, 170],
    [47, 75],
    [29, 169],
    [101, 114],
    [179, 187],
    [118, 174],
    [55, 195],
    [153, 192],
    [58, 158],
    [40, 92],
    [92, 156],
    [21, 109],
    [107, 173],
    [37, 138],
    [2, 136],
    [108, 152],
    [7, 100],
    [92, 98],
    [29, 32],
    [1, 60],
    [19, 55],
    [73, 101],
    [83, 161],
    [87, 109],
    [104, 110],
    [100, 156],
    [128, 185],
    [23, 182],
    [100, 113],
    [74, 117],
    [23, 172],
    [157, 185],
    [9, 152],
    [63, 85],
    [10, 159],
    [174, 177],
    [95, 152],
    [64, 89],
    [150, 174],
    [133, 174],
    [136, 158],
    [135, 190],
    [30, 101],
    [95, 185],
    [19, 64],
    [2, 24],
    [55, 73],
    [90, 153],
    [22, 83],
    [65, 153],
    [75, 133],
    [46, 50],
    [9, 92],
    [55, 160],
    [93, 109],
    [35, 166],
    [68, 152],
    [4, 149],
    [55, 59],
    [153, 168],
    [96, 193],
    [1, 88],
    [46, 178],
    [85, 154],
    [14, 158],
    [117, 129],
    [56, 109],
    [100, 144],
    [169, 185],
    [158, 161],
    [140, 187],
    [92, 112],
    [55, 124],
    [11, 159],
    [138, 194],
    [85, 200],
    [71, 185],
    [5, 153],
    [139, 149],
    [91, 100],
    [64, 137],
    [100, 178],
    [56, 159],
    [23, 108],
    [27, 85],
    [43, 159],
    [29, 180],
    [21, 23],
    [92, 150],
    [52, 75],
    [99, 117],
    [86, 196],
    [35, 60],
    [96, 167],
    [103, 107],
    [135, 150],
    [101, 119],
    [85, 141],
    [28, 117],
    [104, 151],
    [3, 109],
    [66, 85],
    [17, 75],
    [85, 126],
    [27, 135],
    [42, 85],
    [159, 173],
    [104, 189],
    [53, 101],
    [109, 136],
    [1, 7],
    [102, 187],
    [76, 138],
    [168, 187],
    [56, 64],
    [170, 195],
    [34, 100],
    [94, 109],
    [1, 162],
    [63, 92],
    [159, 197],
    [69, 101],
    [20, 184],
    [55, 182],
    [2, 62],
    [29, 54],
    [62, 92],
    [101, 127],
    [100, 155],
    [46, 131],
    [63, 64],
    [14, 104],
    [185, 188],
    [20, 140],
    [97, 185],
    [92, 139],
    [9, 149],
    [86, 177],
    [22, 64],
    [145, 152],
    [83, 140],
    [96, 119],
    [105, 159],
    [45, 158],
    [42, 92],
    [55, 114],
    [109, 129],
    [21, 85],
    [37, 107],
    [138, 167],
    [85, 130],
    [41, 104],
    [92, 124],
    [16, 86],
    [137, 138],
    [23, 67],
    [8, 83],
    [53, 159],
    [33, 96],
    [19, 35],
    [75, 142],
    [107, 157],
    [23, 57],
    [20, 93],
    [104, 118],
    [35, 42],
    [20, 139],
    [1, 69],
    [2, 77],
    [94, 170],
    [34, 85],
    [31, 55],
    [78, 85],
    [46, 93],
    [75, 89],
    [4, 107],
    [92, 184],
    [53, 174],
    [42, 174],
    [170, 171],
    [104, 171],
    [123, 153],
    [83, 178],
    [30, 107],
    [86, 132],
    [170, 181],
    [104, 177],
    [148, 153],
    [1, 11],
    [126, 152],
    [115, 149],
    [46, 171],
    [12, 64],
    [68, 101],
    [79, 149],
    [45, 101],
    [55, 162],
    [48, 64],
    [29, 34],
    [163, 174],
    [7, 138],
    [23, 44],
    [39, 86],
    [23, 150],
    [13, 86],
    [20, 119],
    [117, 143],
    [154, 187],
    [1, 112],
    [157, 170],
    [71, 135],
    [19, 101],
    [122, 159],
    [8, 158],
    [51, 153],
    [39, 138],
    [63, 153],
    [187, 200],
    [76, 187],
    [96, 168],
    [31, 96],
    [138, 169],
    [1, 181],
    [46, 81],
    [61, 135],
    [109, 141],
    [2, 178],
    [35, 164],
    [86, 113],
    [55, 157],
    [85, 93],
    [101, 147],
    [23, 79],
    [9, 75],
    [1, 38],
    [2, 172],
    [159, 179],
    [29, 194],
    [23, 198],
    [88, 138],
    [1, 189],
    [23, 37],
    [83, 189],
    [52, 85],
    [17, 29],
    [64, 112],
    [54, 75],
    [72, 83],
    [23, 154],
    [55, 198],
    [17, 174],
    [1, 148],
    [87, 185],
    [59, 107],
    [187, 193],
    [165, 170],
    [76, 174],
    [107, 168],
    [29, 105],
    [108, 135],
    [27, 153],
    [1, 142],
    [5, 109],
    [109, 134],
    [86, 136],
    [84, 104],
    [35, 112],
    [7, 107],
    [159, 181],
    [20, 49],
    [64, 130],
    [140, 158],
    [23, 68],
    [55, 176],
    [141, 185],
    [9, 86],
    [23, 181],
    [104, 113],
    [35, 39],
    [67, 149],
    [1, 66],
    [75, 192],
    [6, 185],
    [50, 86],
    [107, 139],
    [29, 72],
    [15, 107],
    [184, 187],
    [101, 139],
    [187, 198],
    [45, 185],
    [153, 183],
    [174, 178],
    [117, 120],
    [21, 83],
    [7, 96],
    [117, 176],
    [159, 178],
    [96, 121],
    [35, 116],
    [57, 83],
    [51, 117],
    [43, 96],
    [27, 170],
    [153, 188],
    [46, 47],
    [20, 38],
    [64, 191],
    [83, 192],
    [22, 159],
    [56, 107],
    [7, 20],
    [20, 61],
    [55, 62],
    [153, 171],
    [84, 152],
    [73, 85],
    [63, 174],
    [83, 177],
    [2, 160],
    [14, 83],
    [116, 149],
    [24, 109],
    [2, 145],
    [135, 156],
    [35, 145],
    [34, 149],
    [46, 156],
    [85, 157],
    [92, 95],
    [46, 106],
    [53, 117],
    [69, 75],
    [149, 151],
    [46, 199],
    [44, 83],
    [83, 88],
    [96, 112],
    [109, 146],
    [8, 92],
    [134, 187],
    [46, 169],
    [138, 182],
    [23, 118],
    [46, 54],
    [146, 158],
    [9, 64],
    [83, 137],
    [61, 64],
    [85, 188],
    [153, 172],
    [109, 198],
    [25, 64],
    [158, 188],
    [29, 48],
    [51, 86],
    [85, 166],
    [117, 141],
    [17, 153],
    [104, 142],
    [129, 185],
    [49, 92],
    [152, 198],
    [83, 123],
    [21, 101],
    [170, 186],
    [122, 135],
    [7, 86],
    [1, 139],
    [46, 87],
    [62, 109],
    [60, 101],
    [2, 176],
    [58, 85],
    [108, 149],
    [128, 149],
    [37, 101],
    [117, 178],
    [46, 57],
    [109, 195],
    [18, 100],
    [55, 181],
    [23, 192],
    [104, 167],
    [153, 181],
    [101, 105],
    [23, 190],
    [117, 150],
    [153, 166],
    [34, 158],
    [1, 79],
    [2, 119],
    [49, 85],
    [45, 135],
    [55, 192],
    [20, 102],
    [8, 135],
    [154, 170],
    [29, 196],
    [64, 200],
    [23, 114],
    [65, 117],
    [29, 103],
    [1, 128],
    [80, 159],
    [1, 140],
    [88, 174],
    [6, 107],
    [109, 132],
    [1, 27],
    [55, 148],
    [138, 184],
    [35, 114],
    [5, 117],
    [20, 51],
    [64, 132],
    [26, 75],
    [66, 101],
    [139, 153],
    [39, 104],
    [15, 158],
    [168, 170],
    [43, 109],
  ])
); // true
console.log(
  possibleBipartition(3, [
    [1, 2],
    [1, 3],
    [2, 3],
  ])
); // false
console.log(
  possibleBipartition(5, [
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [1, 5],
  ])
); // false
