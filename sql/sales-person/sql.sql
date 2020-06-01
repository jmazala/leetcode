DROP DATABASE `607`;
CREATE DATABASE `607`;
USE `607`;

CREATE TABLE `salesperson` (
  `sales_id` INT,
  `name` VARCHAR(255),
  `salary` INT UNSIGNED,
  `commission_rate` INT UNSIGNED,
  `hire_date` DATE
);

INSERT INTO `salesperson` VALUES
(1, "John", 100000, 6, DATE("2006/04/01")), 
(2, "Amy", 120000, 5, DATE("2010/05/01")),
(3, "Mark", 65000, 12, DATE("2008/12/25")),
(4, "Pam", 25000, 25, DATE("2005/01/01")), 
(5, "Alex", 50000, 10, DATE("2007/02/03"));

CREATE TABLE `company` (
  `com_id` INT UNSIGNED,
  `name` VARCHAR(255),
  `city` VARCHAR(255)
);

INSERT INTO `company` VALUES
(1, "RED", "Boston"),
(2, "ORANGE","New York"),
(3, "YELLOW", "Boston"),
(4, "GREEN", "Austin");

CREATE TABLE `orders` (
  `order_id` INT,
  `order_date` DATE,
  `com_id` INT,
  `sales_id` INT,
  `amount` INT
);

INSERT INTO `orders` VALUES
(1, DATE("2014/01/01"), 3, 4, 100000),
(2, DATE("2014/02/01"), 4, 5, 5000),
(3, DATE("2014/03/01"), 1, 1, 50000),
(4, DATE("2014/04/01"), 1, 4, 25000);

SELECT `name`
FROM `salesperson`
WHERE `sales_id` NOT IN
(
  SELECT `sales_id`
  FROM `orders` AS `O` INNER JOIN `company` AS `C` ON
  (`O`.`com_id` = `C`.`com_id`)
  WHERE `C`.`name` = "RED"
);