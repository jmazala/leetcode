-- #USING HAVING
SELECT `S`.`buyer_id`
FROM
  `Sales` AS `S` INNER JOIN
  `Product` AS `P`
  USING(`product_id`)
GROUP BY `S`.`buyer_id`
HAVING
  SUM(`P`.`product_name` = "S8") > 0 AND
  SUM(`P`.`product_name` = "iPhone") = 0;

-- # USING IN AND NOT IN
-- SELECT DISTINCT `buyer_id`
-- FROM `Sales`
-- WHERE
--   `buyer_id` IN (
--     SELECT `buyer_id`
--     FROM `Sales` AS `S` INNER JOIN `Product` AS `P`
--     ON (`S`.`product_id` = `P`.`product_id`)
--     WHERE `P`.`product_name` = "S8"
--   ) AND
--   `buyer_id` NOT IN (
--     SELECT `buyer_id`
--     FROM `Sales` AS `S` INNER JOIN `Product` AS `P`
--     ON (`S`.`product_id` = `P`.`product_id`)
--     WHERE `P`.`product_name` = "iPhone"
--   );