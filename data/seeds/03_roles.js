exports.seed = function(knex) {
    return knex('roles').truncate()
      .then(function () {
        // Inserts seed entries
        return knex('roles').insert([
    {role:'Instructor'},  
    {role:'Client'}
        ]);
      });
  };