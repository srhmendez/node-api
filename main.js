
// document.getElementbyId("returnbtn").addEventListener("click", displayDate);

var toDos = {
    // name: '',
    // status: '',
};

var arr = [
    {
    name: "Wake up",
    complete: true,
},
{
    name: "Make Bed",
    complete: false,
}
];


//test
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

	//Append listItem to incompleteTaskHolder
	// incompleteTaskHolder.appendChild(listItem);
	// bindTaskEvents(listItem, taskCompleted);
    incompleteUl.appendChild(listItem)

	// taskInput.value="";
    console.log('taskInput--->', taskInput.value)
    return listItem;
}

// addButton.onclick=addTask;
addBtn.addEventListener("click",addTask);
/* let btn = document.createElement("button");
button.innerHTML = "Add";
document.body.appendChild(btn); */