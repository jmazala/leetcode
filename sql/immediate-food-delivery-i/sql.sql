-- # SINGLE LINER
SELECT ROUND(
  SUM(IF(`order_date` = `customer_pref_delivery_date`, 1, 0)) /
  COUNT(*) *
  100,
2) AS `immediate_percentage`
FROM `Delivery`;

-- # WITH SUBQUERIES
-- SELECT ROUND( 100 *
--   (SELECT COUNT(*) FROM `Delivery` WHERE `order_date` = `customer_pref_delivery_date`)
--   /
--   (SELECT COUNT(*) FROM `Delivery`),
--   2
-- ) AS `immediate_percentage`;