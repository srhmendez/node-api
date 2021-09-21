
// let arr = [
//     {
//         id: 1,
//         task: 'Wake up',
//         status: true
//     },
//     {
//         id: 2,
//         task: 'Make bed',
//         status: false
//     },

// ]

// let arr = [
//     {id: 1, name: "go shopping"},
//     {id: 2, name: "make bed"}
// ]



let Task1 = {
    name: 'Wake Up',
    // complete: true
  };
  let Task2 = {
    name: 'Make Bed',
    // complete: false
  };
  let Task3 = {
    name: 'Make Breakfast',
    // complete: true
  };

let demo = document.getElementById("demo");
let tasks = [Task1];
tasks.forEach(task => demo.innerHTML += Object.values(task).join(" "));
console.log(tasks);






let taskInput = document.getElementById('new-task-input');

let addBtn = document.getElementById('returnbtn');

let incompleteUl = document.getElementById('incomplete-ul');
let listWrapper = document.getElementsByClassName('list-wrapper')

let createNewTask = (taskString) => {

    let listItem=document.createElement("li");

    var label=document.createElement("label");
    label.innerText=taskString;

    let checkBox=document.createElement("input");

    checkBox.type="checkbox";

    listItem.appendChild(checkBox)    
    listItem.appendChild(label)

	return listItem;
}

let addTask = () => {
    console.log('add task')

    let listItem=createNewTask(taskInput.value);

    incompleteUl.appendChild(listItem)

    console.log('taskInput--->', taskInput.value)
    return listItem;
}

addBtn.addEventListener("click",addTask);
/* let btn = document.createElement("button");
button.innerHTML = "Add";
document.body.appendChild(btn); */