const db = require('../../data/db-config')

function getUsers() {
  return db('users')
    .select(
      'users.user_id', 'users.username', 'users.password'
    )
    .from('users')
}

function getUserById(id) {

  console.log(`getUserById sdsd`, id)

  return db('users')
    .where('users.user_id', id)
    .first()
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

async function deleteUser(username) {
  const count = await db('users')
    .where({username}).del()
  return count
}

module.exports = {
  getUsers,
  getUserById,
  getUserByUsername,
  addUser,
  deleteUser
}