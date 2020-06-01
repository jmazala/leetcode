DROP DATABASE `1142`;
CREATE DATABASE `1142`;
USE `1142`;

CREATE TABLE `Activity` (
  `user_id` INT,
  `session_id` INT,
  `activity_date` DATE,
  `activity_type` ENUM("open_session", "end_session", "scroll_down", "send_message")
);

INSERT INTO `Activity` VALUES
(1, 1, DATE("2019-07-20"), "open_session"),
(1, 1, DATE("2019-07-20"), "scroll_down"),
(1, 1, DATE("2019-07-20"), "end_session"),
(2, 4, DATE("2019-07-20"), "open_session"),
(2, 4, DATE("2019-07-21"), "send_message"),
(2, 4, DATE("2019-07-21"), "end_session"),
(3, 2, DATE("2019-07-21"), "open_session"),
(3, 2, DATE("2019-07-21"), "send_message"),
(3, 2, DATE("2019-07-21"), "end_session"),
(3, 5, DATE("2019-07-21"), "open_session"),
(3, 5, DATE("2019-07-21"), "scroll_down"),
(3, 5, DATE("2019-07-21"), "end_session"),
(4, 3, DATE("2019-06-25"), "open_session"),
(4, 3, DATE("2019-06-25"), "end_session");

SELECT IFNULL(
  ROUND(
    SUM(`TEMP`.`num_sessions`) / COUNT(DISTINCT `TEMP`.`user_id`),
    2),
  0) AS `average_sessions_per_user`
FROM
(
  SELECT `user_id`, COUNT(DISTINCT `session_id`) AS `num_sessions`
  FROM `Activity`
  WHERE
    `activity_date` > DATE_SUB("2019-07-27", INTERVAL 30 DAY)
  GROUP BY `user_id`
  HAVING `num_sessions` > 0
) AS `TEMP`;