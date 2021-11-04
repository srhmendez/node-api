const express = require ('express');
const { keys } = require('underscore');
const router = express.Router();
const _ = require('underscore');



let todos = [
    {
        "id": 1,
        "name": "Go to work",
        "complete": false,
        "category": "Work"
    },
    {
        "id": 2,
        "name": "Go to school",
        "complete": false,
        "category": "School"
    },
    {
        "id": 3,
        "name": "Go to the dentist",
        "complete": false,
        "category": "Health Care"
    },
    {
        "id": 4,
        "name": "Go to the gym",
        "complete": false,
        "category": "Health"
    }
]

//all routes are starting with /todos


//get all todos
router.get('/', (req, res) => {
    res.send(todos);
})
//get all todos from certain category
router.get('/:category', (req, res) => {
    const { category } = req.params;
    let matchedCats = todos.filter((todo)=> (todo.category === category));
    res.send(matchedCats);
})
//add a todo
router.post('/', (req, res) => {
    let newTodo = req.body
    todos.push(newTodo);
    res.send(todos)
})
//delete a todo
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    todos = todos.filter((todo) => todo.id != id);
    res.send(`user with the id: ${id} was deleted from Database`)  
})
//update a todo
router.put('/:id', (req, res) => {
    let updatedTodo = req.body;
    const { id } = req.params;
    let indexOfTodo = todos.reduce((prev,curr,acc) => {
        console.log(curr.id)
        if (curr == id) {
            return acc
        }
        return acc
    });
    
    //console.log(indexOfTodo)
    todos[indexOfTodo] = updatedTodo;
    res.send(todos)
})

// setting global array
let catArray = []
//assigning it with todos from object on load
getCategoriesFromTodos();

// removes duplicates from categories array
function removeDuplicatesFromCatArr(array) {
    let removeDuplicates = new Set(array);
    catArray = Array.from(removeDuplicates);
    return catArray
}
//gets categories from todos array
function getCategoriesFromTodos() {
    todos.map((todo)=> catArray.push(formatInput(todo.category)));
    removeDuplicatesFromCatArr(catArray);
    return catArray;
}
// updates the global array after edit, delete, post
function updateCatArray(editedArr) {
    catArray = editedArr;
    removeDuplicatesFromCatArr(catArray)
    return catArray;
}

//get all categories
router.get('/category/all', (req, res) => {
    removeDuplicatesFromCatArr(catArray);
    res.send(catArray);

})
//add a new category
router.post('/category/new/:name', (req, res) => {
    const { name } = req.params;
    catArray.push(formatInput(name));
    removeDuplicatesFromCatArr(catArray);
    res.send(catArray)

})
//update a category
router.put('/category/edit/:category', (req, res) => {
    let catObject = req.params;
    let newCatName = req.body.category;
    let name = catObject.category;
    let oldCatName = formatInput(name);
    newCatName = formatInput(newCatName);
    let index = catArray.indexOf(oldCatName);
    catArray.splice(index, 1, newCatName);
    updateCatArray(catArray);
    res.send(catArray)
   
})
// delete a category
router.delete('/category/delete/:category', (req, res) => {
    let toDeleteObj = req.params;
    let catName = toDeleteObj.category;
    catName = formatInput(catName);
    let index = catArray.indexOf(catName);
    console.log(index);
    if (index === -1){
        res.send('Item does not exist')
    } else {
        catArray.splice(index, 1);
        updateCatArray(catArray);
        res.send(catArray);
    }
})

function formatInput(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

module.exports = router;