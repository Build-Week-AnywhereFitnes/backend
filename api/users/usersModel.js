const db = require('../../data/db-config')

function getUsers() {
  return db('users')
    .select(
      'users.username',
      'users.password'
    )
  
}

function getUserById(user_id) {
  // database needs id numbers for users

  return db('users')
    .select('username', 'password')
    .where('user_id', user_id)
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

function getByRole(role){
return db('roles')  
.where({role})
.first()
}


module.exports = {
  getUsers,
  getUserById,
  getUserByUsername,
  addUser,
  getByRole
};