
exports.seed = function(knex) {

  const classes = [
    {
      class_id: 1,
      className: 'Restorative Yoga',
      classType: 'Yoga', 
      startTime: '8am',
      duration: '1hr',
      intensityLevel: 'Low',
      location: 'Jefferson Park',
      registeredAttendees: 7,
      classMax: 10
    },
    {
      class_id: 2,
      className: 'Beach Body HIIT',
      classType: 'Insanity', 
      startTime: '6pm',
      duration: '1hr',
      intensityLevel: 'High',
      location: 'Beach',
      registeredAttendees: 5,
      classMax: 15
    },
    {
      class_id: 3,
      className: 'Bikram',
      classType: 'Yoga', 
      startTime: '10am',
      duration: '1hr',
      intensityLevel: 'Medium',
      location: 'Hot studio',
      registeredAttendees: 11,
      classMax: 20
    },
  ]

  return knex('classes')
    .insert(classes)
};
