const db = require('../../data/db-config');

function getAllClasses() {
  return db('classes');
};

function getClassByClassId(Class_Id) {
  return db('classes')
    .where('class_Id', Class_Id);
};

function countOpenSpots(Class_Id) {
  // return db('usersInClasses')
  //   .count('class_id as count')
  //   .where('class_id', Class_Id)

  // maybe use knex.raw() to do math??

  return db('usersInClasses')
  .count('class_id as count')
  .where('class_id', Class_Id)
  .catch((err) => {
    res.json({
      message: `failed retrieving taken spots`
    })
    next(err)
  })
}

// function searchClasses(key) {
//   // console.log('searched', key)
//   return getAllClasses()
//     // .where({key})
// };

async function addClass(Added_Class) {
  const [class_id] = await db('classes')
    .insert(Added_Class)

  return getAllClasses()
    .where({class_id}).first()
};

async function updateClass(id, Updated_Class) {
  const class_id = await db('classes')
    .where('classes.class_id', id)
    .update(Updated_Class)

  return await getClassByClassId(id)
};

async function deleteClass(Deleted_Class) {

  const count = await db('classes')
    .where('classes.class_id', Deleted_Class)
    .del()

  return count

};

module.exports = {
    getAllClasses,
    getClassByClassId,
    countOpenSpots,
    searchClasses,
    addClass,
    updateClass,
    deleteClass
};
