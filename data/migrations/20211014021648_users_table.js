
exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments('user_id')
        tbl.text('username', 64).unique().notNullable()
        tbl.text('password',128).notNullable()
        tbl.booleaan('IsInstructor')
        })
        };

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('users')
};
