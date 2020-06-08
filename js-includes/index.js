'use strict';

function LinkedListNode(val) {
  this.val = val;
  this.next = null;
  return this;
}

LinkedListNode.prototype.print = function () {
  let output = '';
  let temp = this;
  while (temp) {
    output += temp.val;
    temp = temp.next;
    if (temp) {
      output += ' -> ';
    }
  }

  return output;
}

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
  return this;
};

function bstFromPreorder(preorder) {
  if (!preorder.length) {
    return null;
  }

  const root = new TreeNode(preorder[0]);
  if (preorder.length === 1) {
    return root;
  }

  let i = 1;
  while (i < preorder.length && preorder[i] < root.val) {
    i++;
  }

  root.left = bstFromPreorder(preorder.slice(1, i));
  root.right = bstFromPreorder(preorder.slice(i));
  return root;
};

function BinaryMatrix(arr) {
  this.arr = arr;
  return this;
}

BinaryMatrix.prototype.get = function (x, y) {
  return this.arr[x][y];
};

BinaryMatrix.prototype.dimensions = function () {
  return [this.arr.length, this.arr[0].length];
};

function isPalindrome(s, start, end) {
  if (s.length < 2) {
    return true;
  }

  if (start === undefined) {
    start = 0;
  }

  if (end === undefined) {
    end = s.length - 1;
  }

  while (start <= end) {
    if (s[start] !== s[end]) {
      return false;
    }

    start++;
    end--;
  }

  return true;
}

module.exports.TreeNode = TreeNode;
module.exports.bstFromPreorder = bstFromPreorder;
module.exports.BinaryMatrix = BinaryMatrix;
module.exports.LinkedListNode = LinkedListNode;
module.exports.isPalindrome = isPalindrome;