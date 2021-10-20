const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config/secret')

module.exports = function (user) {

  console.log(user.username, `token built`)

  const payload = {
    // sub: user.user_id,
    username: user.username,
    password: user.password
  }

  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, JWT_SECRET, options)
}