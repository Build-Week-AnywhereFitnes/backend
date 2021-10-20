
const Classes = require('../classes/classes-model')
// getByRole for isInstructor
const User = require('../users/usersModel')

const checkClassId = (req,res,next)=>{
    const {class_id} = req.params;
    Classes.getClassByClassId(class_id)
    .then(classes => classes ? next(): res.status(404)
    .json({messsage: `class with id: ${class_id} not found`}))
    .catch(err => console.log(err))
}


const validateClass = (req,res,next)=>{
    const {class_name, class_type}  = req.body
    if(!class_name || class_name ==='' || typeof class_name !== 'string'){
     res.status(400).json({message:'Invalid Class Name'})   
    } else if( !class_type || class_type === '' || typeof class_type !=='string'){
        res.status(400).json({message:'Invalid Class Type'})
    } else{
        next()
}}
// need db access function getByRole in user model
const isInstructor = (req,res,next)=> {
    //error on the line below, how to get role into params/body/header
        //const {role} = req.params;
    User.getByRole(role)
    if(user_role === 'client' || user_role ===''){
        res.status(401).json({message:'Unauthorized request'})
} else{
    next()}
}

module.exports = {
    checkClassId,
    validateClass, 
    isInstructor
}