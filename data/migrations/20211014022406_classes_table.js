
exports.up = function(knex) {
  return knex.schema.createTable('classes',tbl =>{
      tbl.increments('class_id').primary().unique()
      tbl.string('className',64).notNullable()
    tbl.string('classType',64)
    tbl.string('startTime').notNullable()
    tbl.string('duration').notNullable()
    tbl.string('intensityLevel').notNullable()
    tbl.string('location').notNullable()
    tbl.integer('registeredAttendees')
    tbl.integer('classMAX')
  }).then();


};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('classes')
};
