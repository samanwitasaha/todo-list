const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");
const allButton = document.getElementById("allButton");
const activeButton = document.getElementById("activeButton");
const completedButton = document.getElementById("completedButton");
const darkModeButton = document.getElementById("darkModeButton");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";


// Save tasks
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Display tasks
function displayTasks() {
    taskList.innerHTML = "";
    if (tasks.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No tasks yet. Add one above! 📝";
    emptyMessage.classList.add("empty-message");

    taskList.appendChild(emptyMessage);
    return;
}
    const completedCount = tasks.filter(function (task) {
    return task.completed;
}).length;

const remainingCount = tasks.length - completedCount;

taskCounter.textContent =
    `${tasks.length} tasks • ${completedCount} completed • ${remainingCount} remaining`;

    tasks.forEach(function (task, index) {

        // Filter tasks
        if (currentFilter === "active" && task.completed) {
            return;
        }

        if (currentFilter === "completed" && !task.completed) {
            return;
        }


        // Create list item
        const listItem = document.createElement("li");


        // Create task text
        const taskTextElement = document.createElement("span");
        taskTextElement.textContent = task.text;

        if (task.completed) {
            taskTextElement.classList.add("completed");
        }


        // Complete button
        const completeButton = document.createElement("button");
        completeButton.textContent = "Complete";

        completeButton.addEventListener("click", function () {
            tasks[index].completed = !tasks[index].completed;

            saveTasks();
            displayTasks();
        });


        // Edit button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";

        editButton.addEventListener("click", function () {

            const newTaskText = prompt(
                "Edit your task:",
                task.text
            );

            if (newTaskText !== null && newTaskText.trim() !== "") {

                tasks[index].text = newTaskText.trim();

                saveTasks();
                displayTasks();
            }
        });


        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {

            tasks.splice(index, 1);

            saveTasks();
            displayTasks();
        });


        // Add everything to the list item
        listItem.appendChild(taskTextElement);
        listItem.appendChild(completeButton);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem);
    });
}


// Add new task
addButton.addEventListener("click", function () {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    saveTasks();
    displayTasks();

    taskInput.value = "";
});


// Press Enter to add a task
taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addButton.click();
    }
});

// Filter buttons
allButton.addEventListener("click", function () {

    currentFilter = "all";
    displayTasks();
});


activeButton.addEventListener("click", function () {

    currentFilter = "active";
    displayTasks();
});


completedButton.addEventListener("click", function () {

    currentFilter = "completed";
    displayTasks();
});
// Display saved tasks when page loads
displayTasks();
function loadDarkMode() {
    const darkMode = localStorage.getItem("darkMode");

    if (darkMode === "enabled") {
        document.body.classList.add("dark-mode");
        darkModeButton.textContent = "☀️ Light Mode";
    }
}

darkModeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
        darkModeButton.textContent = "☀️ Light Mode";
    } else {
        localStorage.setItem("darkMode", "disabled");
        darkModeButton.textContent = "🌙 Dark Mode";
    }
});

loadDarkMode();