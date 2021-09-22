// Array of Todo Items
let todoArray = [
  {
    id: 1,
    name: "go to work",
    status: '',
    complete: true
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

//adds array items on page load
window.addEventListener("load", () => {
   
  todoArray.map((task) => {
    addTask(task);
  });

});

//adds a new task object to the array
function addTask(task) {
  console.log('task--->', task);
  const todo = {
    id: task.id ? task.id : todoArray.length,
    complete: false,
    name: task.name || task,
  };
  console.log('todo----->', todo);
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
    addTask(text);
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

function removeItem() {
  event.currentTarget.parentElement.remove();
}

//function to toggle between complete and incomplete tasks

function toggleDone(key) {
  const index = todoArray.findIndex((item) => item.id === Number(key));
  todoArray[index].checked = !todoArray[index].checked;

    //create a render lists function that searched for the to do item that contains the key referenced above.

}


//Creating Task to add to the HTML DOM
function createNewTask(todo) {
  const incompleteList = document.querySelector("#incomplete-ul");
  const completeList = document.querySelector("#complete-ul");
  const item = document.querySelector(`[data-key='${todo.id}']`);
  console.log('item--', item)
  let listItem = document.createElement("li");
  listItem.setAttribute("data-key", todo.id);
  listItem.innerHTML = `
  <div class="form-check">
  <label class="form-check-label">
  <input id="${todo.id}" onClick="toggleDone(${todo.id})" class="js-tick checkbox" type="checkbox"/>
  ${todo.name}
  <p class="input-helper" id="incomplete-list">
  </p>
  </label>
  </div>
  <i onclick="removeItem()" class="remove mdi mdi-close-circle-outline">
  </i>
`;

//adds newly created task to incomplete ToDo List Card
incompleteList.append(listItem);
}


//Error Checking for empty string
let promptError = (inputToDoString) => {
  if (inputToDoString === "") {
    window.alert("A To-Do item cannot be blank. Please try again.");
  }
};



