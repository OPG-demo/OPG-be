const dotenv = require('dotenv')
const fs = require('fs')
dotenv.config()

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: {
    rejectUnauthorized: false,
    ca: fs.readFileSync('cacert.crt').toString()
  }
})

const getUsers = (req, res) =>{
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) =>{
    if (error){
      throw error
    }
    res.status(200).json(results.rows)
  })
}

const getUserById = (req, res) =>{
  const id = parseInt(req.params.id)
  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) =>{
    if (error){
      throw error
    }
    res.status(200).json(results.rows)
  })
}

module.exports = {
  getUsers,
  getUserById
}



