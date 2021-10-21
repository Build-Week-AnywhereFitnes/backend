const router = require('express').Router()
const Users = require('../users/usersModel')

const restricted = require('../middleware/auth-middleware')

const currentTime = new Date().toLocaleTimeString()

// [GET] List of all users
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

// [GET] User by ID
router.get('/:id', restricted, (req, res, next) => {
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

// [GET] Classes registered by user
router.get('/:id/classes', restricted, (req, res, next) => {
  const { id } = req.params

  Users.getRegistered(id)
    .then((classes) => {
      if (classes.length == 0) {
        res.status(404).json({
          message: `The user has no registered classes.`
        })
      } else {
        res.status(200).json({
          message: `Retrieved user ${id} classes`,
          classes
        })
      }
    })
    .catch((err) => {
      err.message = `Server failed to retrieve classes registered by user: ${id}`
      next(err)
    })
})

// [DELETE] User by username
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
        err.message = `User ${username} does not exist`
        next(err)
      }
    })
    .catch((err) => {
      err.message = `Server failed to delete user ${username}`
    })
})

module.exports = router