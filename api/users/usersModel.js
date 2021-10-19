const db = require('../../data/db-config')

function getUsers() {
  return db
    .select(
      'users.username',
      'users.password'
    )
    .from('users')
}

function getUserById(id) {
  console.log(`id ${id} reached`)

  // database needs id numbers for users

  return db
    .select('users.username', 'users.password')
    .from('users')
    .where('users.id', id)
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