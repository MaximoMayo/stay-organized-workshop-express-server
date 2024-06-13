"use strict";

//load in content
document.addEventListener('DOMContentLoaded', init);

//initialize the functionality
function init(){
    populateDropdown();
    addEventListeners();
}

//add event listeners to the page 
function addEventListeners(){
    todoSelect.addEventListener('change',DisplayToDos);
}

//add users to the select dropdown
async function populateDropdown(){
    const todoSelect = document.getElementById("todoSelect");
    const response = await fetch('http://localhost:8083/api/users');
    const users = await response.json();

    const fragment = document.createDocumentFragment();

    for(let i = 0; i < users.length; i++){
        const option = new Option(`${users[i].name} `, users[i].id);
        fragment.appendChild(option);
    }
    todoSelect.appendChild(fragment);
}

//display the to dos
async function DisplayToDos(){
    let selectValue = getSelectValue();
    let usersToDo = await getUsersToDo(selectValue);
    displayTable(usersToDo);
    console.log(selectValue);
    console.log(usersToDo);
}

//get the select value
function getSelectValue(){
    const todoSelect = document.getElementById("todoSelect");
    let selectValue = todoSelect.value;
    return selectValue;
}

//get the selected users to dos
async function getUsersToDo(userId){
    const base_URL = "http://localhost:8083/api/todos/byuser/";
    let combined_URL = `${base_URL}${userId}`;
    let fetch_URL = await fetch(combined_URL);
    let usableCode = await fetch_URL.json();
    return usableCode;
}

//use chosen to dos to display on table
async function displayTable(toDoArray){
    //sort the array
    toDoArray = toDoArray.sort();

    //set variables
    let completeSymbol;
    let table = document.getElementById("todoTable");

    //clear table of previous results
    table.innerHTML = "";

    //add headers
    table.insertAdjacentHTML('beforeend',`
        <thead>
            <td>ID</td>
            <td>Category</td>
            <td>Description</td>
            <td>Deadline</td>
            <td>Priority</td>
            <td>Completed</td>
        </thead>
        `);

    //for loop to display users todos in a table
    for (let i = 0; i < toDoArray.length; i++) {
        //checking whether to add big or small X
        if(toDoArray[i].completed == false){
            completeSymbol = 'x';
        }
        else{
            completeSymbol = 'X'
        }
        //Makes a new row for each iteration
            table.insertAdjacentHTML('beforeend',`
                <tr>
                    <td id="id">${toDoArray[i].id}</td>
                    <td id="category">${toDoArray[i].category}</td>
                    <td id="description">${toDoArray[i].description}</td>
                    <td id="deadline">${toDoArray[i].deadline}</td>
                    <td id="priority">${toDoArray[i].priority}</td>
                    <td id="completed">${completeSymbol}</td>
                </tr>
                `);
    }
}

