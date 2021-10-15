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
  return db('users').where({username}).first()
}

async function addUser(newUser) {
  console.log(`this will add ${newUser.username} when they have IDs`)
  return newUser.username

  // const [newId] = await db('users').insert(newUser, ["id"])
  // return getUserById(newId.id ?? newId)
}

module.exports = {
  getUsers,
  getUserById,
  getUserByUsername,
  addUser
}