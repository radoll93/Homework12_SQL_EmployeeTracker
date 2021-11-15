SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, salary,
CONCAT(managers.first_name, ' ', managers.last_name) AS manager
FROM employee
JOIN role
ON employee.role_id = role.id
JOIN department
ON role.department_id = department.id
LEFT OUTER JOIN employee AS managers
ON employee.manager_id = managers.id
;


