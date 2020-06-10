/**
 * @param {string[][]} accounts
 * @return {string[][]}
 */
// DFS with a set instead of array in the graph
const accountsMerge = function (accounts) {
  const emailsToName = {};
  const graph = {};

  // first build a 2 way graph, each email to all the other common emails or itself
  for (const account of accounts) {
    const name = account[0];
    const firstEmail = account[1];

    graph[firstEmail] = graph[firstEmail] || new Set();
    emailsToName[firstEmail] = name;

    for (let i = 2; i < account.length; i++) {
      const secondEmail = account[i];
      graph[secondEmail] = graph[secondEmail] || new Set();
      graph[firstEmail].add(secondEmail);
      graph[secondEmail].add(firstEmail);
    }
  }

  const seen = new Set();
  const answer = [];

  for (const email in graph) {
    if (seen.has(email)) {
      continue;
    }

    seen.add(email);

    const stack = [email];
    const emails = [];

    while (stack.length) {
      const currentEmail = stack.pop();
      emails.push(currentEmail);

      for (const linkedEmail of graph[currentEmail]) {
        if (seen.has(linkedEmail)) {
          continue;
        }

        stack.push(linkedEmail);
        seen.add(linkedEmail);
      }
    }

    emails.sort();
    const name = emailsToName[email];
    emails.unshift(name);
    answer.push(emails);
  }

  return answer;
};

console.log(
  JSON.stringify(
    accountsMerge([
      ['John', 'johnsmith@mail.com', 'john00@mail.com'],
      ['John', 'johnnybravo@mail.com'],
      ['John', 'johnsmith@mail.com', 'john_newyork@mail.com'],
      ['Mary', 'mary@mail.com'],
    ])
  )
); // [["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],["John","johnnybravo@mail.com"],["Mary","mary@mail.com"]]
