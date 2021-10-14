
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username:'TheTerminator', password:'bigboiArnold'},
        {username:'NinjaKiwi', password:'bloonsTd6'},
        {username:'lambda', password:'sch00L'}
      ]);
    });
};
