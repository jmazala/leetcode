-- USING NOT IN - (29.32% speed)
SELECT `Customers`.`Name` AS `Customers`
FROM `Customers`
WHERE `Id` NOT IN (
  SELECT `CustomerId`
  FROM `Orders`
  );

-- #USE A JOIN - (10.55% speed)

-- # SELECT `Customers`.`Name` AS `Customers`
-- # FROM `Customers`
-- # LEFT JOIN `Orders`
-- # ON `Customers`.`Id` = `Orders`.`CustomerId`
-- # WHERE `Orders`.`Id` IS NULL;