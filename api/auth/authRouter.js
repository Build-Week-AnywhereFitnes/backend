const router = require('express').Router()
const Users = require('../users/usersModel')
const {
  checkRequestBody
} = require('../middleware/userMiddleware')
const bcrypt = require('bcryptjs')
const tokenBuilder = require('./token-builder.js')

const currentTime = new Date().toLocaleTimeString()

router.get('/', (req, res, next) => {
  res.status(200).json({
    status: 200,
    message: `Get /api/auth running at ${currentTime}`,
    author: `Github: @victoriatrac`
  })
})

router.post('/register', checkRequestBody, async (req, res, next) => {
  const user = req.body
  const hash = bcrypt.hashSync(user.password, 8)

  console.log(`Attempting to register with ${user.username}, ${user.password}`.yellow)

  try {
    const dbUser = await Users.getUserByUsername(user.username)
    if (!dbUser) {
      const [newUser] = await Users.addUser({ ...user, password: hash })
      res.status(201).json({
        message: `successfully added user ${user.username}`,
      })
    } else {
      res.status(401).json({
        status: 401,
        message: `The username ${dbUser.username} already exists`
      })
    }
  } catch (err) {
    err.message = `Server failed to add user ${user.username}`
    next(err)
  }
})

router.post('/login', checkRequestBody, async (req, res, next) => {
  // need to generate token
  const user = req.body

  console.log(`Attempting to login with: ${user.username}, ${user.password}`.yellow)

  try {
    const dbUser = await Users.getUserByUsername(user.username)
    if (dbUser && bcrypt.compareSync(user.password, dbUser.password) || user.password === dbUser.password) {
    // if (dbUser && user.password === dbUser.password) {
      const token = tokenBuilder(user)
      
      res.status(200).json({
        status: 200,
        token,
        message: `${dbUser.username} login successful at ${currentTime}`,
        author: `Github: @victoriatrac`,
        user: {
          id: dbUser.user_id,
          username: dbUser.username
        }
      })
    } else {
      const err = new Error()
      err.status = 401
      err.message = `Incorrect credentials`
      next(err)
    }
  } catch (err) {
    err.message = 'Server failed to log in the user'
    next(err)
  }
})

module.exports = router