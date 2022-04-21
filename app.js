const errorBox = document.querySelector(".todo-box .error-box");
const successBox = document.querySelector(".todo-box .success-box");
const input = document.querySelector(".input-box .input");
const addBtn = document.querySelector(".input-box .btn");
const todoListBox = document.querySelector(".todo-list");
const clearBtn = document.querySelector(".clear-list .btn-clear");
const deleteList = document.querySelector(".todo-list");
let todos = [];

eventListener();
function eventListener() {
    document.addEventListener("DOMContentLoaded", () => {
        todos = JSON.parse(localStorage.getItem("todos")) || [];
        // CREATE HTML
        createHTML();
    });
    deleteList.addEventListener("click", deleteTask);
}
input.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        Add();
    }
});
addBtn.addEventListener("click", Add);
function Add() {
    let task = input.value;
    if (task === "") {
        errorInput();
        return;
    }
    let todoObj = {
        task: task,
        id: Date.now(),
    };
    todos = [...todos, todoObj];
    // CREATE HTML
    createHTML();
    // SUCCESSFULL INPUT
    successInput();
    input.value = "";
}
clearBtn.addEventListener("click", clearTodos);

// CLEAR TODOS
function clearTodos() {
    todos = [];
    createHTML();
}

// DELETE TASK
function deleteTask(e) {
    if (e.target.tagName == "SPAN") {
        const deleteId = parseInt(e.target.getAttribute("data-id"));
        todos = todos.filter((item) => item.id !== deleteId);
        // CREATE HTML
        createHTML();
    }
}

// CREATE HTML
function createHTML() {
    // CLEAR HTML
    clearHTML();

    if (todos.length > 0) {
        todos.forEach((task) => {
            let p = document.createElement("p");
            p.classList.add("list");
            p.innerHTML = `${task.task} <span data-id=${task.id} class="delete">X</span>`;

            todoListBox.appendChild(p);
        });
    }
    // SAVE LOCAL STORAGE
    saveTodosLocalStorage();
}

// SAVE LOCAL STORAGE
function saveTodosLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// ERROR INPUT
function errorInput() {
    errorBox.style.display = "block";
    setTimeout(() => {
        errorBox.style.display = "none";
    }, 2000);
}
// SUCCESSFUL INPUT
function successInput() {
    successBox.style.display = "block";
    setTimeout(() => {
        successBox.style.display = "none";
    }, 2000);
}

// CLEAR HTML
function clearHTML() {
    todoListBox.innerHTML = "";
}
