
exports.seed = function(knex) {

  const users = [
    {
      user_id: 1,
      username: 'TheTerminator',
      password: 'bigboiArnold',
      role: 1,
      auth: 001
    },
    {
      user_id: 2,
      username: 'vicky',
      password: 'vickypassword',
      role: 1,
      auth: 001
    },
    {
      user_id: 3,
      username: 'julian',
      password: 'julianpassword',
      role: 1,
      auth: 001
    },
    {
      user_id: 4,
      username: 'timmy',
      password: 'timmypassword',
      role: 1,
      auth: 001
    },
    {
      user_id: 5,
      username: 'maby',
      password: 'mabypassword',
      role: 2
    },
    {
      user_id: 6,
      username: 'aaron',
      password: 'aaronpassword',
      role: 2
    },
    {
      user_id: 7,
      username: 'luis',
      password: 'luispassword',
      role: 2
    },
  ]

  return knex('users')
    .insert(users)
};
