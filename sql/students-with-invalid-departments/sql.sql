# Write your MySQL query statement below
SELECT `S`.`id`, `S`.`name`
FROM `Students` AS `S` LEFT OUTER JOIN `Departments` AS `D` ON (`S`.`department_id` = `D`.`id`)
WHERE `D`.`id` IS NULL;
