DROP DATABASE `1241`;
CREATE DATABASE `1241`;
USE `1241`;

CREATE TABLE `Submissions` (
  `sub_id` INT,
  `parent_id` INT
);

INSERT INTO `Submissions` VALUES
(1, Null),
(2, Null),
(1, Null),
(12, Null),
(3, 1),
(5, 2),
(3, 1),
(4, 1),
(9, 1),
(10, 2),
(6, 7);

--WE START WITH THE PARENT POSTS WHICH IS WHERE `parent_id` IS NULL

SELECT `S`.`sub_id` AS `post_id`,
(
  SELECT COUNT(DISTINCT(`S1`.`sub_id`))
  FROM `Submissions` AS `S1`
  WHERE `S1`.`parent_id` = `S`.`sub_id`
) AS `number_of_comments`
FROM `Submissions` AS  `s`
WHERE `S`.`parent_id` IS NULL
GROUP BY `s`.`sub_id`
ORDER BY `post_id` ASC;

-- # CAN USE DISTINCT INSTEAD OF GROUP BY
-- # SELECT
-- #     DISTINCT `sub_id` AS `post_id`,
-- #     (SELECT COUNT(DISTINCT `sub_id`)
-- #      FROM `Submissions` AS `S2`
-- #      WHERE `S1`.`sub_id` = `S2`.`parent_id`
-- #     ) AS `number_of_comments`
-- # FROM
-- #     `Submissions` AS `S1`
-- # WHERE `parent_id` IS NULL
-- # ORDER BY `sub_id`;

-- CAN ALSO JOIN THE TABLE WITH ITSELF
SELECT
    `S1`.`sub_id` AS `post_id`,
    COUNT(DISTINCT `S2`.`sub_id`) AS `number_of_comments`
FROM
    `Submissions` `S1`
LEFT OUTER JOIN
    `Submissions` `S2`
ON
    `S1`.`sub_id` = `S2`.`parent_id`
WHERE `S1`.`parent_id` IS NULL
GROUP BY `S1`.`sub_id`;