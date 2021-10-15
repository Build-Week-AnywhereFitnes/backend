const router = require('express').Router()
const Users = require('../users/usersModel')
const {
  checkLoginRequestBody
} = require('../middleware/userMiddleware')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const currentTime = new Date().toLocaleTimeString()

router.get('/', (req, res, next) => {
  res.status(200).json({
    status: 200,
    message: `Get /api/users running at ${currentTime}`,
    author: `Github: @victoriatrac`
  })
})

router.get('/:id', (req, res, next) => {
  res.status(200).json({
    status: 200,
    message: `Get /api/users/:id running at ${currentTime}`,
    author: `Github: @victoriatrac`
  })
})

router.post('/login', checkLoginRequestBody, async (req, res, next) => {
  const user = req.body

  console.log(`Attempting to login with: ${user.username} ${user.password}`.yellow)

  try {
    const dbUser = await Users.getUserByUsername(user.username)
    // if (dbUser && bcrypt.compareSync(user.password, dbUser.password)) {
    if (dbUser && user.password === dbUser.password) {
      // const token = generateToken(dbUser.username)
      res.status(200).json({
        status: 200,
        // token,
        message: `${dbUser.username} login successful at ${currentTime}`,
        author: `Github: @victoriatrac`,
        user: {
          id: dbUser.id,
          username: dbUser.username,
          password: dbUser.password
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