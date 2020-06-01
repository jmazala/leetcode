DROP DATABASE `1322`;
CREATE DATABASE `1322`;
USE `1322`;

CREATE TABLE `Ads` (
  `ad_id` INT,
  `user_id` INT,
  `action` ENUM("Clicked", "Viewed", "Ignored")
);

INSERT INTO `Ads` VALUES
(1, 1, "Clicked"),
(2, 2, "Clicked"),
(3, 3, "Viewed"),
(5, 5, "Ignored"),
(1, 7, "Ignored"),
(2, 7, "Viewed"),
(3, 5, "Clicked"),
(1, 4, "Viewed"),
(2, 11, "Viewed"),
(1, 2, "Clicked");

SELECT `A1`.`ad_id` AS `ad_id`,
ROUND(
  IFNULL(100 * 
  (
    SELECT COUNT(*)
    FROM `Ads` AS `A3`
    WHERE
    `A3`.`action` = "Clicked" AND
    `A3`.`ad_id` = `A1`.`ad_id`
    GROUP BY `A3`.`ad_id`
  ) /
  (
    SELECT COUNT(*)
    FROM `Ads` AS `A2`
    WHERE
      `A2`.`action` IN("Clicked", "Viewed") AND
      `A1`.`ad_id` = `A2`.`ad_id`
    GROUP BY `A2`.`ad_id`
  ),
  0),
2) AS `ctr`
FROM `Ads` AS `A1`
GROUP BY `A1`.`ad_id`
ORDER BY `ctr` DESC, `ad_id` ASC;