const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const server = express()
// const classRouter = require('')
// const authRouter = require('')   

require('colors')

server.use(express.json())
server.use(helmet());
server.use(morgan("dev"));
server.use(cors());

const currentTime = new Date().toLocaleTimeString

// server.use('/api/classes', classRouter)
// server.use('/api/auth', authRouter)

server.get('/', (req, res)=>{
    res.send(`<h1>Server is working at ${currentTime}</h1>`)
})

module.exports = server

