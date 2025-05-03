document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById("todo-input");
    const addTaskButton = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");

    // Load tasks from localStorage or initialize empty array
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render existing tasks
    tasks.forEach(task => renderTask(task));

    // Add task button event listener
    addTaskButton.addEventListener('click', () => {
        addTask();
    });

    // Add Enter key listener
    todoInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            addTask();
        }
    });

    // Function to add a new task
    function addTask() {
        const taskText = todoInput.value.trim();
        if (taskText === "") return;

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        tasks.push(newTask);
        saveTasks();
        renderTask(newTask);
        todoInput.value = ""; // clear input
    }

    // Function to render a single task item
    function renderTask(task) {
        const li = document.createElement('li');
        li.setAttribute('data-id', task.id);

        if (task.completed) li.classList.add('completed');

        li.innerHTML = `
            <span>${task.text}</span>
            <button title="Delete Task">&#128465;</button>
        `;

        // Toggle completion status when clicking on the task (not the delete button)
        li.addEventListener('click', (e) => {
            if (e.target.tagName.toLowerCase() === 'button') return;
            task.completed = !task.completed;
            li.classList.toggle('completed');
            saveTasks();
        });

        // Delete task
        li.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation(); // prevent toggle from firing
            tasks = tasks.filter(t => t.id !== task.id);
            li.remove();
            saveTasks();
        });

        todoList.appendChild(li);
    }

    // Save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
