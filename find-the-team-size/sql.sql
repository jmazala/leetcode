# Write your MySQL query statement below
SELECT `E`.`employee_id`, `T`.`team_size`
FROM
  `Employee` AS `E` INNER JOIN
  (SELECT `team_id`, COUNT(*) AS `team_size` FROM `Employee` GROUP BY `team_id`) AS `T`
  ON `E`.`team_id` = `T`.`team_id`;