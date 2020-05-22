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

module.exports.TreeNode = TreeNode;
module.exports.BinaryMatrix = BinaryMatrix;
module.exports.LinkedListNode = LinkedListNode;