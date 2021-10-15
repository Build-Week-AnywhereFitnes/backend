const router = require('express').Router()
const Users = require('../users/usersModel')

const currentTime = new Date().toLocaleTimeString()

// Get list of all users
router.get('/', (req, res, next) => {
  Users.getUsers()
    .then((users) => {
      res.status(200).json({
        message: `All users fetched:`,
        users
      })
    })
    .catch((err) => {
      err.message = `Failed to get users`
      next(err)
    })
})

// Get users by ID
router.get('/:id', (req, res, next) => {
  // Users need user.id in database
  // need middleware to checkID, restrict access
  const { id } = req.params    

  Users.getUserById(id)

  res.status(200).json({
    status: 200,
    message: `Get /api/users/:id running at ${currentTime}`,
    author: `Github: @victoriatrac`
  })
})

module.exports = router