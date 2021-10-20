const db = require('../../data/db-config');

const router = require('express').Router()
const Classes = require('./classes-model')

const restricted = require('../middleware/auth-middleware')
const adminCheck = require('../middleware/admin-middleware');
// const { default: knex } = require('knex');

// getAllClasses()
router.get('/', restricted, (req, res, next) => {
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
router.get('/:id', restricted, (req, res, next) => {
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

// countOpenSpots(Class_Id)
router.get('/register/:id', async (req, res, next) => {
  const { id } = req.params

  const maxSpots = db('classes')
    .select('classMax')
    .where('class_id', id)

    // console.log('max', maxSpots)

  Classes.countOpenSpots(id)
    .then((numberOfSpots) => {
      // console.log(numberOfSpots)
      // res.status(200).json(numberOfSpots[0].count)
      const freeSpots = numberOfSpots[0].count

      // Classes.getMaxSpots(id)
      //   .then((maxSpots) => {
      //     res.status(200).json(maxSpots)
      //     console.log(`maxspots`, maxSpots)
      //   })
      //   .catch((err) => {
      //     err.message = `failed to get max spots`
      //     next(err)
      //   })

        // console.log(maxSpots)

      res.status(200).json(freeSpots)
    })
    .catch((err) => {
      err.message = `Server failed`
      next(err)
    })
})

// addClass(Added_Class)
router.post('/', restricted, adminCheck, async (req, res, next) => {
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
router.put('/:id', restricted, adminCheck, (req, res, next) => {
  const classToUpdate = req.params.id
  const changedInfo = req.body
  console.log(classToUpdate)
  console.log(changedInfo)

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
router.delete('/:id', restricted, adminCheck, (req, res, next) => {
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
