const express = require('express');
const Classes = require('./classes-model');
const router = express.Router();

// [GET] All Classes

router.get('/', (req, res, next)=>{
    Classes.getAllClasses()
    .then((allClasses) =>{
       res.status(200).json(allClasses); 
    })
    .catch((err)=>{
        res.status(500).json({message: err.message})
    })
});

// [GET] Class by Class_Id

router.get('/:Class_Id', (req, res, next)=>{

    const {Class_Id} = req.params;

    if(Class_Id){
        Classes.getClassByClassId(Class_Id)
        .then((classType)=>{
            res.status(200).json(classType[0]);
        })
        .catch((err)=>{
            res.status(500).json({message: err.message});
        })
    } else {
        res.status(406).json({message: 'You need the Class ID to continue.'})
    }
});

// [Post] Add New Class by Class_Id

router.post("/", (req, res, next)=>{

    const newClass = req.body;

    if(newClass.Class_Id && newClass.Name){
        if (typeof newClass.Class_Id === "number"){
            Classes.addClass(newClass)
            .then((newestClass)=>{
                res.status(200).json(newestClass[0]);
            })
            .catch((err)=>{
                res.status(500).json({message: err.message});
            })
        } else {
            res.status(406).json({message: "Class_Id must be a number"});
        }
    } else {
        res.status(406).json({message: "Class_Id and Name are required"});
    }
})

// [PUT] Update by Class_Id

router.put("/:Class_Id", (req, res, next)=>{

    const updatedClass = req.body;

    if(updatedClass.Name && updatedClass.Class_Id){
        Classes.updateClass(updatedClass)
            .then((update)=>{
                res.status(200).json(update[0]);
            })
            .catch((err)=>{
                res.status(500).json({message: err.message});
            })
    } else {
        res.status(406).json({message: "Class_Id and Name are required"});
    }
    
})

// [Del] Remove Class by Class_Id

router.delete("/:Class_Id", (req, res, next)=>{
    
    const { Class_Id } = req.params;

    Classes.deleteClass(Class_Id)
        .then((resolution)=>{
            res.status(200).json(resolution);
        })
        .catch((err)=>{
            res.status(500).json({message: err.message});
        })
})

module.exports = router;