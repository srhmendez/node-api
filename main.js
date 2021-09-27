// Array of Todo Items
let todoArray = [
  {
    id: 1,
    name: "go to work",
    complete: false
  },
  {
    id: 2,
    name: "go to school",
    complete: false
  },
  {
    id: 3,
    name: "go to the dentist",
    complete: false
  },
];

//adds array items from array above on page load to the addTask
window.addEventListener("load", () => {
   
  todoArray.map((task) => {
    formatExistingJSON(task);
  });

});


//adds a new task object to the array
function formatExistingJSON(task) {

  console.log('task--->', task);
  const todo = {
    id: task.id,
    name: task.name,
    status: '',
    complete: false,
    
  };

  //creating a new task to put into the HTML DOM
  createNewTask(todo);
}


//Formats newly input ToDo
const formatNewJSON = (inputString) =>{ 
    console.log('newly added task as a string before JSON format--->', inputString);


    const todo = {

    // use math.random & current array length to generate a new id number
    id: (todoArray.length + Math.floor(Math.random() * 258)),
    name: inputString,
    complete: false,
  
    };


    //pushes existing to dos to Array with checked values
    todoArray.push(todo);
    console.log('array after new todo is pushed to array -->', todoArray)

    //creating a new task to put into the HTML DOM
    createNewTask(todo);

}



//turns input into text to be used to create a todo task
function submitInput(event) { 
  event.preventDefault();
  const input = document.querySelector(".todo-list-input");
  const text = input.value.trim();
  if (text !== "") {
    formatNewJSON(text);
    input.value = "";
    input.focus();
  } else if (!text) {
    promptError();
  }
}

// event listener for hitting 'Enter' instead of clicking button
document
  .getElementById("new-task-input")
  .addEventListener("keyup", function (event) {
    if (event.code === "Enter") {
      submitInput(event);
    }
  });


//event listener for adding task by clicking add button
document
.querySelector("#add-btn")
.addEventListener("click", (event) => {
  submitInput(event);
});

// Event listener from delete icon
const removeFromArray = (key) =>{
    console.log('remove from array---');
    event.currentTarget.parentElement.parentElement.remove(key)
    todoArray.filter(item => {
        if (item.id === key) {
            let indexOfTodo = todoArray.indexOf(item);
            console.log('index of todo---->', indexOfTodo);
            todoArray.splice(indexOfTodo, 1);
        }
    })
    console.log('todoArray--- .>', todoArray);
}

//removing tasks from either completed or incompleted list ( NOT THE SAME AS THE DELETE ICON FUNCTION)
function removeTodoFromList(key) {
  event.currentTarget.parentElement.parentElement.parentElement.remove(key);
  
}




//function to toggle between complete and incomplete tasks

function toggleComplete(key) {

  const index = todoArray.find((item) => item.id == Number(key));

if (index.complete == false) {
    index.complete = true;
  } else if (index.complete == true) {
    index.complete = false;
    createNewTask(key);
    removeTodoFromList(key);
  }

    //finds the removed task from the todo Array from the key 
    findRemovedTask(key)
    console.log('todo array after toggle--->', todoArray)

}


//Creating Task to add to the HTML DOM
function createNewTask(todo) {

  const incompleteList = document.querySelector("#incomplete-ul");
  const completeList = document.querySelector("#complete-ul");
  const item = document.querySelector(`[data-key='${todo.id}']`);
  
  const listItem = document.createElement("li");
  listItem.setAttribute("data-key", todo.id);
  

  listItem.innerHTML = `
  <div class="form-check">
  <label class="form-check-label">
  <input id="${todo.id}" onClick="toggleComplete(${todo.id})" class="js-tick checkbox" type="checkbox"/>
  ${todo.name}
  <p class="input-helper" id="incomplete-list">
  </p>
  </label>
  </div>
  <div class="editicons">
  <i onclick="editTodo(${todo.id})" class=" remove mdi mdi-close-circle-outline fas fa-edit customeditbutton">
  </i>
  <i onclick="removeFromArray(${todo.id})" class="remove mdi mdi-close-circle-outline">
  </i>
  </div>
 
`;

// This checks if the newly created To Do is complete or not, if complete, it will append the item to the complete list and it will be toggled green. If it is false, and is not complete, it will add the item to the incomplete to do list.
if (todo.complete) {
    completeList.append(item);
}else if (todo.complete === false){
    //adds newly created task to incomplete ToDo List Card
    incompleteList.append(listItem);
}
}


//Error Checking for empty string
let promptError = () => {
        window.alert("A To-Do item cannot be blank. Please try again.");
    
};

const findRemovedTask = (key) =>{

    todoArray.forEach(element => {
        //once the element with the matching key is found in the array, the element is sent to be rendered in the DOM with createNewTask Function where the complete value in the object will be evaluated. If the task is complete it will be rendered in the completed DOM card. if the task is incomplete it will be rendered in the incomplete DOM card
        if (element.id == key) {
            createNewTask(element)
        } 

        console.log('checking complete value after toggle -->',element)
    })
};



// Remove all completed tasks
function deleteAllCompletedTasks(){
    console.log('delete all completed---');

    //targets the completedTasks Unordered List in the DOM & sets the HTML to nothing
    let completedTasksUl = document.getElementById("complete-ul");
    completedTasksUl.innerHTML = '';
    todoArray = todoArray.filter((item) => {
        if (item.complete === false) {
            return item
        }
      });

    //Then goes to update the array now that the DOM incomplete & complete lists have been edited.
    console.log('updated array---->', todoArray);
}

//Edit tasks function that fires once the edit icon is clicked
function editTodo(id) {
    const item = todoArray.find((item) => item.id == Number(id));
    const name = JSON.stringify(item.name);
    const oldElement = event.currentTarget.parentElement.parentElement;
    oldElement.classList.add('mobile-sizing');
    const dataKey = oldElement.getAttribute('data-key');
    const inputField = event.currentTarget.parentElement.parentElement

    //creating input field to edit todo and attaching an onclick event listener to the update button
    inputField.innerHTML= `<input value=${name} id=${id}></input><button onclick= updateToDo(${id},${dataKey}) class=\'mb-sm-btn btn btn-secondary btn-sm\ '>Update</button>`;    
};

// this fires once the update button that appears in the edit todo feature is clicked
const updateToDo = (id, dataKey) => {
    console.log('in update todo function')

    //function to search for the old item by id.
    const oldTodo = (item => item.id === dataKey);
    //the findIndex finds the index of the item matching the criteria in the oldTodo function
    const indexOfOldTodo = todoArray.findIndex(oldTodo);

    //gets value of the edited to do string
    let updatedTodoString = document.getElementById(`${id}`).value;

    //takes the value of the input string and formats it as a JSON object
    if (updatedTodoString){
        formatNewJSON(updatedTodoString);
        todoArray.splice(indexOfOldTodo,1)
        //removes the edit todo input field after the update button has been clicked
        removeEditInputField(id)

    } else {
        //error if input is empty
        promptError();

    }
    console.log('updated array after edited todo is edited -->', todoArray)

}

//remove the input field from the DOM
const removeEditInputField = (inputID) => {
    document.getElementById(inputID).parentElement.remove()
}


