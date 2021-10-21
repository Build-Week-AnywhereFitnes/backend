const db = require('../../data/db-config');

const router = require('express').Router()
const Classes = require('./classes-model')

const restricted = require('../middleware/auth-middleware')
const adminCheck = require('../middleware/admin-middleware');
const { validateClass } = require('../middleware/classesMiddleware')

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

// getClassByType(type)
router.get('/search/:type', restricted, (req, res, next) => {
  const findByType = req.params.type
  
  Classes.getClassByClassType(findByType)
    .then((classes) => {
      if (classes.length == 0) {
        res.status(404).json({
          message: `Nothing matches your search criteria`
        })
      } else {
        res.status(200).json(classes)
      }
    })
    .catch((err) => {
      err.message = `Server failed to find item with type ${findByType}`
    })
})

// countTakenSpots(id), countMaxSpots(id)
router.get('/register/:id', restricted, async (req, res, next) => {
  const { id } = req.params
  const theClass = await Classes.getClassByClassId(id)

  try {
    const numSpots = await Classes.countTakenSpots(id)
    const maxSpots = await Classes.countMaxSpots(id)
    const openSpots = maxSpots[0].classMax - numSpots[0].count

    if (openSpots > 0) {
      res.status(200).json({
        message: `There are ${openSpots} out of ${maxSpots[0].classMax} available for ${theClass[0].className}`
      })
    } else {
      res.status(401).json({
        message: `There are no spots available for ${theClass[0].className}`
      })
    }
  } catch (err) {
    err.message = `Server failed to find the number of spots available for ${theClass[0].className}`
    next(err)
  }
})

// joinClass(User_Id, Class_Id)
router.post('/register/:id', restricted, async (req, res, next) => {
  const { decodedToken } = req
  const { id } = req.params

  const theUser = decodedToken.sub
  const theClass = await Classes.getClassByClassId(id)

  try {
    const numSpots = await Classes.countTakenSpots(id)
    const maxSpots = await Classes.countMaxSpots(id)
    const openSpots = maxSpots[0].classMax - numSpots[0].count

    if (openSpots > 0) {
      Classes.joinClass(theUser, theClass[0].class_id)

      res.status(200).json({
        confirmation: `You are signed up for ${theClass[0].className}!`,
        message: `There are ${openSpots} out of ${maxSpots[0].classMax} available for ${theClass[0].className}`
      })
    } else {
      res.status(401).json({
        message: `There are no spots available for ${theClass[0].className}`
      })
    }
  } catch (err) {
    err.message = `Server failed to find the number of spots available for ${theClass[0].className}`
    next(err)
  }
})

// cancelClass(id)
router.delete('/register/:id', restricted, async (req, res, next) => {
  const { decodedToken } = req
  const { id } = req.params
  
  try {
    const theUser = decodedToken.sub
    const theClass = id
  
    const existingClass = await Classes.getClassByClassId(id)
    
    if (!existingClass.className) {
      res.status(401).json({
        message: `The class with id ${id} does not exist`
      })
    } else {
      Classes.cancelClass(theUser, theClass)
      res.status(202).json({
        message: `${theClass} was successfully cancelled for ${theUser}`
      })
    }
  } catch (err) {
    err.message = `Server failed to cancel the class`
    next(err)
  }
})

// // searchClasses(key)
// router.get('/search', async (req, res, next) => {
//   res.message({'hi': 'hi'})
// })

// addClass(Added_Class)
router.post('/', restricted, adminCheck, async (req, res, next) => {
  const aClass = req.body

  Classes.addClass(aClass)
    .then(savedClass => {
      res.status(201).json({
        message: `added ${savedClass.className}`,
        savedClass
      })
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
      res.status(200).json({
        message: `${classToUpdate} edited`,
        updatedClass
      })
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
        res.status(202).json({
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
