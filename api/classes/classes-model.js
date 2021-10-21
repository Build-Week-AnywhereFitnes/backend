const db = require('../../data/db-config');

function getAllClasses() {
  return db('classes');
}

function getClassByClassId(Class_Id) {
  return db('classes')
    .where('class_Id', Class_Id);
}

function countTakenSpots(Class_Id) {
  const takenSpots = db('usersInClasses')
    .count('class_id as count')
    .where('class_id', Class_Id)
  return takenSpots
}

function countMaxSpots(Class_Id) {
  const maxSpots = db('classes')
    .select('classMax')
    .where('class_id', Class_Id)
    .from('classes')
  return maxSpots
}

async function joinClass(User_Id, Class_Id) {
  const userToAdd = {
    user_id: User_Id,
    class_id: Class_Id
  }

  return await db('usersInClasses')
    .insert(userToAdd)
}

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
    countTakenSpots,
    countMaxSpots,
    joinClass,
    // searchClasses,
    addClass,
    updateClass,
    deleteClass
};
