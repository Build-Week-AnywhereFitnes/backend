const db = require('../../data/db-config')

function getUsers() {
  return db('users')

}

function getUserById(user_id) {
  console.log(`id ${user_id} reached`)

  
  return db('users')
    .select('users.username')
    .where('users.user_id', user_id).first()
}

function getUserByUsername(username) {
  return db('users')
    .where({username})
    .first()
}

async function addUser(newUser) {
  const [addedUser] = await db('users')
    .insert(newUser)

  return newUser.username
}

module.exports = {
  getUsers,
  getUserById,
  getUserByUsername,
  addUser
}