// Array of Todo Items
let todoArray = [
  {
    id: 1,
    checked: false,
    name: "go to work",
  },
  {
    id: 2,
    checked: true,
    name: "go to school",
  },
  {
    id: 3,
    checked: false,
    name: "go to dentist",
  },
];

//adds a new task object to the array
function addTask(name) {
  console.log("add task");

  const todo = {
    id: Date.now(),
    checked: false,
    name,
  };
  todoArray.push(todo);
  createNewTask(todo);
}

//event listener for add-items div
const form = document.querySelector("#add-btn");
form.addEventListener("click", (event) => {
  event.preventDefault();

  const input = document.querySelector(".todo-list-input");
  const text = input.value.trim();
  console.log("text--->", text);
  if (text !== "") {
    addTask(text);
    input.value = "";
    input.focus();
  } else if (text == false) {
      promptError(text);
  }
});

//event listener for remove-items

function removeItem() {
    event.currentTarget.parentElement.remove();
};

//event listener for toggling checkbox (completed to-do)

function toggleComplete() {

    //selects the to do 
    let toggledToDo = event.currentTarget.parentElement;

    //possibly thinking of searching the object via key value's matching the inner text?? I don't know if there is a better way to do this
    // let toDoValue = toggledToDo.innerText;
    // console.log('todo value -->', toDoValue)


    //moving code to completed section
    let completedSection = document.getElementById('complete-ul');
    completedSection.appendChild(toggledToDo);
};


//html for the original todo tasks
let html =
  '<ul class="d-flex flex-column-reverse todo-list" id="incomplete-ul">' +
  todoArray
    .map(function (task) {
      return (
        "<li>" +
        '<div class="form-check">' +
        '<label class="form-check-label">' +
        '<input onclick="toggleComplete()" class="checkbox" type="checkbox">' +
        task.name +
        '<p class="input-helper" id="demo">' +
        "</p>" +
        "</label>" +
        "</div>" +
        '<i onclick="removeItem()" class="remove mdi mdi-close-circle-outline">' +
        "</i>"
      );
      ("<li>");
    })
    .join("") +
  "</ul>";
console.log(html);
document.querySelector("#demo").innerHTML = html;


function createNewTask(todo) {
  const incompleteList = document.querySelector(".list-wrapper");
  let listItem = document.createElement("ul");
  listItem.innerHTML = `<ul class="d-flex flex-column-reverse todo-list" id="incomplete-ul">
  <li class="list-wrapper">
  <div class="form-check">
  <label class="form-check-label">
  <input onclick="toggleComplete()" class="checkbox" type="checkbox"/>
  ${todo.name}
  <p class="input-helper" id="demo">
  </p>
  </label>
  </div>
  <i onclick="removeItem()" class="remove mdi mdi-close-circle-outline">
  </i>
  </li>
</ul>`;

  incompleteList.appendChild(listItem);
}

let promptError = (inputToDoString) => {

    if (inputToDoString === ''){
        window.alert('A To-Do item cannot be blank. Please try again.');
    }
}
