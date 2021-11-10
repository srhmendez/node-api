const express = require ('express');
const router = express.Router();
const controller = require('../controller/controller')


//all routes are starting with /todos


//CRUD to database

//get all todos
router.get('/', controller.find)

//add a todo
router.post('/', controller.create)

//delete a todo
router.delete('/:id', controller.delete)

//update a todo
router.put('/:id', controller.update)



module.exports = router;