const db = require('../../data/db-config');

function getAllClasses() {
  return db('classes')
}

function getClassByClassId(id) {
  return db('classes')
    .where('class_Id', id)
}

function getClassRoster(id) {
  return db('usersInClasses as uC')
    .join(
      'users as u',
      'uC.user_id', '=', 'u.user_id'
    )
    .join(
      'roles as r',
      'u.role', '=', 'r.role_id'
    )
    .select(
      'u.user_id',
      'u.username',
      'r.role_name as role'
    )
    .where('class_Id', id)
}

function getClassByClassType(type) {
  return db('classes')
    .where('classType', type)
}

function countTakenSpots(id) {
  return db('usersInClasses')
    .count('class_id as count')
    .where('class_id', id)
}

function countMaxSpots(id) {
  return db('classes')
    .select('classMax')
    .where('class_id', id)
    .from('classes')
}

async function joinClass(userID, classID) {
  const userToAdd = {
    user_id: userID,
    class_id: classID
  }

  return await db('usersInClasses')
    .insert(userToAdd)
}

async function cancelClass(userID, classID) {
  const classToCancel = {
    user_id: userID,
    class_id: classID
  }

  return await db('usersInClasses')
    .where(classToCancel)
    .del()
}

async function addClass(newClass) {
  const [class_id] = await db('classes')
    .insert(newClass)

  return getAllClasses()
    .where({class_id}).first()
};

async function updateClass(id, editedClass) {
  const class_id = await db('classes')
    .where('classes.class_id', id)
    .update(editedClass)

  return await getClassByClassId(id)
};

async function deleteClass(id) {

  const count = await db('classes')
    .where('classes.class_id', id)
    .del()

  return count

};

module.exports = {
    getAllClasses,
    getClassByClassId,
    getClassRoster, 
    getClassByClassType,
    countTakenSpots,
    countMaxSpots,
    joinClass,
    cancelClass,
    addClass,
    updateClass,
    deleteClass
};
