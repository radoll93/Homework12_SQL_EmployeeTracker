const mysql = require('mysql2');

require('dotenv').config();


const db = mysql.createConnection({
      host: 'localhost',
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: 'company_db'
    });


const addDep = (department) => {
    db.query(`INSERT INTO department (name)
              VALUES ( ? )`, department)
}

const addRole = (title, salary, department_id) => {
  db.query(`INSERT INTO role (title, salary, department_id)
            VALUES (?, ?, ?)`, [title, salary, department_id])
}

const addEmployees = (first_name, last_name, role_id, manager_id) => {
  db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES (?, ?, ?, ?)`, [first_name, last_name, role_id, manager_id])
}


module.exports = {addDep, addRole, addEmployees};