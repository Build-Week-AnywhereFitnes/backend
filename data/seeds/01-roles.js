exports.seed = function (knex) {

  const roles = [
    {
      role_name: 'admin',
    },
    {
      role_name: 'user',
    },
  ];

  return knex('roles')
    .insert(roles)
};
