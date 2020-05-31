DROP DATABASE `1251`;
CREATE DATABASE `1251`;
USE `1251`;

CREATE TABLE `Prices` (
  `product_id` INT UNSIGNED NOT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `price` INT UNSIGNED NOT NULL
);

INSERT INTO `Prices` VALUES
(1, DATE('2019-02-17'), DATE('2019-02-28'), 5),
(1, DATE('2019-03-01'), DATE('2019-03-22'), 20),
(2, DATE('2019-02-01'), DATE('2019-02-20'), 15),
(2, DATE('2019-02-21'), DATE('2019-03-31'), 30);

CREATE TABLE `UnitsSold` (
  `product_id` INT UNSIGNED NOT NULL,
  `purchase_date` DATE NOT NULL,
  `units` INT UNSIGNED NOT NULL
);

INSERT INTO `UnitsSold` VALUES
(1, DATE('2019-02-25'), 100),
(1, DATE('2019-03-01'), 15),
(2, DATE('2019-02-10'), 200),
(2, DATE('2019-03-22'), 30);

-- #SINGLE QUERY
SELECT `P`.`product_id`, ROUND(SUM(`U`.`units` * `P`.`price`) / SUM(`U`.`units`), 2) AS `average_price`
FROM
  `Prices` AS `P` INNER JOIN
  `UnitsSold` AS `U`
  ON (
    `U`.`product_id` = `P`.`product_id` AND
    `U`.`purchase_date` BETWEEN `P`.`start_date` AND `P`.`end_date`
  )
GROUP BY `P`.`product_id`;

-- #NESTED QUERIES.  YIKES LOL
-- SELECT `product_id`, ROUND(`total_revenue` / `total_units_sold`, 2) AS `average_price`
-- FROM (
--   SELECT `product_id`, SUM(`units`) AS `total_units_sold`, SUM(`revenue`) AS `total_revenue`
--   FROM (
--     SELECT `U`.`product_id` AS `product_id`, `U`.`purchase_date`, `U`.`units`, `P`.`price`, `U`.`units` * `P`.`price` AS `revenue`
--     FROM `UnitsSold` AS `U` INNER JOIN `Prices` AS `P` ON (`U`.`product_id` = `P`.`product_id` AND `U`.`purchase_date` BETWEEN `P`.`start_date` AND `P`.`end_date`)
--   ) AS `TEMP`
--   GROUP BY `product_id`
-- ) AS `TEMP2`;