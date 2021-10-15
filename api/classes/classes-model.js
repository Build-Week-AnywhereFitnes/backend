const db = require('../../data/db-config');

function getAllClasses() {
  return db('Classes');
};

function getClassByClassId(class_Id) {
  return db('classes')
    .where('class_Id', class_Id);
};

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
    addClass,
    updateClass,
    deleteClass
};
