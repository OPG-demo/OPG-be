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

const createUser = (req, res) =>{
  r = []
  r.push(req.body.org_id, req.body.fullname, req.body.email, req.body.username, req.body.pwdhash, req.body.title, req.body.phone, req.body.isadmin, req.body.division, req.body.reports_to, req.body.description, req.body.last_login, req.body.forgot_pwdhash, req.body.forgot_pwdtimeout, req.body.created_date, req.body.superuser, req.body.orgs)
  // const {org_id, fullname, email, username, pwdhash, title, phone, isadmin, division, reports_to, description, last_login, forgot_pwdhash, forgot_pwdtimeout, created_date, superuser, orgs} = req.body

  pool.query('INSERT INTO users(org_id, fullname, email, username, pwdhash, title, phone, isadmin, division, reports_to, description, last_login, forgot_pwdhash, forgot_pwdtimeout, created_date, superuser, orgs) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)', r, (error, results) =>{
    if (error){
      res.json(error)
    }
    res.json('User added successfully', results)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser
}



