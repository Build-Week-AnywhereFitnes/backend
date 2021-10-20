const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../../config/secret')

module.exports = (req, res, next) => {
  const token = req.headers['x-access-token']

  if (!token) {
    return next({ status: 401, message: 'No token' })
  } else {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if(err) {
        next({
          status: 401,
          message: err.message
        })
      } else {
        req.decodedToken = decodedToken
      }
    })
  }

  next()
}