DROP DATABASE `1327`;
CREATE DATABASE `1327`;
USE `1327`;

CREATE TABLE `Products` (
  `product_id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `product_name` VARCHAR(255),
  `product_category` VARCHAR(255)
);

INSERT INTO `Products` VALUES
(1, "Leetcode Solutions", "Book"),
(2, "Jewels of Stringology", "Book"),
(3, "HP", "Laptop"),
(4, "Lenovo", "Laptop"),
(5, "Leetcode Kit", "T-shirt");

CREATE TABLE `Orders` (
  `product_id` INT NOT NULL,
  `order_date` DATE NOT NULL,
  `unit` INT NOT NULL
);

INSERT INTO `Orders` VALUES
 (1, DATE('2020-02-05'), 60),
 (1, DATE('2020-02-10'), 70),
 (2, DATE('2020-01-18'), 30),
 (2, DATE('2020-02-11'), 80),
 (3, DATE('2020-02-17'), 2),
 (3, DATE('2020-02-24'), 3),
 (4, DATE('2020-03-01'), 20),
 (4, DATE('2020-03-04'), 30),
 (4, DATE('2020-03-04'), 60),
 (5, DATE('2020-02-25'), 50),
 (5, DATE('2020-02-27'), 50),
 (5, DATE('2020-03-01'), 50);

SELECT `P`.`product_name`, SUM(`unit`) AS `unit`
FROM
  `Products` AS `P` LEFT OUTER JOIN `Orders` AS `O`
  ON (`P`.`product_id` = `O`.`product_id`)
WHERE MONTH(`O`.`order_date`) = 2 AND YEAR(`O`.`order_date`) = 2020
GROUP BY `P`.`product_id`
HAVING `unit` >= 100;