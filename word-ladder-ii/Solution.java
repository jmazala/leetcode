import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.Set;

// USING BFS ENTIRELY (should do BFS + DFS)
// BFS to find shortest path, then DFS to find all the other paths only looking
// until that length
class Solution {
  class QueueItem {
    String word;
    Set<String> visited;

    public QueueItem(String word, Set<String> visited) {
      this.word = word;
      this.visited = new LinkedHashSet<>(visited);
      this.visited.add(word);
    }
  }

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

  public List<List<String>> findLadders(String beginWord, String endWord, List<String> wordList) {
    List<List<String>> answer = new ArrayList<>();
    int length = beginWord.length();
    Map<String, List<String>> dictionary = preProcess(length, wordList);

    // Queue for BFS
    Queue<QueueItem> queue = new LinkedList<>();
    Set<String> beginSet = new LinkedHashSet<>();
    queue.add(new QueueItem(beginWord, beginSet));

    while (!queue.isEmpty()) {
      int numNodes = queue.size();

      while (numNodes > 0) {
        numNodes--;
        QueueItem node = queue.remove();
        String currentWord = node.word;
        Set<String> visited = node.visited;
        Set<String> nextWords = new HashSet<>();

        for (int i = 0; i < length; i++) {
          String genericWord = currentWord.substring(0, i) + '*' + currentWord.substring(i + 1, length);

          // Next states are all the words which share the same intermediate state.
          for (String nextWord : dictionary.getOrDefault(genericWord, new ArrayList<>())) {
            if (visited.contains(nextWord) || nextWords.contains(nextWord)) {
              continue;
            }

            nextWords.add(nextWord);

            // If at any point if we find what we are looking for
            // i.e. the end word - we can return with the answer.
            if (nextWord.equals(endWord)) {
              answer.add(new ArrayList<>(visited));
              answer.get(answer.size() - 1).add(endWord);
            } else {
              // Otherwise, add it to the BFS Queue. Also mark it visited
              Set<String> copy = new LinkedHashSet<String>(visited);
              copy.add(nextWord);
              queue.add(new QueueItem(nextWord, copy));
            }
          }
        }
      }

      if (!answer.isEmpty()) {
        return answer;
      }
    }

    return new ArrayList<>();
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    List<String> wordList1 = Arrays.asList(new String[] { "hot", "dot", "dog", "lot", "log", "cog" });

    // [[hit, hot, dot, dog, cog], [hit, hot, lot, log, cog]]
    System.out.println(s.findLadders("hit", "cog", wordList1));

    List<String> wordList2 = Arrays.asList(new String[] { "hot", "dot", "dog", "lot", "log" });
    // []
    System.out.println(s.findLadders("hit", "cog", wordList2));
  }
}