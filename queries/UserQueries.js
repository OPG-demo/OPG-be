const dotenv = require('dotenv')
const fs = require('fs')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets')
const Restricted = require('../middleware/restricted')
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
  const {org_id, fullname, email, username, pwdhash, title, phone, isadmin, division, reports_to, description, last_login, forgot_pwdhash, forgot_pwdtimeout, created_date, superuser, orgs} = req.body

  pool.query('INSERT INTO users(org_id, fullname, email, username, pwdhash, title, phone, isadmin, division, reports_to, description, last_login, forgot_pwdhash, forgot_pwdtimeout, created_date, superuser, orgs) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)', [org_id, fullname, email, username, pwdhash, title, phone, isadmin, division, reports_to, description, last_login, forgot_pwdhash, forgot_pwdtimeout, created_date, superuser, orgs], (error, results) =>{
    if (error){
      throw error
    }
    res.status(200).json({message: `User ${fullname} created`})
  })
}

const updateUser = (req, res) =>{
  const id = parseInt(req.params.id)
  const {org_id, fullname, email, username, pwdhash, title, phone, isadmin, division, reports_to, description, last_login, forgot_pwdhash, forgot_pwdtimeout, created_date, superuser, orgs} = req.body

  pool.query('UPDATE users SET fullname = $1, email = $2, username = $3, pwdhash = $4, title = $5, phone = $6 WHERE id = $7', [fullname, email, username, pwdhash, title, phone, id], (error, results) =>{
    if(error){
      throw error
    }
    res.status(200).json({message: `User ${fullname} has been updated`})
  })
}

const deleteUser = (req, res) =>{
  const id = parseInt(req.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) =>{
    if(error){
      throw error
    }
    res.status(200).json({message: `User with id ${id} has been deleted`})
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}



