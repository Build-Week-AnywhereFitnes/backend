const db = require('../../data/db-config')

function getUsers() {
  return db('users as u')
    .join('roles as r', 'u.role', '=', 'r.role_id')
    .select(
      'u.user_id',
      'u.username',
      'u.password',
      'r.role_name as role',
      'u.auth'
    )
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