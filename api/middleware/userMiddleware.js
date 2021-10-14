const Users = require('../users/usersModel')

function checkLoginRequestBody (req, res, next) {
  const user = req.body

  if (!user.username || !user.password) {
    const err = new Error()
    err.status = 400
    err.message = `Username and password required`
    next(err)
  } else {
    next()
  }
}

module.exports = {
  checkLoginRequestBody
}