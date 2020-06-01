DROP DATABASE `1280`;
CREATE DATABASE `1280`;
USE `1280`;

CREATE TABLE `Students` (
  `student_id` INT AUTO_INCREMENT PRIMARY KEY,
  `student_name` VARCHAR(255)
);

CREATE TABLE `Subjects` (
  `subject_name` VARCHAR(255)
);

CREATE TABLE `Examinations` (
  `student_id` INT,
  `subject_name` VARCHAR(255)
);

INSERT INTO `Students` VALUES
(1, "Alice"),
(2, "Bob"),
(13, "John"),
(6, "Alex");

INSERT INTO `Subjects` VALUES ("Math"), ("Physics"), ("Programming");

INSERT INTO `Examinations` VALUES
(1, "Math"),
(1, "Physics"),
(1, "Programming"),
(2, "Programming"),
(1, "Physics"),
(1, "Math"),
(13, "Math"),
(13,"Programming"),
(13, "Physics"),
(2, "Math"),
(1, "Math");

SELECT
  `S`.`student_id`,
  `S`.`student_name`,
  `SU`.`subject_name`,
  COUNT(`E`.`student_id`) AS `attended_exams`
FROM
  `Students` AS `S`
  CROSS JOIN
  `Subjects` AS `SU`
  LEFT OUTER JOIN
  `Examinations` AS `E`
  ON
    `S`.`student_id` = `E`.`student_id` AND
    `SU`.`subject_name` = `E`.`subject_name`
GROUP BY `S`.`student_id`, `SU`.`subject_name`
ORDER BY `S`.`student_id`, `SU`.`subject_name`;