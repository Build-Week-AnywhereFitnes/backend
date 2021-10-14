const express = require('express')
const cors = require('cors')
const server = express()
// const classRouter = require('')
// const authRouter = require('')   

server.use(express.json())  
server.use(cors())  

// server.use('/api/classes', classRouter)
// server.use('/api/auth', authRouter)

server.get('/', (req, res)=>{
    res.send(`<h1>Server is working </h1>`)
})

module.exports = server

