// Array of Todo Items
let todoArray = [
  {
    id: 1,
    name: "go to work",
    complete: false,
    category: "Work",
  },
  {
    id: 2,
    name: "go to school",
    complete: false,
    category: "School",
  },
  {
    id: 3,
    name: "go to the dentist",
    complete: false,
    category: "Health",
  },
  {
      id: 4,
      name: "go to the gym",
      complete: false,
      category: "Health",
    },
];

//adds input area and array items from array above on page load to the addTask
window.addEventListener("load", () => {
  renderTopInputSectionInDOM();

  todoArray.map((task) => {
    formatExistingJSON(task);
  });
});

// Create new task div function
function renderTopInputSectionInDOM() {
  const topInputSectionDiv = document.querySelector(".add-items");
  const inputGroup = document.createElement('div');
  inputGroup.setAttribute('class', 'input-group-prepend form-control')

  // Create new task input
  const textInput = document.createElement("input");
  textInput.setAttribute("type", "text");
  textInput.setAttribute("class", "todo-list-input form-control");
  textInput.setAttribute("placeholder", "New Task");
  textInput.setAttribute("id", "new-task-input");

  // event listener for hitting 'Enter' instead of clicking button
  textInput.addEventListener("keyup", function (event) {
    if (event.code === "Enter") {
      submitInput(event);
    }
  });


  // New Task Add Button
  const addNewTaskButton = document.createElement("button");
  addNewTaskButton.setAttribute(
    "class",
    "add btn btn-primary font-weight-bold todo-list-add-btn"
  );
  addNewTaskButton.setAttribute("type", "submit");
  addNewTaskButton.setAttribute("id", "add-btn");
  addNewTaskButton.innerHTML = "Add";



  // Category Dropdown Button Creation
  const dropdownDiv = document.createElement('div');
  const dropdownButton = document.createElement('button');
  dropdownButton.setAttribute('class', 'btn btn-outline-secondary dropdown-toggle category-dropdown');
  dropdownButton.setAttribute('type', 'button');
  dropdownButton.setAttribute('data-bs-toggle', 'dropdown');
  dropdownButton.setAttribute('aria-expanded', 'false');
  dropdownButton.innerHTML = 'Select Category';


 
  // Dropdown UL creation
  const dropdownUL = document.createElement('ul');
  dropdownUL.setAttribute('class', 'dropdown-menu dropdown-menu-end');
  const categories = getAllCategories();

  // Display category options in dropdown
  addCategoriesToDropdown(categories, dropdownUL, dropdownButton);


    // event listener for adding task by clicking add button
    addNewTaskButton.addEventListener("click", (event) => {
      submitInput(event);
    });

  dropdownDiv.appendChild(dropdownButton);
  dropdownDiv.appendChild(dropdownUL);
  

  // Appending items to create new task div

  inputGroup.appendChild(textInput);
  inputGroup.appendChild(dropdownDiv)
  topInputSectionDiv.appendChild(inputGroup);
  topInputSectionDiv.appendChild(addNewTaskButton);
}

// Get each array category
function getAllCategories() {
  let categoriesArray = [];
  todoArray.forEach((todo) => {
    categoriesArray.push(todo.category);
  });
  return categoriesArray.filter((item, pos) => {
    return categoriesArray.indexOf(item) === pos;
  });
}

// Add category options to dropdown
function addCategoriesToDropdown(categories, dropdownUL, dropdownButton) {

    categories.forEach((category) => {
        const listItem = document.createElement('li');
        const listA = document.createElement('a');
        listA.setAttribute('class', 'dropdown-item dropdown-categories')
        listA.setAttribute('href', '#');
        listA.innerHTML = `${category}`;

        listItem.appendChild(listA)
        dropdownUL.appendChild(listItem)
        listA.addEventListener('click', () => {
          dropdownButton.innerHTML = `${category}`    
        })
    })


}

//adds a new task object to the array
function formatExistingJSON(task) {
  console.log("task--->", task);
  const todo = {
    id: task.id,
    name: task.name,
    category: task.category,
    complete: false,
  };

  //creating a new task to put into the HTML DOM
  createNewTask(todo);
}

