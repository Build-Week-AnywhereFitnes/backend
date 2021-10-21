// sets up users, classes, role, and usersInClasses tables

exports.up = function(knex) {
  return knex.schema
  
    .createTable('roles', tbl => {
      tbl.increments('role_id')
      tbl.string('role_name').notNullable().unique()
    })

    .createTable('users', tbl => {
      tbl.increments('user_id')
      tbl.string('username', 64)
        .notNullable()
        .unique()
      tbl.string('password', 128)
        .notNullable()
      tbl.integer('role')
        .unsigned()
        .references('roles.role_id')
        .defaultTo(2)
      tbl.integer('auth')
    })

    .createTable('classes', tbl => {
      tbl.increments('class_id').unique()
      tbl.string('className', 64).notNullable()
      tbl.string('classType', 64).notNullable()
      tbl.string('startTime').notNullable()
      tbl.string('duration').notNullable()
      tbl.string('intensityLevel').notNullable()
      tbl.string('location').notNullable()
      tbl.integer('classMax').notNullable()
    })

    .createTable('usersInClasses', tbl => {
      tbl.integer('user_id')
        .unsigned()
        .references('user_id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      tbl.integer('class_id')
        .unsigned()
        .references('class_id')
        .inTable('classes')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('usersInClasses')
    .dropTableIfExists('classes')
    .dropTableIfExists('users')
    .dropTableIfExists('roles')
};
