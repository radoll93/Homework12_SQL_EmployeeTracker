const mysql = require('mysql2');

require('dotenv').config();


const db = mysql.createConnection({
      host: 'localhost',
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: 'company_db'
    });

const updateEmployee = (role, employee) => {
    db.query(`UPDATE employee SET role_id = ? WHERE first_name = ?`, [role, employee])
} 



module.exports = updateEmployee;