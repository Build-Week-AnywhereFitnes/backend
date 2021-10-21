const router = require('express').Router()
const Users = require('../users/usersModel')

const restricted = require('../middleware/auth-middleware')

const currentTime = new Date().toLocaleTimeString()

// Get list of all users
router.get('/', restricted, (req, res, next) => {
  Users.getUsers()
    .then((users) => {
      res.status(200).json({
        message: `All users fetched at ${currentTime}:`,
        users
      })
    })
    .catch((err) => {
      err.message = `Failed to get users`
      next(err)
    })
})

// Get users by ID
router.get('/:id', restricted, (req, res, next) => {
  // need middleware to checkID, restrict access
  const id = req.params.id

  Users.getUserById(id)
  .then(user => {
    res.status(200).json({
      status: 200,
      message: `Get /api/users/${id} running at ${currentTime}`,
      user
    })
  })
  .catch((err) => {
    err.message = `Could not find user by ID`
    next(err)
  })
})

// Edit user

// Delete user
router.delete('/', restricted, (req, res, next) => {
  console.log(req.body)
  const { username } = req.body

  // if user is not logged in ... else ...
  Users.deleteUser(username)
    .then((count) => {
      if (count === 1) {
        res.status(204).json({
          message: `Successfully deleted ${username}`
        })
      } else {
        const err = new Error()
        err.message = `Server not able to delete ${username}`
        next(err)
      }
    })
    .catch((err) => {
      err.message = `Server failed to delete user ${username}`
    })
})

module.exports = router