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

    //pushes existing to dos to Array with checked values
    todoArray.push(todo);

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

//event listener for remove-items

function removeTodo(key) {
  event.currentTarget.parentElement.parentElement.parentElement.remove();
  
}

//function to toggle between complete and incomplete tasks

function toggleComplete(key) {
  const index = todoArray.findIndex((item) => item.id === Number(key));
  if (todoArray[index].complete == false) {
    todoArray[index].complete = true;
  } else if (todoArray[index].complete == true) {
    todoArray[index].complete = false;
    createNewTask(key)
    removeTodo(key)
  }

    //create a render lists function that searched for the to do item that contains the key referenced above.
    console.log('index-->', index)
    findRemovedTask(key)

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
  <i onclick="removeItem()" class="remove mdi mdi-close-circle-outline">
  </i>
`;

// This checks if the newly created To Do is complete or not, if complete, it will append the item to the complete list and it will be toggled green. If it is false, and is not complete, it will add the item to the incomplete to do list.
if (todo.complete == true) {
    completeList.append(item);
    console.log('todo array after item is checked off -->', todoArray)
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
        if (element.id == key) {
            console.log(element)
            createNewTask(element)
        } 
    })
};



