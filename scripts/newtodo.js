"use strict";

"use strict";

//load in content
document.addEventListener('DOMContentLoaded', init);

//initialize the functionality
function init(){
    populateToDoDropdown();
    populateCatDropdown();
    addEventListeners();
}

//add event listeners to the page 
function addEventListeners(){
    document.getElementById("addButton").addEventListener("click", addNewToDo);
}

//add users to the select dropdown
async function populateToDoDropdown(){
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

async function populateCatDropdown(){
    const catSelect = document.getElementById("catSelect");
    const response = await fetch('http://localhost:8083/api/categories');
    const categories = await response.json();

    const fragment = document.createDocumentFragment();

    for(let i = 0; i < categories.length; i++){
        const option = new Option(`${categories[i].name} `, categories[i].id);
        fragment.appendChild(option);
    }
    catSelect.appendChild(fragment);
}

async function addNewToDo(){
    const user = getUsers();
    const cat = getCategory();
    const desc = getDescription();
    const deadline = getDeadline();
    const prior = getPriority();
    console.log(user);

    let newFormData = createNewFormData(user, cat, desc, deadline, prior);
    console.log(newFormData);

    // let postOption = "Post"
    // let requestOptions = requestParams(postOption);
    // console.log(requestOptions);

}

function createNewFormData(user, cat, desc, deadline, prior){
    const formData = new FormData();
    formData.append("userid", user);
    formData.append("category", cat);
    formData.append("description", desc);
    formData.append("deadline", deadline);
    formData.append("priority", prior);

    return formData;
}

// function requestParams(Option){
//     let methodOption = `"${Option}"`;
//     console.log(methodOption);
//     const requestOptions = {
//         method: methodOption,
//         body: formData,
//         redirect: "follow"
//     }
//     return requestOptions;
// }

function getUsers(){
    let userValue = document.getElementById("todoSelect").value;
    return userValue;
}

function getCategory(){
    let catValue = document.getElementById("catSelect").value;
    return catValue;
}

function getDescription(){
    let descValue = document.getElementById("description").value;
    return descValue;
}

function getDeadline(){
    let deadlineValue = document.getElementById("date").value;
    return deadlineValue;
}

function getPriority(){
    let priorValue = document.getElementById("urgSelect").value;
    return priorValue;
}
