const db = require('../../data/db-config')
const { use } = require('../auth/authRouter')

function getUsers() {
  return db('users as u')
    .join(
      'roles as r', 
      'u.role', '=', 'r.role_id'
    )
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
    .join(
      'classes as c',
      'u.class_id', '=', 'c.class_id'
    )
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

async function deleteUser(id) {
  return await db('users')
    .where('user_id', id)
    .del()
}

// how to implement??
async function firstTimeCheck(username) {
  const lastLogin = await db('users')
    .select('last_login')
    .where('username', username)

  if (!lastLogin[0].lastLogin) {
    const hasLoggedIn = await db('users')
      .where('username', username)
      .update('last_login', 1)
    console.log(hasLoggedIn)
    return hasLoggedIn
  } else {
    return
  }
}

module.exports = {
  getUsers,
  getUserById,
  getRegistered,
  getUserByUsername,
  addUser,
  deleteUser,
  firstTimeCheck
}