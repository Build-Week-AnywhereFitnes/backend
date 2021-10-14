
exports.up = function(knex) {
  return knex.schema.createTable('classes',tbl =>{
      tbl.increments('class_id').primary().unique()
      tbl.text('className',64).notNullable()
    tbl.text('classType',64)
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
