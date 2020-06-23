const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')

const UserRouter = require('./users/users-router')
const OrgRouter = require('./orgs/org-router')
const DivisionRouter = require('./divisions/division-router')
const CorecompRouter = require('./corecomp/corecomp-router')
const IksfRouter = require('./iksf/iksf-router')
const ObjectiveRouter = require('./objective/objective-router')
const SwotRouter = require('./swot/swot-router')
const TacticRouter = require('./tactic/tactic-router')

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

server.use('/', UserRouter)
server.use('/org', OrgRouter)
server.use('/division', DivisionRouter)
server.use('/corecomp', CorecompRouter)
server.use('/iksf', IksfRouter)
server.use('/objective', ObjectiveRouter)
server.use('/swot', SwotRouter)
server.use('/tactic', TacticRouter)

server.get('/', (req, res) =>{
  res.status(200).json({message: "We're connected!"})
})

module.exports = server