// Array of Todo Items
let todoArray = [
  {
    id: 1,
    checked: false,
    name: "go to work",
    toggleBoolean: function() {
        console.log('inside boolean function-->', this.checked)
        if (this.checked == false){
            this.checked = true;
        } else if (this.checked == true){
            this.checked = false;
        }
    }
  },
  {
    id: 2,
    checked: false,
    name: "go to school",
    toggleBoolean: function() {
        console.log('inside boolean function-->', this.checked)
        if (this.checked == false){
            this.checked = true;
        } else if (this.checked == true){
            this.checked = false;
        }
    }
  },
  {
    id: 3,
    checked: false,
    name: "go to dentist",
    toggleBoolean: function() {
        console.log('inside boolean function-->', this.checked)
        if (this.checked == false){
            this.checked = true;
        } else if (this.checked == true){
            this.checked = false;
        }
    }
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



function toggleDone(key) {
    console.log('key--->', key);
    const index = todoArray.findIndex(item => item.id === Number(key));
    console.log('index------ toggledone', index);
    todoArray[index].checked = !todoArray[index].checked;
    createNewTask(todoArray[index]);
}
//event listener for toggling checkbox (completed to-do)

function toggleComplete(key) {

    //selects the to do 
    let toggledToDo = event.currentTarget.parentElement.parentElement.parentElement;



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
        '<p class="input-helper" id="incomplete-list">' +
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
document.querySelector("#incomplete-list").innerHTML = html;



const list = document.querySelector('#incomplete-list');
list.addEventListener('click', event => {
    console.log('clicked incomplete');
    console.log(event.target);
    if(event.target.classList.contains('js-tick')) {
        console.log('-------- tick', event.target);
                const itemKey = event.target.id;
        console.log('itemLey--->', itemKey);
        toggleDone(itemKey)
    }
})

const list2 = document.querySelector('#complete-list');
list2.addEventListener('click', event => {
    console.log('clicked complete');
    console.log(event.target);
    if(event.target.classList.contains('js-tick')) {
        console.log('-------- tick', event.target.parentElement);

        const itemKey = event.target.id;
        console.log('itemLey--->', itemKey);
        toggleDone(itemKey)
    }
})

function createNewTask(todo) {

    const completedList = document.querySelector('#complete-list');
  const incompleteList = document.querySelector("#incomplete-list");
    const item = document.querySelector(`[data-key='${todo.id}']`);

    const isChecked = todo.checked ? 'done' : '';
  let listItem = document.createElement("ul");
  
    listItem.setAttribute('class', `list-group-item ${isChecked}`);
    listItem.setAttribute('data-key', todo.id);
  listItem.innerHTML = `
  <li class="list-wrapper">
  <div class="form-check">
  <label class="form-check-label">

  <input id="${todo.id}"  class="js-tick checkbox" type="checkbox"/>
  ${todo.name}
  <p class="input-helper" id="incomplete-list">
  </p>
  </label>
  </div>
  <i onclick="removeItem()" class="remove mdi mdi-close-circle-outline">
  </i>
  </li>
`;


if (item) {
    // list.replaceChild(node, item)
    if(todo.checked) {
        console.log('todo is checked true');
        completedList.append(listItem);
        item.remove();
    }
    if(!todo.checked) {
        console.log('not checked');
        incompleteList.append(listItem);
        item.remove();
    }
} else {
    incompleteList.append(listItem)
}
}

let promptError = (inputToDoString) => {

    if (inputToDoString === ''){
        window.alert('A To-Do item cannot be blank. Please try again.');
    }
}
