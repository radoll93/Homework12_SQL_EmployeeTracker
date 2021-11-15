const mysql = require('mysql2');

const db = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'aowlrghf58',
      database: 'company_db'
    },
    console.log('Connected to the company_db'));


const viewDep = () => {
    db.query(`SELECT * FROM department`, function (err, results) {
      console.log(results);
    })
}

module.exports = viewDep;
