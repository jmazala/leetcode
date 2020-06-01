# Write your MySQL query statement below
SELECT `C`.`country_name`,
  CASE
    WHEN AVG(`W`.`weather_state`) <= 15 THEN "Cold"
    WHEN AVG(`W`.`weather_state`) >= 25 THEN "Hot"
    ELSE "Warm"
  END AS `weather_type`
FROM `Countries` AS `C` INNER JOIN `Weather` AS `W` ON (`C`.`country_id` = `W`.`country_id`)
WHERE YEAR(`W`.`day`) = 2019 AND MONTH(`W`.`day`) = 11
GROUP BY `W`.`country_id`;