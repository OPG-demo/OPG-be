const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')

const server = express()
dotenv.config();

const db = require('./queries')

server.use(bodyParser.json())
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
server.use(helmet())
server.use(express.json())
server.use(cors())

server.get('/', (req, res) =>{
  res.status(200).json({message: "We're connected!"})
})

server.get('/users', db.getUsers)
server.get('/users/:id', db.getUserById)
server.post('/users', db.createUser)

module.exports = server