
exports.up = function(knex) {
    return knex.shema

.createTable('users', tbl => {
        tbl.increments('user_id')
        tbl.text('username', 64).unique().notNullable()
        
        tbl.text('password',128).notNullable()
        })
        };

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('users')
};
