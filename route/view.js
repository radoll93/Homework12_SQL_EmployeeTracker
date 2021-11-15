const mysql = require('mysql2');
const table = require('console.table');

require('dotenv').config();


const db = mysql.createConnection({
      host: 'localhost',
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: 'company_db'
    },
    console.log('Connected to the company_db'));


const viewDep = () => {
    db.query(`SELECT * FROM department`, function (err, results) {
      console.table(results);
    })
}

const viewRole = () => {
  db.query(`SELECT * FROM role`, function (err, results) {
    console.table(results);
  })
}

const viewEmployees = () => {
  db.query(`SELECT * FROM employee`, function (err, results) {
    console.table(results);
  })
}


module.exports = {viewDep, viewRole, viewEmployees};
