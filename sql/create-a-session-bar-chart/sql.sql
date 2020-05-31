DROP DATABASE `1435`;
CREATE DATABASE `1435`;

CREATE TABLE `Sessions` (
  `session_id` INT PRIMARY KEY NOT NULL,
  `duration` INT UNSIGNED NOT NULL
);

INSERT INTO `Sessions` VALUES (1, 30), (2, 199), (3, 299), (4, 580), (5, 1000);

SELECT "[0-5>" AS `bin`, SUM(IF(`duration` / 60 BETWEEN 0 AND 5, 1, 0)) AS `total` FROM `Sessions`
UNION ALL
SELECT "[5-10>" AS `bin`, SUM(IF(`duration` / 60 BETWEEN 5 AND 10, 1, 0)) AS `total` FROM `Sessions` 
UNION ALL
SELECT "[10-15>" AS `bin`, SUM(IF(`duration` / 60 BETWEEN 10 AND 15, 1, 0)) AS `total` FROM `Sessions`
UNION ALL
SELECT "15 or more" AS `bin`, SUM(IF(`duration` / 60 > 15, 1, 0)) AS `total` FROM `Sessions`
;

-- # THIS DOESN'T INCLUDE THE "[10-15>" 0 COUNT ROW
-- SELECT `session_id`, CASE
--   WHEN `duration` / 60 BETWEEN 0 AND 5 THEN "[0-5>"
--   WHEN `duration` / 60 BETWEEN 5 AND 10 THEN "[5-10>"
--   WHEN `duration` / 60 BETWEEN 10 AND 15 THEN "[10-15>"
--   ELSE "15 or more"
--   END AS `bin`
-- FROM `Sessions`;
