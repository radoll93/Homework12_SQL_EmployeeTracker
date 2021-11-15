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

const makeDepChoices = () => {
    db.query(`SELECT * FROM department`, function (err, results) {
        results.forEach(dep => {
            addRoleQuestions[2].choices.push(dep.name);
        });
      })
      
}




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
        choices : []
    },
]


const makeRoleChoices = () => {
    db.query(`SELECT id, title FROM role`, function (err, results) {
        results.forEach(role => {
            addEmployeeQuestions[2].choices.push(role.title);
        });
      })
      
}

const makeManagerChoices = () => {
    db.query(`SELECT id, first_name FROM employee`, function (err, results) {
        results.forEach(manager => {
            addEmployeeQuestions[3].choices.push(manager.first_name);
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
        } 
    })
}

const addDepPrompt = () => {
    inquirer.prompt(addDepQuestion)
            .then((departmentObj) => {
                add.addDep(departmentObj.depName);
                startPrompt();
            })
}

const addRolePrompt = () => {
    inquirer.prompt(addRoleQuestions)
            .then((roleObj) => {
                const { roleName, roleSalary, roleDep } = roleObj;
                const index = addRoleQuestions[2].choices.indexOf(roleDep) + 1;       
                add.addRole(roleName, roleSalary, index);
                startPrompt();
            })
}

const addEmployeePrompt = () => {
    inquirer.prompt(addEmployeeQuestions)
            .then((employeeObj) => {
                const { firstname, lastname, role, manager } = employeeObj;
                const roleIndex = addEmployeeQuestions[2].choices.indexOf(role) + 1;
                console.log(roleIndex)
                const managerindex = addEmployeeQuestions[3].choices.indexOf(manager) + 1;
                console.log(managerindex)
        
                add.addEmployees(firstname, lastname, roleIndex, managerindex);
                startPrompt();
            })
}

startPrompt();
