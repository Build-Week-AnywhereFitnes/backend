const db = require('../../data/db-config')

function getUserByUsername(username) {
  return db('users').where({username}).first()
}

module.exports = {
  getUserByUsername
}