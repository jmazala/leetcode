# Write your MySQL query statement below
SELECT `U`.`unique_id`, `E`.`name`
FROM
  `Employees` AS `E` LEFT OUTER JOIN
  `EmployeeUNI` AS `U`
  ON (`U`.`id` = `E`.`id`);