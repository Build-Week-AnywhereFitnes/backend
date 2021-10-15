const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config/secret')

module.exports = function (username) {

  // return console.log(user, `token built`)

  const payload = {
     subject: user.user_id,
    username: username,
    // password: user.password
  }

  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, JWT_SECRET, options)
}