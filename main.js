
document.getElementbyId().addEventListener("click", displayDate);

var toDos = {
    name: '',
    status: '',
};

var arr = [
    {
    id: 1,
    name: "Wake up",
    status: "complete",
},
{
    id: 2,
    name: "Make Bed",
    status: "incomplete",
}
];



let btn = document.createElement("button");
button.innerHTML = "Add";
document.body.appendChild(btn);