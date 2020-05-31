-- https://leetcode.com/explore/interview/card/facebook/58/sql/317/
DROP DATABASE `317`;
CREATE DATABASE `317`;
USE `317`;

CREATE TABLE `employee` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Salary` int unsigned NOT NULL,
  `DepartmentId` int unsigned NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `employee` (`Name`, `Salary`, `DepartmentId`) VALUES
('Joe', 85000, 1),
('Henry', 80000, 2),
('Sam', 60000, 2),
('Max', 90000, 1),
('Janet', 69000, 1),
('Randy', 85000, 1),
('Will', 70000, 1);

CREATE TABLE `department` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `department` (`Name`) VALUES ('IT'), ('SALES');


-- A top 3 salary in this company means there is no more than 3 salary bigger than itself in the company.
-- SELECT `E1`.`Name` AS `Employee`, `E1`.`Salary` AS `Salary`
-- FROM `Employee` AS `E1`
-- WHERE 3 >
-- (
--   SELECT COUNT(DISTINCT `E2`.`Salary`)
--   FROM `Employee` AS `E2`
--   WHERE `E2`.`Salary` > `E1`.`Salary`
-- );

--Then, we need to join the Employee table with Department in order to retrieve the department information.
SELECT `D`.`Name` AS `Department`, `E1`.`Name` AS 'Employee', `E1`.`Salary` AS `Salary`
FROM `Employee` AS `E1` INNER JOIN `Department` AS `D` ON (`E1`.`DepartmentId` = `D`.`Id`)
WHERE 3 > (
  SELECT COUNT(DISTINCT `E2`.`Salary`)
  FROM `Employee` AS `E2`
  WHERE
    `E2`.`Salary` > `E1`.`Salary` AND
    `E1`.`DepartmentId` = `E2`.`DepartmentId`
) ORDER BY `Department`, `Salary` DESC;