//Formats newly input ToDo
const formatNewJSON = (inputString, category) => {
  console.log(
    "newly added task as a string before JSON format--->",
    inputString
  );

  const todo = {
    // use math.random & current array length to generate a new id number
    id: todoArray.length + Math.floor(Math.random() * 258),
    name: inputString,
    category,
    complete: false,
  };

  //pushes existing to dos to Array with checked values
  todoArray.push(todo);
  console.log("array after new todo is pushed to array -->", todoArray);

  //creating a new task to put into the HTML DOM
  createNewTask(todo);
};

//turns input into text to be used to create a todo task
function submitInput(event) {
  console.log('event---->', event);
  event.preventDefault();
  const input = document.querySelector(".todo-list-input");
  const text = input.value.trim();
  const findCategory = document.querySelector(".category-dropdown")
  const category = findCategory.innerHTML;
  let validCategory = category !== 'Select Category';
  console.log('is valid category?', validCategory);
  console.log('category text in submitInput----->', category);

  if (text !== "" && validCategory) {
    formatNewJSON(text, category);
    input.value = "";
    input.focus();
  } else {
    promptError();
  }


}

// Event listener from delete icon
function removeFromArray(key) {
  console.log("remove from array---");
  event.currentTarget.parentElement.parentElement.remove(key);
  todoArray.filter((item) => {
    if (item.id === key) {
      let indexOfTodo = todoArray.indexOf(item);
      console.log("index of todo---->", indexOfTodo);
      todoArray.splice(indexOfTodo, 1);
    }
  });
  console.log("todoArray--- .>", todoArray);
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
  findRemovedTask(key);
  console.log("todo array after toggle--->", todoArray);
}

//Creating Task to add to the HTML DOM
function createNewTask(todo) {
  console.log("---createNewTask----");

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
  } else if (todo.complete === false) {
    //adds newly created task to incomplete ToDo List Card
    incompleteList.append(listItem);
  }
}

//Error Checking for empty string
function promptError() {
  window.alert("A To-Do item cannot be blank and a category must be selected. Please try again.");
}

function findRemovedTask(key) {
  todoArray.forEach((element) => {
    //once the element with the matching key is found in the array, the element is sent to be rendered in the DOM with createNewTask Function where the complete value in the object will be evaluated. If the task is complete it will be rendered in the completed DOM card. if the task is incomplete it will be rendered in the incomplete DOM card
    if (element.id == key) {
      createNewTask(element);
    }

    console.log("checking complete value after toggle -->", element);
  });
}

// Remove all completed tasks
function deleteAllCompletedTasks() {
  console.log("delete all completed---");

  //targets the completedTasks Unordered List in the DOM & sets the HTML to nothing
  let completedTasksUl = document.getElementById("complete-ul");
  completedTasksUl.innerHTML = "";
  todoArray = todoArray.filter((item) => {
    if (item.complete === false) {
      return item;
    }
  });

  //Then goes to update the array now that the DOM incomplete & complete lists have been edited.
  console.log("updated array---->", todoArray);
}

//Edit tasks function that fires once the edit icon is clicked
function editTodo(id) {
  const item = todoArray.find((item) => item.id == Number(id));
  const name = JSON.stringify(item.name);
  const oldElement = event.currentTarget.parentElement.parentElement;
  oldElement.classList.add("mobile-sizing");
  const dataKey = oldElement.getAttribute("data-key");
  const inputField = event.currentTarget.parentElement.parentElement;

  //creating input field to edit todo and attaching an onclick event listener to the update button
  inputField.innerHTML = `<input value=${name} id=${id}></input><button onclick= updateToDo(${id},${dataKey}) class=\'mb-sm-btn btn btn-secondary btn-sm\ '>Update</button>`;
}

