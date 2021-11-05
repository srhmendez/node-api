

(function(window){

  //connecting variables to DOM elements
  const incompleteTodoList = document.querySelector("#incomplete-ul");
  const completedTodoList = document.querySelector("#complete-ul");
  const createTodoInput = document.querySelector(".new-todo-input");
  const newTodoButton = document.querySelector(".add-new-todo-btn");
  const toDoToggles = document.querySelector('input')

  

  //Event listeners Submitting New Todo : new Todo button & the enter key for new Todo
  newTodoButton.addEventListener("click", () => submitNewTodo(createTodoInput));
  createTodoInput.addEventListener("keydown", (event) => { if (event.keyCode === 13) submitNewTodo(createTodoInput) });
  

  //Gets all Todos from the server on load
  function getTodos() {
    incompleteTodoList.innerHTML = '';
    completedTodoList.innerHTML = '';
     fetch("/todos/")
      .then((res) => res.json())
      .then(todoArr => {
        todoArr.forEach( async element => {
          const createElement = await renderTodo(element)
          document.getElementById(`${element.id}`).addEventListener("click", toggleComplete, false)
        })
        
      });
  }
  getTodos();

  //render Todos in DOM todo parameter is an object
  async function renderTodo(todo){

    const todoIsComplete = todo.complete || false;
    const taskList = todoIsComplete ? completedTodoList : incompleteTodoList;
    const checked = todoIsComplete ? "checked" : "";

    let todoItemHTML = 
    `<div class="form-check">
      <label class="form-check-label">
        <input id="${todo.id}" class="js-tick" type="checkbox" ${checked}/>
        ${todo.name}
        </input>
        <p class="input-helper" id="incomplete-list"></p>
      </label>

    <div class="editicons">
      <i type="edit" class="remove mdi mdi-close-circle-outline fas fa-edit customeditbutton"></i>
      <i type="delete" delete${todo.id}" class="remove mdi mdi-close-circle-outline customdeletebutton"></i>
    </div>
    </div>
    `;
      
    //Add todo to DOM in either the complete or incomplete Task List Depending on variable value
    taskList.insertAdjacentHTML("afterbegin", todoItemHTML)
    

  }


  //Event function that runs on newTodoButton & Enter Key Submit
  function submitNewTodo(newTodoInput) {
    
    const newTodo = newTodoInput.value;
    console.log(newTodo)

    const id = Math.floor(Math.random() * 800);

    const newTodoObject = {
      "id": id,
      "name": newTodo,
      "complete": false,
      "category": "General"
    };

    //error checking for blank todo
    if(newTodo === ''){
      alert('Uh oh! Todo\'s cannot be blank. Please try again.')
    } else if (newTodo) {
      //only runs if todo is not blank string
      fetch('/todos/', {
        method: 'POST', 
        headers: {'Content-Type': 'application/json; charset=UTF-8'},
        body: JSON.stringify({ newTodo }),
      })
      .then((res) => res.json())
      .then(() => renderTodo(newTodoObject))
      .catch( () => console.log("error adding to DB"))
    }

  }

  function editTodo() {
    console.log('edit')
  }
  function deleteTodo() {
    console.log('delete')
  }

  function toggleComplete(event){
    console.log()
    let id = Number(event.target.id)
    let name = event.currentTarget.parentNode.innerText
    let complete = event.target.checked;

    fetch('/todos/', {
      method: 'PUT', 
      headers: {'Content-Type': 'application/json; charset=UTF-8'},
      body: JSON.stringify({ id, name, complete }),
    })
    .then(res => res.json())
    .then(getTodos())
  }

})(window);