//https://leetcode.com/problems/house-robber-iii/

function rob(root) {
  return Math.max(...decision(root));
  //returns [max if rob it / max if don't rob it]
  function decision(node) {
  if (!node) {
    return [0, 0];
  }

  let [robLeft, dontRobLeft] = decision(node.left);
  let [robRight, dontRobRight] = decision(node.right);

  let robThisNode = node.val + dontRobLeft + dontRobRight;
  let dontRobThisNode = Math.max(
    robLeft + robRight,
    robLeft + dontRobLeft,
    dontRobLeft + dontRobRight,
    dontRobLeft + robRight);

  return [robThisNode, dontRobThisNode];
  }
}


// //MY SOLUTION
// var rob = function (root) {
//   //DP and DFS
//   //can do a BFS and skip odd, or skip even
//   return Math.max(dfs(root, true), dfs(root, false));
// };

// const dfs = function(node, canRobThisLevel) {
//   if (!node) {
//   return 0;
//   }

//   if (canRobThisLevel) {
//   const left = dfs(node.left, true);
//   const right = dfs(node.right, true);
  
//   if ((left + right) > node.val) {
//     return left + right;
//   }
  
//   return node.val + dfs(node.left, false) + dfs(node.right, false);
//   }

//   return dfs(node.left, true) + dfs(node.right, true);
// };


// /**
//  * Definition for a binary tree node.
//  * function TreeNode(val) {
//  *   this.val = val;
//  *   this.left = this.right = null;
//  * }
//  */
// /**
//  * @param {TreeNode} root
//  * @return {number}
//  */
// var rob = function (root) {
//   //can do a BFS and skip odd, or skip even
//   return Math.max(bfs(root, true), bfs(root, false));
// };

// function bfs(node, skipOdd) {
//   // console.log(`bfs(${skipOdd})`);
//   if (!node) {
//   return 0;
//   }

//   let answer = 0;
//   let level = 1;
//   const queue = [];

//   if (skipOdd) {
//   level = 2;
//   if (node.left) {
//     queue.push(node.left);
//   }

//   if (node.right) {
//     queue.push(node.right);
//   }
//   } else {
//   queue.push(node);
//   }

//   while (queue.length) {
//   console.log(queue.map(i => i.val));
//   let numNodes = queue.length;
//   while (numNodes) {
//     const node = queue.shift();
//     // console.log(`on node ${node.val}`);
//     numNodes--;

//     if ((level % 2 === 0 && skipOdd) || (level % 2 === 1 && !skipOdd)) {
//     answer += node.val;
//     }

//     if (node.left) {
//     // console.log(`adding ${node.left.val}`);
//     queue.push(node.left);
//     }

//     if (node.right) {
//     // console.log(`adding ${node.right.val}`);
//     queue.push(node.right);
//     }
//   }

//   level++;
//   }

//   return answer;
// }