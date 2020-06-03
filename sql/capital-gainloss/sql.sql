SELECT
  `stock_name`,
  SUM(IF(`operation` = 'SELL', `price`, -1 * `price`)) AS `capital_gain_loss`
FROM `Stocks`
GROUP BY `stock_name`;