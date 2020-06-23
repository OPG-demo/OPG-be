const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')

const UserRouter = require('./users/users-router')

const server = express()
dotenv.config();


server.use(bodyParser.json())
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
server.use(helmet())
server.use(express.json())
server.use(cors())

server.use('/users', UserRouter)

server.get('/', (req, res) =>{
  res.status(200).json({message: "We're connected!"})
})

module.exports = server