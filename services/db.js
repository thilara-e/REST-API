const mysql = require('mysql2');


const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 2
});

async function query(sql, params) {
  const [results, ] = await pool.execute(sql, params);

  return results;
}

module.exports = {
  query
}