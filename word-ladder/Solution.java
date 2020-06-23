//https://leetcode.com/problems/word-ladder/solution/
// BETTER SOLUTION IS DOUBLE BFS

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.Set;

/**
 * Time Complexity: O(M^2 * N) M is the length of each word N is the total
 * number of words in the input word list.
 */

class Solution {

  // TIME: O(N) * O(M) * O(M) = O(M^2 * N)
  // SPACE: O(N) * O(M) * O(M) . each word has 1 generic word for each character
  // and for each M intermediate word we save the original word
  // so for every word we need M^2 space to save all transformations
  private Map<String, List<String>> preProcess(int length, List<String> wordList) {
    // Dictionary to hold combination of words that can be formed,
    // from any given word. By changing one letter at a time.
    // Key is the generic word
    // Value is a list of words which have the same intermediate generic word.
    Map<String, List<String>> dictionary = new HashMap<>();

    for (String word : wordList) { // O(N) for this loop
      for (int i = 0; i < length; i++) { // O(M) for this loop
        // O(M) operation bc immutable strings
        String newWord = word.substring(0, i) + '*' + word.substring(i + 1, length);

        List<String> transformations = dictionary.getOrDefault(newWord, new ArrayList<>());
        transformations.add(word);
        dictionary.put(newWord, transformations);
      }
    }

    return dictionary;
  }

  // SPACE: SEE ABOVE FOR DICTIONARY, O(M * N) for the queue, O(N) for visted set
  // = O(M^2 * N) SPACE
  // we could make this better by storing the string indices in wordList instead
  // of the word
  // TIME: BFS might hit every node which is O(N)
  // also, we do M iterations per node, and use substring again so O(M^2) * O(N)
  // note: we could store the intermediate words in a hash while making the
  // dictionary = O(N * M^2)
  public int ladderLength(String beginWord, String endWord, List<String> wordList) {
    int length = beginWord.length();
    Map<String, List<String>> dictionary = preProcess(length, wordList);

    // Queue for BFS
    Queue<String> queue = new LinkedList<>();
    queue.add(beginWord);

    // Visited to make sure we don't repeat processing same word.
    Set<String> visited = new HashSet<>();
    visited.add(beginWord);
    int steps = 0;

    while (!queue.isEmpty()) {
      steps++;
      int numNodes = queue.size();
      while (numNodes > 0) {
        String currentWord = queue.remove();
        numNodes--;

        for (int i = 0; i < length; i++) {
          String genericWord = currentWord.substring(0, i) + '*' + currentWord.substring(i + 1, length);

          // Next states are all the words which share the same intermediate state.
          for (String nextWord : dictionary.getOrDefault(genericWord, new ArrayList<>())) {
            if (visited.contains(nextWord)) {
              continue;
            }

            // If at any point if we find what we are looking for
            // i.e. the end word - we can return with the answer.
            if (nextWord.equals(endWord)) {
              return steps + 1;
            }

            // Otherwise, add it to the BFS Queue. Also mark it visited
            visited.add(nextWord);
            queue.add(nextWord);
          }
        }
      }
    }

    return 0;
  }
}