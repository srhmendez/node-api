

(function(window){

  //connecting variables to DOM elements
  const incompleteTodoList = document.querySelector("#incomplete-ul");
  const completedTodoList = document.querySelector("#complete-ul");
  const createTodoInput = document.querySelector(".new-todo-input");
  const newTodoButton = document.querySelector(".add-new-todo-btn");


  //Event listeners Submitting New Todo : new Todo button & the enter key for new Todo
  newTodoButton.addEventListener("click", () => submitNewTodo(createTodoInput));
  createTodoInput.addEventListener("keydown", (event) => { if (event.keyCode === 13) submitNewTodo(createTodoInput) });
  
  //Gets all Todos from the server on load
  function getTodos() {

    fetch("/todos/")
      .then((res) => res.json())
      .then(todoArr => {
        incompleteTodoList.innerHTML = '';
        todoArr.forEach( async element => { 
          await renderTodo(element);
          document.getElementById(`${element.id}`).addEventListener("click", toggleComplete, false);
        })
        let deletebtnList = document.querySelectorAll('.customdeletebutton');
        let editbtnList = document.querySelectorAll('.customeditbutton');
        toDoToggles = document.querySelectorAll('.js-tick');

        deletebtnList.forEach(icon => icon.addEventListener("click", deleteTodo, false));
        editbtnList.forEach(icon => icon.addEventListener("click", editTodo, false));
        toDoToggles.forEach(inputToggle => inputToggle.addEventListener("click", toggleComplete, false));
        
    })
  }
  getTodos();


  //render Todos in DOM todo parameter is an object
  async function renderTodo(todo){

    console.log(todo)

    const todoIsComplete = todo.complete
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
      <i class="remove mdi mdi-close-circle-outline fas fa-edit customeditbutton"></i>
      <i class="remove mdi mdi-close-circle-outline customdeletebutton"></i>
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
  
  
  function editTodo(event) {
    let id = Number(event.currentTarget.parentNode.parentNode.childNodes[1].childNodes[1].id);
    let oldTodo = event.currentTarget.parentNode.parentNode;
    let inputField = document.createElement('input');
    let button = document.createElement('button');
    let name;

    button.innerText = 'Update Todo';
    button.classList.add('update-btn');

    oldTodo.innerHTML = '';
    oldTodo.appendChild(inputField);
    oldTodo.appendChild(button);
    inputField.focus();
    inputField.select();
    

    //event listeners for update:  input & button 
    inputField.addEventListener("input", button.click());
    inputField.addEventListener("keyup", (event) => {if (event.code === 'Enter') {button.click()}})
    button.addEventListener("click", (event) => {

      name = event.currentTarget.parentNode.firstChild.value;
      console.log({name})

      fetch(`/todos/`+ id, {
        method: "PUT",
        headers: {'Content-Type': 'Content-type: application/json; charset=UTF-8'},
        body: JSON.stringify({ name }) ,
        
      })
        .then((res) => res.text())
        .then(() => getTodos())
        .catch((error) => console.error(`whoopdeee doo there's an error`, error))

    })
    

  }

  function deleteTodo(event) {
    let id = Number(event.currentTarget.parentNode.parentNode.childNodes[1].childNodes[1].id);
    
    fetch(`/todos/` + id, {
      method: 'DELETE', 
      headers: {'Content-Type': 'application/json; charset=UTF-8'},
      body: JSON.stringify({ id }),
    })
    .then((res) => res.text())
    .then(() => window.location.reload())
    .catch((error) => console.error(`whoopdeee doo there's an error`, error))

    console.log('deleting')
  }

  function toggleComplete(event){
    
    let id = Number(event.target.id)
    let name = event.currentTarget.parentNode.innerText
    let complete = event.target.checked;
    if (complete == true) {
      event.target.checked = false;
      removeElement(event.target)
    } else if (complete == false){
      event.target.checked = true;
      removeElement(event.target)
    }

    let category = "General";
  

    fetch('/todos/' + id, {
      method: 'PUT', 
      headers: {'Content-Type': 'application/json; charset=UTF-8'},
      body: JSON.stringify({ id, name, complete, category }),
    })
    .then((res) => res.text())
    .then(getTodos())
    
    
    
  }

  function removeElement(elementToRemove) {
    let parent = elementToRemove.parentNode.parentNode.parentNode;
    let child = elementToRemove.parentNode.parentNode;

    parent.removeChild(child);
  }

})(window);