
exports.up = function(knex) {
  return knex.schema
  .createTable('roles', tbl =>{
      tbl.increments()
      tbl.string('role').unique().notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('roles')
};
