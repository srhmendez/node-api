

(function(window){

  //connecting variables to DOM elements
  const incompleteTodoList = document.querySelector("#incomplete-ul");
  const completedTodoList = document.querySelector("#complete-ul");
  const createTodoInput = document.querySelector(".new-todo-input");
  const newTodoButton = document.querySelector(".add-new-todo-btn");
  const deleteAllButton = document.getElementById('delete-all-btn');
  

  //Event listeners Submitting New Todo : new Todo button & the enter key for new Todo
  newTodoButton.addEventListener("click", () => submitNewTodo(createTodoInput));
  createTodoInput.addEventListener("keydown", (event) => { if (event.keyCode === 13) submitNewTodo(createTodoInput) });
  deleteAllButton.addEventListener("click", (event) => deleteAllCompletedTasks(event));

  //Gets all Todos from the server on load
  function getTodos() {


    fetch("/todos/")
      .then((res) => res.json())
      .then(todoArr => {
        todoArr.forEach( async element => { 
          console.log(element)
          await renderTodo(element);
          let id = element._id;
          document.getElementById(`${id}`).addEventListener("click", toggleComplete, false);
        })
        let deletebtnList = document.querySelectorAll('.customdeletebutton');
        let editbtnList = document.querySelectorAll('.customeditbutton');
        toDoToggles = document.querySelectorAll('.js-tick');

        deletebtnList.forEach(icon => icon.addEventListener("click", deleteTodo, false));
        editbtnList.forEach(icon => icon.addEventListener("click", editTodo, false));
        toDoToggles.forEach(inputToggle => inputToggle.addEventListener("onChange", toggleComplete, false));
    })
  }
  getTodos();


  //render Todos in DOM todo parameter is an object
  async function renderTodo(todo){

    const todoIsComplete = todo.complete
    const taskList = todoIsComplete ? completedTodoList : incompleteTodoList;
    const checked = todoIsComplete ? "checked" : "";
   

    let todoItemHTML = 
    `<div class="form-check">
      <label class="form-check-label">
        <input id="${todo._id}" class="js-tick" type="checkbox" ${checked}/>
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


    let randomId = Math.floor(Math.random() * 2004321);


    const newTodoObject = {
      "id": randomId,
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
        body: JSON.stringify(newTodoObject),
      })
      .then((res) => res.json())
      .then((data) =>{
        console.log(data)
        incompleteTodoList.innerHTML = "";
        completedTodoList.innerHTML = '';
        getTodos();

      })
      .catch( () => console.log("error adding to DB"))
    }
    createTodoInput.value = '';
  }
  
  
  function editTodo(event) {
    let todoDOMElement = event.currentTarget.parentNode.parentNode.childNodes[1].childNodes[1];
    console.log(todoDOMElement)
    let id = todoDOMElement.id;
    console.log(id)
    let oldTodo = event.currentTarget.parentNode.parentNode;
    let inputField = document.createElement('input');
    let button = document.createElement('button');
    let name;
    
    let oldDOMElement = todoDOMElement.parentNode.firstChild.nextSibling;
    let complete = oldDOMElement.checked;
    let category = "General"

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

      if (name === ''){
        alert('A Todo Cannot Be Blank, Please Try Again.')
      } else {

        fetch(`/todos/${id}`, {
          method: 'PUT', 
          headers: {'Content-Type': 'application/json; charset=UTF-8'},
          body: JSON.stringify({ id, name, complete, category }),
        })
        .then((res) => res.json())
        .then((data) => {
          incompleteTodoList.innerHTML = "";
          completedTodoList.innerHTML = '';
          getTodos();
        })
      } 

  })}

  function deleteTodo(event) {
    let id = event.currentTarget.parentNode.parentNode.childNodes[1].childNodes[1].id;
    console.log(id)
    
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
    
    console.log('toggle')
    let id = event.target.id
    let name = event.currentTarget.parentNode.innerText
    let complete = event.target.checked;
    let category = "General"
    
  

    fetch(`/todos/${id}`, {
      method: 'PUT', 
      headers: {'Content-Type': 'application/json; charset=UTF-8'},
      body: JSON.stringify({ id, name, complete, category }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      incompleteTodoList.innerHTML = "";
      completedTodoList.innerHTML = '';
      getTodos();
    })
  }

  function deleteAllCompletedTasks(event) {
    let completedTasksDOM = document.getElementById('complete-ul')

    let tasksToRemoveDiv = completedTasksDOM.children

    console.log(tasksToRemoveDiv.length)

    let i = 0;
    while (i < tasksToRemoveDiv.length){
      let id = tasksToRemoveDiv[i].childNodes[1].childNodes[1].id;
      console.log(id)
      i++;
    }
    //completedTasksDOM.innerHTML = '';

    


  }



})(window);