// this fires once the update button that appears in the edit todo feature is clicked
function updateToDo(id, dataKey) {
  console.log("in update todo function");

  //function to search for the old item by id.
  const oldTodo = (item) => item.id === dataKey;
  //the findIndex finds the index of the item matching the criteria in the oldTodo function
  const indexOfOldTodo = todoArray.findIndex(oldTodo);

  //gets value of the edited to do string
  let updatedTodoString = document.getElementById(`${id}`).value;

  //takes the value of the input string and formats it as a JSON object
  if (updatedTodoString) {
    formatNewJSON(updatedTodoString);
    todoArray.splice(indexOfOldTodo, 1);
    //removes the edit todo input field after the update button has been clicked
    removeEditInputField(id);
  } else {
    //error if input is empty
    promptError();
  }
  console.log("updated array after edited todo is edited -->", todoArray);
}

//remove the input field from the DOM
function removeEditInputField(inputID) {
  document.getElementById(inputID).parentElement.remove();
}


//makes a set from the category values in the todoArray. The Set object lets you store unique values of any type, whether primitive values or object references. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
const updateCategories = () => {
  let uniqueCategories = []
  todoArray.forEach(item => {
      uniqueCategories.push(item.category); 
  })
  uniqueCategories = [...new Set(uniqueCategories)]
  let updatedArray = Array.from(uniqueCategories)
  return updatedArray;
}

const renderCategories = () => {
  
  // calls function updateCategories --> which loops over todoArray and pulls out the category key:value and pushes the categories to an array it then converts to a set to get rid of duplicate Items and then back to an array and returns an array of category names from the todoArray with no duplicates. It's then stored in the categories array so we can access it in this function.
  let categories = updateCategories();
  
  console.log('categories after array is updated-->', categories)

  //Modal 
  let modalBody = document.getElementById('modal-body');

  //Dropdown Unordered List
  let dropDown = document.getElementById('defaultDropdown');

  //Clearing DOM of previous rendered Lists
  modalBody.innerHTML = '';

  let allCatString = 'All Categories'
  //Clearing DOM of previous rendered Lists but leaving All categories as a base case
  dropDown.innerHTML = `<option value=${allCatString}> <p> ${allCatString} </p> </option><hr>`;


  //Modal & Dropdown Categories Rendering
 categories.forEach(item => {

      //creating list item, edit & delete icons & attaching them to the modal
      let categoryListElement = document.createElement("li");
      categoryListElement.classList.add('modal-displayed-categories')
      let text = document.createTextNode(item);
      let buttonDiv = document.createElement('div');
      buttonDiv.classList.add('edit-icons-div')
      let paragraphElement = document.createElement('p');
      paragraphElement.classList.add('category-list-text-modal')
      paragraphElement.textContent = text.textContent;
      categoryListElement.appendChild(paragraphElement);
      categoryListElement.appendChild(buttonDiv);
      modalBody.appendChild(categoryListElement)
      //This is where the icon elements for edit and delete will need to be created and appended to the buttonDiv
      let editIcon = document.createElement('i');
      editIcon.classList.add('remove', 'mdi', 'mdi-close-circle-outline', 'fas', 'fa-edit', 'customeditbutton', 'modal-edit-icon')
      buttonDiv.appendChild(editIcon)

      let removeIcon = document.createElement('i');
      removeIcon.classList.add('remove', 'mdi', 'mdi-close-circle-outline', 'modal-remove-icon');
      buttonDiv.appendChild(removeIcon);

      //Updating Dropdown Menu UL
      let dropdownListElement = document.createElement("option");
      dropdownListElement.setAttribute('value', text.textContent )
      dropdownListElement.appendChild(text);
      dropDown.appendChild(dropdownListElement);

  });

}
function updateSelectValue(event) {
  console.log('Selected Dropdown Item -->',event.target.value);
}

//Dropdown Options Event Listener
let dropdownOptions = document.getElementById('defaultDropdown');
dropdownOptions.addEventListener('change', updateSelectValue)


//Edit Categories (Opens Modal) Button
let editCatBtn = document.getElementById('edit-categories-btn');
editCatBtn.addEventListener('click', renderCategories());

//Category Dropdown Button 
let catDropdown = document.getElementById('defaultDropdown');
catDropdown.addEventListener('click', renderCategories());