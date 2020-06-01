DROP DATABASE `1084`;
CREATE DATABASE `1084`;
USE `1084`;

CREATE TABLE  `Product` (
  `product_id` INT,
  `product_name` VARCHAR(255),
  `unit_price` INT
);

INSERT INTO `Product` VALUES
(1, "S8", 1000),
(2, "G4", 800),
(3, "iPhone", 1400);

CREATE TABLE `Sales` (
  `seller_id` INT,
  `product_id` INT,
  `buyer_id` INT,
  `sale_date` DATE,
  `quantity` INT,
  `price` INT
);

INSERT INTO `Sales` VALUES 
(1, 1, 1, DATE("2019-01-21"), 2, 2000),
(1, 2, 2, DATE("2019-02-17"), 1, 800),
(2, 2, 3, DATE("2019-06-02"), 1, 800),
(3, 3, 4, DATE("2019-05-13"), 2, 2800);

SELECT `product_id`, `product_name`
FROM `Sales` INNER JOIN `Product` USING (`product_id`)
GROUP BY `product_id`
HAVING
  MIN(`sale_date`) >= DATE("2019-01-01") AND
  MAX(`sale_date`) <= DATE("2019-03-31");