INSERT INTO department (name)
VALUES ("Marketing"),
       ("Account"),
       ("Finance"),
       ("Legal"),
       ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 5),
       ("Salesperson", 80000, 5),
       ("Account Manager", 150000, 2),
       ("Accountant", 120000, 2),
       ("Marketing Manager", 120000, 1),
       ("Marketing Assistant", 60000, 1),
       ("Lawyer", 200000, 4),
       ("CFO", 300000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Aidan", "Tucker", 8, NULL),
       ("Conner", "Cox", 1, NULL),
       ("Rose", "Evans", 2, 1),
       ("Scott", "Ward", 3, NULL),
       ("Shane", "Patterson", 4, 3),
       ("Julie", "Rivera", 5, NULL),
       ("Joey", "Jenkins", 5, 5),
       ("Hanna", "Betler", 7, NULL);