var TrieNode = function () {
  this.children = {};
  this.isWord = false;
  return this;
}

/**
* Initialize your data structure here.
*/
var Trie = function () {
  this.root = new TrieNode();
  return this;
};

/**
* Inserts a word into the trie. 
* @param {string} word
* @return {void}
*/
Trie.prototype.insert = function (word) {
  let node = this.root;
  for (const c of word) {
    if (!node.children[c]) {
      node.children[c] = new TrieNode();
    }

    node = node.children[c];
  }

  node.isWord = true;
};

/**
* Returns if the word is in the trie. 
* @param {string} word
* @return {boolean}
*/
Trie.prototype.search = function (word) {
  let node = this.root;
  for (const c of word) {
    node = node.children[c];
    if (!node) {
      return false;
    }
  }

  return node.isWord;
};

/**
* Returns if there is any word in the trie that starts with the given prefix. 
* @param {string} prefix
* @return {boolean}
*/
Trie.prototype.startsWith = function (prefix) {
  let node = this.root;
  for (const c of prefix) {
    node = node.children[c];
    if (!node) {
      return false;
    }
  }

  return true;
};

/**
* Your Trie object will be instantiated and called as such:
* var obj = new Trie()
* obj.insert(word)
* var param_2 = obj.search(word)
* var param_3 = obj.startsWith(prefix)
*/

const trie = new Trie();

trie.insert("apple");
console.log(trie.search("apple"));   // returns true
console.log(trie.search("app"));     // returns false
console.log(trie.startsWith("app")); // returns true
trie.insert("app");
console.log(trie.search("app"));     // returns true