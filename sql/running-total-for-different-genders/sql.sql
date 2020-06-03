SELECT
  `gender`
  , `day`
  , SUM(`score_points`) OVER(PARTITION BY `gender` ORDER BY `gender`, `day` ROWS UNBOUNDED PRECEDING) AS `total`
FROM `Scores`;