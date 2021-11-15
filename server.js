const inquirer = require('inquirer');
const mysql = require('mysql2');

const add = require('./route/add');
const update = require('./route/update');
const view = require('./route/view');




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
        message : "enter the name of role",
        name : "roleName"
    },
    {
        type : "input",
        message : "enter the salary of role",
        name : "roleSalary"
    },
    {
        type : "input",
        message : "enter the department for the role",
        name : "roleDep"
    },
]

const addEmployeeQuestions = [
    {
        type : "input",
        message : "enter the employee’s first name",
        name : "firstname"
    },
    {
        type : "input",
        message : "enter the employee’s last name",
        name : "lastname"
    },
    {
        type : "input",
        message : "enter the employee’s role",
        name : "role"
    },
    {
        type : "input",
        message : "enter the employee’s manager",
        name : "manager"
    },
]

const {choices} = startQuestions[0];

inquirer
.prompt(startQuestions)
.then((choice) => {

    view();
    
})