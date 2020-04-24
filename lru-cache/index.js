var LRUCacheItem = function (key, value) {
  this.key = key;
  this.value = value;
  this.previous = null;
  this.next = null;
  return this;
}

/**
* @param {number} capacity
*/
var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.head = LRUCacheItem();
  this.tail = LRUCacheItem();
  this.map = new Map();
  this.head.next = this.tail;
  this.tail.previous = this.head;
  return this;
};

LRUCache.prototype.remove = function (item) {
  item.previous.next = item.next;
  item.next.previous = item.previous;
};

LRUCache.prototype.addToFront = function (item) {
  item.next = this.head.next;
  item.previous = this.head;
  this.head.next.previous = item;
  this.head.next = item;
};

LRUCache.prototype.moveToFront = function (item) {
  this.remove(item);
  this.addToFront(item);
};

/** 
* @param {number} key
* @return {number}
*/
LRUCache.prototype.get = function (key) {
  const item = this.map.get(key);
  if (!item) {
    return -1;
  }

  this.moveToFront(item);
  return item.value;
};

/** 
* @param {number} key 
* @param {number} value
* @return {void}
*/
LRUCache.prototype.put = function (key, value) {
  let item = this.map.get(key);
  if (!item) {
    item = new LRUCacheItem(key, value);
    this.addToFront(item);
    this.map.set(key, item);
  } else {
    item.value = value;
    this.moveToFront(item);
  }

  if (this.map.size > this.capacity) {
    const toRemove = this.tail.previous;
    this.remove(toRemove);
    this.map.delete(toRemove.key);
  }
};

/** 
* Your LRUCache object will be instantiated and called as such:
* var obj = new LRUCache(capacity)
* var param_1 = obj.get(key)
* obj.put(key,value)
*/
const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1)); // 1
cache.put(3, 3);
console.log(cache.get(2)); // -1
cache.put(4, 4);
console.log(cache.get(1)); // -1
console.log(cache.get(3)); // 3
console.log(cache.get(4)); // 4