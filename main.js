// Array of Todo Items
let todoArray = [
  {
    id: 1,
    name: "go to work",
    status: '',
    complete: false
  },
  {
    id: 2,
    name: "go to school",
    status: '',
    complete: false
  },
  {
    id: 3,
    name: "go to the dentist",
    status: '',
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
    console.log('task--->', inputString);


    const todo = {
    id: (todoArray.length + 1),
    name: inputString,
    status: '',
    complete: false,
  
    };
    updateArray()
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
  } else if (text == false) {
    promptError(text);
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
    event.currentTarget.parentElement.parentElement.remove(key)
    todoArray.filter(item => {
        if (item.id == key) {
            item.status = 'deleted'
        }
    })
    updateArray(key)
}

//removing tasks from either completed or incompleted list ( NOT THE SAME AS THE DELETE ICON FUNCTION)
function removeTodo(key) {
  event.currentTarget.parentElement.parentElement.parentElement.remove(key);
  
}




//function to toggle between complete and incomplete tasks

function toggleComplete(key) {

  const index = todoArray.findIndex((item) => item.id == Number(key));

  console.log('toggled ', todoArray[index].complete)
  if (todoArray[index].complete == false) {
    todoArray[index].complete = true;
    
  } else if (todoArray[index].complete == true) {
    todoArray[index].complete = false;
    createNewTask(key)
    removeTodo(key)

  }

    //finds the removed task from the todo Array from the key 
    findRemovedTask(key)
    console.log('todo array after toggle--->', todoArray)

}


//Creating Task to add to the HTML DOM
function createNewTask(todo) {
  const incompleteList = document.querySelector("#incomplete-ul");
  let completeList = document.querySelector("#complete-ul");
  const item = document.querySelector(`[data-key='${todo.id}']`);
  
  let listItem = document.createElement("li");
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
if (todo.complete == true) {
    completeList.append(item);
}else if (todo.complete == false){
    //adds newly created task to incomplete ToDo List Card
    incompleteList.append(listItem);
}
}


//Error Checking for empty string
let promptError = (inputToDoString) => {
    if (inputToDoString === "") {
        window.alert("A To-Do item cannot be blank. Please try again.");
    }
};

const findRemovedTask = (key) =>{

    todoArray.forEach(element => {
        //once the element with the matching key is found in the array, the element is sent to be rendered in the DOM with createNewTask Function where the complete value in the object will be evaluated. If the task is complete it will be rendered in the completed DOM card. if the task is incomplete it will be rendered in the incomplete DOM card
        if (element.id == key) {
            createNewTask(element)
        } 

        console.log('toggled element -->',element)
    })
};



// Remove all completed tasks
function deleteCompletedTasks(){
    let completedTasksUl = document.getElementById("complete-ul");
    completedTasksUl.innerHTML = '';
    updateArray()
}

//Edit tasks
function editTodo() {
    
    let randomInputID = String(Math.floor((Math.random() * 258)));
    event.currentTarget.parentElement.parentElement.innerHTML= `<input id=${randomInputID}></input><button onclick= updateToDo(${randomInputID}) class=\'btn btn-secondary btn-small\'>Update</button>`;
    
};

// this fires once the update button in the edit todo feature is clicked
const updateToDo = (randomInputID) => {

    let updatedTodoString = document.getElementById(`${randomInputID}`).value;

    formatNewJSON(updatedTodoString);
    removeEditInput()

}


//updating array to match what is rendered in the DOM
const updateArray = () =>{

    todoArray.map(item => {

        //if item is completed, it removed item from the todoArray array 
        if (item.complete){
            let indexOfTodo = todoArray.indexOf(item);
            todoArray.splice(indexOfTodo,1);
            ('array after complete items are removed',todoArray)
        
        //if item has been deleted with the delete icon, it checks if the item's status is deleted, if it returns true, the item is removed from the todoArray
        } else if (item.status == 'deleted'){
            let indexOfTodo = todoArray.indexOf(item);
            todoArray.splice(indexOfTodo, 1)
        } 
    });
}


