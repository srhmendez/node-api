let todoTasks = [
    {name: 'wake up', status: true},
    {name: 'go shopping', status: false}
]


let demo = document.getElementById("demo");
let tasks = [todoTasks[0]];
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