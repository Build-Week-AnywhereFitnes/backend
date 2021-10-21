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
  return db('users')
    .where('users.user_id', id)
    .first()
}

function getRegistered(id) {
  return db('usersInClasses as u')
    .join('classes as c', 'u.class_id', '=', 'c.class_id')
    .select(
      'u.class_id',
      'c.className',
      'c.classType'
    )
    .where('user_id', id)
}

function getUserByUsername(username) {
  return db('users')
    .where({username})
    .first()
}

async function addUser(newUser) {
  return  await db('users')
    .insert(newUser)
}

async function deleteUser(username) {
  return await db('users')
    .where({username}).del()
}

module.exports = {
  getUsers,
  getUserById,
  getRegistered,
  getUserByUsername,
  addUser,
  deleteUser
}