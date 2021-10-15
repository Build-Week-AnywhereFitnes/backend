const db = require('../../data/db-config');

function getAllClasses() {
    return db('Classes');
};

function getClassByClassId(Class_Id) {
    return db('Classes')
        .where('Class_Id', Class_Id);
};

async function addClass(Added_Class) {
    await db('Classes')
        .insert('Added_Class')

    return getClassByClassId(Added_Class.Class_Id);
};

async function updateClass(Updated_Class) {
    await db('Classes')
        .where('Class_Id', Updated_Class.Class_Id)
        .update(Updated_Class)

    return getClassByClassId(Updated_Class.Class_Id);
};

async function deleteClass(Deleted_Class) {
    await db('Classes')
        .where('Class_Id', Deleted_Class)
        .del()
    
    return getAllClasses();
};

module.exports = {
    getAllClasses,
    getClassByClassId,
    addClass,
    updateClass,
    deleteClass
};
