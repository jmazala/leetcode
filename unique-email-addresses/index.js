/**
 * @param {string[]} emails
 * @return {number}
 */
var numUniqueEmails = function (emails) {
  let set = new Set();
  let answer = 0;

  emails.forEach(email => {
    let [local, domain] = email.split('@');
    local = local.replace(/\./g, '').replace(/\+\S+$/g, '');
    set.add(`${local}@${domain}`);
  });

  return set.size;
};

console.log(numUniqueEmails(["test.email+alex@leetcode.com", "test.e.mail+bob.cathy@leetcode.com", "testemail+david@lee.tcode.com"]));