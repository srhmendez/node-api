
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
let todoTasks = [
    {name: 'wake up'},
    {name: 'go shopping'}
]


// let demo = document.getElementById("demo");
// let tasks = [todoTasks[0]];
// tasks.forEach(task => demo.innerHTML += Object.values(task).join(" "));
// console.log(tasks);


// ATTEMPT AT ADDING ARR ITEMS
let arr = [
{id: 1, name: 'go to work'},
{id: 2, name: 'go to school'},
{id: 3, name: 'go to dentist'},
];

// let html = 
// '<ul >' + arr.map(function (arr) {
//     return '<li>' + arr.name + '<li>';
// }).join('') + '</ul>';
// console.log(html);
// document.querySelector('#demo').innerHTML = html;

let html = 
'<ul class="d-flex flex-column-reverse todo-list" id="incomplete-ul">' + arr.map(function (arr) {
    return '<li>' + 
    '<div class="form-check">' + 
    '<label class="form-check-label">' + 
    '<input class="checkbox" type="checkbox">' + 
    arr.name +  
    '<p class="input-helper" id="demo">' +
    '</p>' +
    '</label>' + 
    '</div>' + 
    '<i class="remove mdi mdi-close-circle-outline">' + 
    '</i>'
    '<li>';
}).join('') + 
'</ul>';
console.log(html);
document.querySelector('#demo').innerHTML = html;





let taskInput = document.getElementById('new-task-input');

let addBtn = document.getElementById('returnbtn');

let incompleteUl = document.getElementById('incomplete-ul');
let listWrapper = document.getElementsByClassName('list-wrapper')

let createNewTask = (taskString) => {

    let listItem = document.createElement("li");

    var label = document.createElement("label");
    label.innerText = taskString;

    let checkBox = document.createElement("input");

    checkBox.type = "checkbox";

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