SELECT E3.employee_id
FROM
  Employees E1, #reports to CEO
  Employees E2, #reports 1 level down
  Employees E3  #reports 2 levels down
WHERE
  (E1.manager_id = 1 OR E2.manager_id = 1 OR E3.manager_id = 1) AND
  (E2.manager_id = E1.employee_id) AND
  (E3.manager_id = E2.employee_id) AND
  E3.employee_id != 1;