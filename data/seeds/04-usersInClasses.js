
exports.seed = function(knex) {

  const usersInClasses = [
    {
      user_id: 1,
      class_id: 1,
    },
    {
      user_id: 3,
      class_id: 1,
    },
    {
      user_id: 4,
      class_id: 1,
    },
    {
      user_id: 2,
      class_id: 2,
    },
    {
      user_id: 3,
      class_id: 2,
    },
    {
      user_id: 5,
      class_id: 2,
    },
    {
      user_id: 7,
      class_id: 2,
    },
    {
      user_id: 2,
      class_id: 3,
    },
    {
      user_id: 4,
      class_id: 3,
    },
    {
      user_id: 6,
      class_id: 3,
    },
  ]
  
  return knex('usersInClasses')
    .insert(usersInClasses)
}
