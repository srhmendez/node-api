let tododb = require('../model/model');


exports.create = (req, res) => {
    let newTodo = req.body
    todos.push(newTodo);
    res.send(todos)
}

exports.find = (req, res) => {
    const { category } = req.params;
    let matchedCats = todos.filter((todo)=> (todo.category === category));
    res.send(matchedCats);
}

exports.delete = (req, res) => {
    const { id } = req.params;
    todos = todos.filter((todo) => todo.id != id);
    res.send(`user with the id: ${id} was deleted from Database`)  
}

exports.update = (req, res) => {

    updatedTodo = req.body;
    let idToSearchFor = updatedTodo.id
    let accumulator = 0;

    todos.forEach((todo) => {
        let id = todo.id;
        if (idToSearchFor === id){
            let index = todos.indexOf(todos[accumulator]);
            todos[index] = updatedTodo
        }
        accumulator++
    })

    res.send(todos)

}