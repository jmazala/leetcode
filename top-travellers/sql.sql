SELECT `U`.`name`, IFNULL(SUM(`R`.`distance`), 0) AS `travelled_distance`
FROM `Users` AS `U` LEFT OUTER JOIN `Rides` AS `R` ON (`R`.`user_id` = `U`.`id`)
GROUP BY `R`.`user_id`
ORDER BY `travelled_distance` DESC, `U`.`name` ASC;