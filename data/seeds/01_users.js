
exports.seed = function(knex) {
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username:'TheTerminator', password:'bigboiArnold', IsInstructor: true},
        {username:'NinjaKiwi', password:'bloonsTd6', IsInstructor: false},
        {username:'lambda', password:'sch00L', IsInstructor: true}
      ]);
    });
};
