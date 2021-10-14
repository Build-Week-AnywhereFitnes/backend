
exports.seed = function(knex) {
  return knex('classes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('classes').insert([
        {class_id: 1, className: 'Chest & Shoulders',
          classType:'BODYATTACK', startTime:'6pm',
          duration:'1hr', intensityLevel:'Average',
          location:'Outdoors',  registeredAttendees: 7,
          classMAX: 10,
        },



        {class_id: 2, className: 'Legs & Thighs',
        classType:'BODYBUILDER', startTime:'9pm',
        duration:'40min', intensityLevel:'High',
        location:'indoors',  registeredAttendees: 3,
        classMAX: 10,
      },



      {class_id: 3, className: 'Cardio & Aerobics',
      classType:'BODYBALANCE', startTime:'8am',
      duration:'1.5hr', intensityLevel:'Low',
      location:'Outdoors',  registeredAttendees: 13,
      classMAX: 15,
    },



      ]);
    });
};
