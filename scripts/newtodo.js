"use strict";

// Load in content
document.addEventListener('DOMContentLoaded', init);

// Initialize the functionality
function init(){
    populateToDoDropdown();
    populateCatDropdown();
    addEventListeners();
}

// Add event listeners to the page 
function addEventListeners(){
    document.getElementById("addButton").addEventListener("click", clickForNewToDo);
}

// Handle the click event for the add button
function clickForNewToDo(){
    const newFormData = addNewToDo();
    console.log(newFormData);
    postNewToDo(newFormData);
}

// Add users to the select dropdown
async function populateToDoDropdown(){
    const todoSelect = document.getElementById("todoSelect");
    const response = await fetch('http://localhost:8083/api/users');
    const users = await response.json();

    const fragment = document.createDocumentFragment();

    for(let i = 0; i < users.length; i++){
        const option = new Option(`${users[i].name}`, users[i].id);
        fragment.appendChild(option);
    }
    todoSelect.appendChild(fragment);
}

// Add categories to the select dropdown
async function populateCatDropdown(){
    const catSelect = document.getElementById("catSelect");
    const response = await fetch('http://localhost:8083/api/categories');
    const categories = await response.json();

    const fragment = document.createDocumentFragment();

    for(let i = 0; i < categories.length; i++){
        const option = new Option(`${categories[i].name}`, categories[i].id);
        fragment.appendChild(option);
    }
    catSelect.appendChild(fragment);
}

// Create a new to-do item
function addNewToDo(){
    const user = getUsers();
    const cat = getCategory();
    const desc = getDescription();
    const deadline = getDeadline();
    const prior = getPriority();

    let newFormData = createNewFormData(user, cat, desc, deadline, prior);
    return newFormData;
}

// Create new FormData object
function createNewFormData(user, cat, desc, deadline, prior){
    const data = {
        userid: user,
        category: cat,
        description: desc,
        deadline: deadline,
        priority: prior
    };
    return data;
}

// Post the new to-do item to the server
async function postNewToDo(data) {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        redirect: "follow"
    };

    try {
        const response = await fetch("http://localhost:8083/api/todos", requestOptions);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

// Get user value from the dropdown
function getUsers(){
    let userValue = document.getElementById("todoSelect").value;
    return userValue;
}

// Get category value from the dropdown
function getCategory(){
    let catValue = document.getElementById("catSelect").value;
    return catValue;
}

// Get description from the input
function getDescription(){
    let descValue = document.getElementById("description").value;
    return descValue;
}

// Get deadline from the input
function getDeadline(){
    let deadlineValue = document.getElementById("date").value;
    return deadlineValue;
}

// Get priority from the dropdown
function getPriority(){
    let priorValue = document.getElementById("urgSelect").value;
    return priorValue;
}