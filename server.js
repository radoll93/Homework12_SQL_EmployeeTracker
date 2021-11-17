const inquirer = require('inquirer');
const mysql = require('mysql2');

const add = require('./route/add');
const update = require('./route/update');
const view = require('./route/view');


const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: 'company_db'
  },
  console.log('Connected to the company_db'));




const startQuestions = [
    {
        type : "list",
        message : "What would you like to do?",
        name : "choice",
        choices : ["View all departments", 
        "View all roles", 
        "View all employees", 
        "Add a department", 
        "Add a role", 
        "Add an employee", 
        "Update an employee role", 
        "Quit"]
    }
]

const addDepQuestion = [
    {
        type : "input",
        message : "enter the name of the department",
        name : "depName"
    }
]

const addRoleQuestions = [
    {
        type : "input",
        message : "Enter the name of role",
        name : "roleName"
    },
    {
        type : "input",
        message : "Enter the salary of role",
        name : "roleSalary"
    },
    {
        type : "list",
        message : "Select the department for the role",
        name : "roleDep",
        choices : []
    }
]


const addEmployeeQuestions = [
    {
        type : "input",
        message : "Enter the employee’s first name",
        name : "firstname"
    },
    {
        type : "input",
        message : "Enter the employee’s last name",
        name : "lastname"
    },
    {
        type : "list",
        message : "Select the employee’s role",
        name : "role",
        choices : []
    },
    {
        type : "list",
        message : "Select the employee’s manager",
        name : "manager",
        choices : ['None']
    },
]



const updateEmployeeQuestions = [
    {
        type : "list",
        message : "Which employee's role do you want to update?",
        name : "employee",
        choices : []
    },
    {
        type : "list",
        message : "Which role do you want to assign to the employee?",
        name : "role",
        choices : []
    },
]

const makeDepChoices = () => {
    db.query(`SELECT * FROM department order by id`, function (err, results) {
        results.forEach(dep => {
            addRoleQuestions[2].choices.push(dep.name);
        });
      })
      
}


const makeRoleChoices = () => {
    db.query(`SELECT id, title FROM role order by id`, function (err, results) {
        results.forEach(role => {
            addEmployeeQuestions[2].choices.push(role.title);
        });
      })
      
}

const makeManagerChoices = () => {
    db.query(`SELECT id, first_name FROM employee order by id`, function (err, results) {
        results.forEach(employee => {
            addEmployeeQuestions[3].choices.push(employee.first_name);
            updateEmployeeQuestions[0].choices.push(employee.first_name);
        });
      })
      
}


const updateEmployeeChoices = () => {
    db.query(`SELECT id, first_name FROM employee`, function (err, results) {
        results.forEach(employee => {
            updateEmployeeQuestions[0].choices.push(employee.first_name);
            // console.log(updateEmployeeQuestions[0].choices)
        });
      })
      
}

const updateRoleChoices = () => {
    db.query(`SELECT id, title FROM role`, function (err, results) {
        results.forEach(role => {
            updateEmployeeQuestions[1].choices.push(role.title);
            // console.log(updateEmployeeQuestions[1].choices)
        });
      })
      
}




const {choices} = startQuestions[0];

const startPrompt = () => {
    inquirer
    .prompt(startQuestions)
    .then((choiceObj) => {
        const {choice} = choiceObj;
        switch(choice) {
            case choices[0] : 
            view.viewDep();
            startPrompt();
            break;

            case choices[1] : 
            view.viewRole();
            startPrompt();
            break;

            case choices[2] : 
            view.viewEmployees();
            startPrompt();
            break;

            case choices[3] : 
            addDepPrompt();
            break;

            case choices[4] :
            makeDepChoices(); 
            addRolePrompt();
            break;

            case choices[5] :
            makeDepChoices(); 
            makeRoleChoices(); 
            makeManagerChoices();
            addEmployeePrompt();
            break;

            case choices[6] :
            updateEmployeeChoices();
            updateRoleChoices(); 
            updateEmployeePrompt();
            break;

            case choices[7] :
            break;
        } 
    })
}

const addDepPrompt = () => {
    inquirer.prompt(addDepQuestion)
            .then((departmentObj) => {
                add.addDep(departmentObj.depName);
            })
            .then(()=> startPrompt())
}

const addRolePrompt = () => {
    inquirer.prompt(addRoleQuestions)
            .then((roleObj) => {
                const { roleName, roleSalary, roleDep } = roleObj;

                db.query(`SELECT id FROM department WHERE name = ?`, roleDep, function(err, results) {
                    const roleIndex = results[0].id;
                    add.addRole(roleName, roleSalary, roleIndex);
                })
            })
            .then(()=> startPrompt())
}


const addEmployeePrompt = () => {
    inquirer.prompt(addEmployeeQuestions)
            .then((employeeObj) => {
                const { firstname, lastname, role, manager } = employeeObj;

                db.query(`SELECT role.id AS roleId FROM role WHERE title = ?`, role, function(err, results) {
                    const roleIndex = results[0].roleId

                db.query(`SELECT employee.id AS managerId FROM employee WHERE first_name = ?`, manager, function(err, results) {
                    const managerIndex = results[0].managerId
                    add.addEmployees(firstname, lastname, roleIndex, managerIndex)
                })
            })

            })
            .then(()=> startPrompt())
}


const updateEmployeePrompt = () => {
    inquirer.prompt(updateEmployeeQuestions)
            .then((updateObj) => {
                const { employee, role } = updateObj;

                db.query(`SELECT id FROM role WHERE title = ?`, role, function(err, results) {
                    const roleIndex = results[0].id;

                    update(roleIndex, employee);
                })
            })
            .then(()=> startPrompt())
}

startPrompt();