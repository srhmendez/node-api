(function(window){

  //connecting variables to DOM elements
  const incompleteTodoList = document.querySelector("#incomplete-ul");
  const completedTodoList = document.querySelector("#complete-ul");
  const createTodoInput = document.querySelector(".new-todo-input");
  const newTodoButton = document.querySelector(".add-new-todo-btn");

  //Event listeners Submitting New Todo : new Todo button & the enter key for new Todo
  newTodoButton.addEventListener("click", () => submitNewTodo(createTodoInput));
  createTodoInput.addEventListener("keydown", (event) => { if (event.keyCode === 13) submitNewTodo(event.value) });

  //Gets all Todos from the server on load
  fetch("/todos/")
    .then((res) => res.json())
    .then(todoArr => todoArr.forEach(element => renderTodo(element)))

  //render Todos in DOM
  function renderTodo(todo){

    console.log(todo);

    const todoIsComplete = todo.complete || false;
    const taskList = todoIsComplete ? completedTodoList : incompleteTodoList;
    const checked = todoIsComplete ? "checked" : "";


    let todoItemHTML = 
    `<div class="form-check">
      <label class="form-check-label">
        <input id="${todo.id}" class="js-tick" type="checkbox" ${checked}/>
        ${todo.name}
        <p class="input-helper" id="incomplete-list"></p>
      </label>

    <div class="editicons">
      <i onclick="editTodo(${todo})" class="remove mdi mdi-close-circle-outline fas fa-edit customeditbutton"></i>
      <i onclick="deleteTodo(${todo})" class="remove mdi mdi-close-circle-outline customdeletebutton"></i>
    </div>
    </div>
    `;
      
    //Add todo to DOM in either the complete or incomplete Task List Depending on variable value
    taskList.insertAdjacentHTML("beforeend", todoItemHTML)
    
  }


  //Event function that runs on newTodoButton & Enter Key Submit
  function submitNewTodo(newTodoInput) {
    const newTodo = newTodoInput;
    console.log(newTodo)

    //error checking for blank todo
    if(newTodo === ''){
      alert('Uh oh! Todo\'s cannot be blank. Please try again.')
    }

    //
    fetch('/todos/', {
      method: 'POST', 
      headers: {'Content-Type': 'application/json; charset=UTF-8'},
      body: JSON.stringify({ newTodo }),
    })
    .then((res) => res.json())
    .then((todoArr) => todoArr.forEach(element => renderTodo(element)))
    .catch( () => console.log("error adding to DB"))
  }

  function editTodo(id) {
    let todoID = id;
    console.log(todoID)
  }
  function deleteTodo(id) {
    let todoID = id;
    console.log(todoID)
  }


})(window);