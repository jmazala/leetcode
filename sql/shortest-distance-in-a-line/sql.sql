DROP DATABASE `613`;
CREATE DATABASE `613`;

CREATE TABLE `point` (
  x INT NOT NULL
);

INSERT INTO `point` VALUES (-1), (0), (2);
SELECT MIN(ABS(P1.x - P2.x)) AS `shortest`
FROM POINT `P1` INNER JOIN POINT `P2`
WHERE `P1`.`x` != `P2`.`x`;