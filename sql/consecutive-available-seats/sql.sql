SELECT DISTINCT `C1`.`seat_id`
FROM `cinema` AS `C1` INNER JOIN `Cinema` `C2`
ON (
  ABS(`C1`.`seat_id` - `C2`.`seat_id`) = 1 AND
  `C1`.`free` = TRUE AND `C2`.`free` = TRUE
)
ORDER BY `C1`.`seat_id`;

# SELECT DISTINCT `seat_id`
# FROM `cinema`
# WHERE `free` = 1 AND
#   ((`seat_id` - 1 IN (SELECT `seat_id` FROM `cinema` WHERE `free` = 1)) OR
#   (`seat_id` + 1 IN (SELECT `seat_id` FROM `cinema` WHERE `free` = 1)))
# ORDER BY `seat_id`;

# SELECT DISTINCT `C1`.`seat_id`
# FROM `cinema` AS `C1` INNER JOIN `cinema` AS `C2` ON (`C1`.`seat_id` = `C2`.`seat_id` + 1 OR `C1`.`seat_id` = `C2`.`seat_id` - 1)
# WHERE `C1`.`free` = TRUE AND `C2`.`free` = TRUE
# ORDER BY `seat_id`;