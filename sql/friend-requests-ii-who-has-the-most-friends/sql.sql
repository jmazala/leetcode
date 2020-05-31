# -- https://leetcode.com/explore/interview/card/facebook/58/sql/327/

# Write your MySQL query statement below
SELECT `id`, COUNT(*) AS `num`
FROM (
  SELECT `requester_id` AS `id` FROM `request_accepted`
  UNION ALL
  SELECT `accepter_id` AS `id` FROM `request_accepted`
) AS `temp`
GROUP BY `id`
ORDER BY `num` DESC
LIMIT 1;