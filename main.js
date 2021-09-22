// Array of Todo Items
let todoArray = [
  {
    id: 1,
    name: "go to work",
  },
  {
    id: 2,
    name: "go to school",
  },
  {
    id: 3,
    name: "go to dentist",
  },
];

//adds array items on page load
window.addEventListener("load", () => {
  todoArray.map((task) => {
    let name = task.name;
    return addEventListener("load", addTask(name, task));
  });
});

//adds a new task object to the array
function addTask(name, task) {
  console.log("add task");

  let id = task.id;
  const todo = {
    id: id ? id : Date.now(),
    checked: false,
    name,
  };
  todoArray.push(todo);
  createNewTask(todo);
}

//turns input into text to be used to create a todo task
function submitInput(event) {
  event.preventDefault();
  const input = document.querySelector(".todo-list-input");
  const text = input.value.trim();
  if (text !== "") {
    addTask(text, {});
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
  createNewTask(todoArray[index]);
}

function createNewTask(todo) {
  const incompleteList = document.querySelector("#incomplete-ul");
  const completeList = document.querySelector("#complete-ul");
  const item = document.querySelector(`[data-key='${todo.id}']`);
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

  if (item) {
    if (todo.checked) {
      console.log("todo is checked true");
      completeList.append(listItem);
      item.remove();
    }
    if (!todo.checked) {
      console.log("not checked");
      incompleteList.append(listItem);
      item.remove();
    }
  } else {
    incompleteList.append(listItem);
  }
}

let promptError = (inputToDoString) => {
  if (inputToDoString === "") {
    window.alert("A To-Do item cannot be blank. Please try again.");
  }
};
