
exports.up = function(knex) {
  //user table
    return knex.schema.createTable('users', tbl => {
        tbl.increments('user_id')
        tbl.text('username', 64).unique().notNullable()
        tbl.text('password',128).notNullable()
        tbl.string('IsInstructor')
        })
  


      };

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('roles')
  .dropTableIfExists('classes')
  .dropTableIfExists('users')
};
