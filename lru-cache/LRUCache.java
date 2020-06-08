import java.util.*;

class LRUCacheItem {
  int key;
  int value;
  LRUCacheItem previous;
  LRUCacheItem next;

  public LRUCacheItem() {
  }

  public LRUCacheItem(int key, int value) {
    this.key = key;
    this.value = value;
  }
}

class LRUCache {
  int capacity;
  Map<Integer, LRUCacheItem> hash;

  // DOUBLE LINKED LIST HEAD (MOST RECENTLY UDPATED) TAIL (LEAST RECENTLY UPDATED)
  LRUCacheItem headDummy;
  LRUCacheItem tailDummy;

  public LRUCache(int capacity) {
    this.capacity = capacity;
    this.hash = new HashMap<>();
    this.headDummy = new LRUCacheItem();
    this.tailDummy = new LRUCacheItem();
    headDummy.next = tailDummy;
    tailDummy.previous = headDummy;
  }

  public int get(int key) {
    LRUCacheItem item = this.hash.get(key);
    if (item == null) {
      return -1;
    }

    moveToFront(item);
    return item.value;
  }

  private void removeFromList(LRUCacheItem item) {
    item.previous.next = item.next;
    item.next.previous = item.previous;
  }

  private void moveToFront(LRUCacheItem item) {
    removeFromList(item);
    addToFront(item);
  }

  private void addToFront(LRUCacheItem item) {
    item.next = headDummy.next;
    item.next.previous = item;
    item.previous = headDummy;
    headDummy.next = item;
  }

  public void put(int key, int value) {
    LRUCacheItem item = this.hash.get(key);
    if (item != null) {
      item.value = value;
      moveToFront(item);
    } else {
      item = new LRUCacheItem(key, value);
      addToFront(item);
    }

    this.hash.put(key, item);

    if (this.hash.size() > capacity) {
      evictLeastRecentlyUsedItem();
    }
  }

  private void evictLeastRecentlyUsedItem() {
    LRUCacheItem itemToRemove = tailDummy.previous;
    this.hash.remove(itemToRemove.key);
    removeFromList(itemToRemove);
  }

  public static void main(String[] args) {
    LRUCache cache = new LRUCache(2);
    cache.put(2, 1); // ok
    cache.put(1, 1); // ok
    cache.put(2, 3); // update key 2 to val 3
    cache.put(4, 1); // evict 1
    System.out.println(cache.get(1)); // -1
    System.out.println(cache.get(2)); // 3

    LRUCache cache2 = new LRUCache(2);
    System.out.println(cache2.get(2)); // -1
    cache2.put(2, 6); // OK
    System.out.println(cache2.get(1)); // -1
    cache2.put(1, 5); // OK
    cache2.put(1, 2); // OK
    System.out.println(cache2.get(1)); // 2
    System.out.println(cache2.get(2)); // 6
  }
}

// USING LINKEDHASHMAP
// class LRUCache extends LinkedHashMap<Integer, Integer> {
// /**
// *
// */
// private static final long serialVersionUID = 1L;
// private int capacity;

// public LRUCache(int capacity) {
// super(capacity, 0.75f, true);
// this.capacity = capacity;
// }

// public int get(int key) {
// return super.getOrDefault(key, -1);
// }

// public void put(int key, int value) {
// super.put(key, value);
// }

// @Override
// protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
// return size() > capacity;
// }
// }

/**
 * Your LRUCache object will be instantiated and called as such: LRUCache obj =
 * new LRUCache(capacity); int param_1 = obj.get(key); obj.put(key,value);
 */