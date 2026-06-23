let tasksData = {};

const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done');
const columns = [todo, progress, done];
let dragElement = null;

function addTask(title, desc, column) {
    const div = document.createElement("div");

    div.classList.add("task");
    div.setAttribute("draggable", "true");
    div.innerHTML = `
        <h2>${title}</h2>
        <p>${desc}</p>
        <button>Delete</button>
    `;

    column.appendChild(div);
    div.addEventListener("dragstart", () => {
        dragElement = div;
    });

    const deleteButton = div.querySelector("button");

    deleteButton.addEventListener("click", () => {
        div.remove();
        updateTaskCount();
    });
}

function updateTaskCount() {
    columns.forEach(col => {
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right");

        count.innerText = tasks.length;
    });
}

function addDragEventsOnColumn(column) {

    column.addEventListener("dragenter", (e) => {
        e.preventDefault();
        column.classList.add("hover-over");
    });

    column.addEventListener("dragleave", (e) => {
        e.preventDefault();
        column.classList.remove("hover-over");
    });

    column.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    column.addEventListener("drop", (e) => {
        e.preventDefault();

        column.appendChild(dragElement);
        column.classList.remove("hover-over");

        updateTaskCount();
    });
}

addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(done);

const toggleModalButton = document.querySelector("#toggle-modal");
const modalBg = document.querySelector(".modal .bg");
const modal = document.querySelector(".modal");
const addTaskButton = document.querySelector("#add-new-task");

toggleModalButton.addEventListener("click", () => {
    modal.classList.toggle("active");
});

modalBg.addEventListener("click", () => {
    modal.classList.remove("active");
});


addTaskButton.addEventListener("click", () => {

    const taskTitle = document.querySelector("#task-title-input").value;
    const taskDesc = document.querySelector("#task-desc-input").value;

    if (!taskTitle.trim()) {
        alert("Task title cannot be empty");
        return;
    }

    addTask(taskTitle, taskDesc, todo);

    updateTaskCount();

    modal.classList.remove("active");

    document.querySelector("#task-title-input").value = "";
    document.querySelector("#task-desc-input").value = "";
});