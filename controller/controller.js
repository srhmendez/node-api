const { isValidObjectId } = require('mongoose');
let todosdb = require('../model/model');



exports.create = (req, res) => {

    //Error handling
    if (!req.body){
        res.status(400).send({message: "Request cannot be empty!!"})
        return
    }

    //Creating a New Todo
    let newTodo = todosdb({
        id: req.body.id,
        name: req.body.name,
        complete: req.body.complete,
        category: req.body.category

    });

    //save todo into DB
    newTodo
        .save(newTodo)
        .then(data => {
            res.send(data)
        })
        .catch(error => {
            res.status(500).send({
            message: error.message || 'An error has occurred while creating a create operation'
            })
        });
}


exports.find = (req, res) => {

    //find data in db
    todosdb.find()
    .then(todo => {
        res.send(todo)
    })
    .catch(error => {
        res.status(500).send({message: error.message || "Error occurred while retrieving user information"})
    });

}

exports.delete = (req, res) => {
    const id = req.params.id;

    todosdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message: `Cannot delete user with id: ${id}. User with that ID cannot be found`})
            } else {
                res.send({ message: "User was deleted successfully!"})
            }
        })
        .catch(error => {
            res.status(500).send({ message: `Error deleting todo with id: ${id}.`});
        });
}

exports.update = (req, res) => {

    //error handling for empty update request
    if (!req.body){
        return res
            .status(400)
            .send({message: "data to update cannot be empty!"});
    }

    //updating user
    const id = req.params.id;
    todosdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if(!data){
                res.status(404).send({ message: `Cannot update user with id: ${id}. User with that ID cannot be found`})
            } else {
                res.send(data);
            }
        })
        .catch(error => {
            res.status(500).send({ message: "Error updating user information."});
        });


}