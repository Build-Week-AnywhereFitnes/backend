const db = require('../../data/db-config');

const router = require('express').Router()
const Classes = require('./classes-model')

const {isInstructor} = require('../middleware/classesMiddleware')
// getAllClasses()
router.get('/', (req, res, next) => {
  Classes.getAllClasses()
    .then((classes) => {
      res.status(200).json({
        message: `All classes fetched:`,
        classes
      })
    })
    .catch((err) => {
      err.message = `Failed to get classes`
      next(err)
    })
  })

// getClassByClassId(Class_Id)
router.get('/:id', (req, res, next) => {
  const { id } = req.params

  Classes.getClassByClassId(id)
    .then(([foundClass]) => {
      res.status(200).json(foundClass)
    })
    .catch((err) => {
      err.message = `Server failed to find item with id: ${id}`
      next(err)
    })
})

// addClass(Added_Class)
router.post('/', /*isInstructor() ,*/ async (req, res, next) => {
  // need to check that the user is logged in

  const aClass = req.body

  Classes.addClass(aClass)
    .then(savedClass => {
      res.status(201).json(`added ${savedClass.className}`)
    })
    .catch((err) => {
      err.message = `Server failed to add new class`
      next(err)
    })
})

// updateClass(Updated_Class)
router.put('/:id',/*isInstructor(),*/ (req, res, next) => {
  // need to check the user is logged in

  const classToUpdate = req.params.id
  const changedInfo = req.body
  console.log(classToUpdate)
  console.log(changedInfo)

  // if user is not logged in ... else ...
  Classes.updateClass(classToUpdate, changedInfo)
    .then(([updatedClass]) => {
      res.status(200).json(updatedClass)
    })
    .catch((err) => {
      err.message = `Server failed to edit item ${classToUpdate}`
      next(err)
    })
})

// deleteClass(Deleted_Class)
router.delete('/:id',/* isInstructor(),*/(req, res, next) => {
  const classToDelete = req.params.id

  console.log('router: delete class:', classToDelete)

  Classes.deleteClass(classToDelete)
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: `${classToDelete} is removed`
        })
      } else {
        res.status(404).json({ message:
        `record not found`})
      }
    })
    .catch(next)
})

module.exports = router
