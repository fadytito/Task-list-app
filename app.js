// Define UI variables

const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const filterInput = document.querySelector('#filter');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');

// Initialize local storage variable

let tasks;

// Call all event listeners on start

loadAllEventListeners();

// Create loadAllEventListeners function

function loadAllEventListeners() {
  document.addEventListener('DOMContentLoaded', getTasks);
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', deleteTask);
  clearBtn.addEventListener('click', deleteAllTasks);
  filter.addEventListener('keyup', filterTasks)
}

// Get tasks from local storage

function getTasks() {
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task) {
    // Create li element and add it to the ul task list
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.textContent = task;
    taskList.appendChild(li);

    // Create link element (remove link) and add it to li task item
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></>';
    li.appendChild(link);
  });
}

// Create addTask function

function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task');
  } else {
    // Create li element and add it to the ul task list
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.textContent = taskInput.value;
    taskList.appendChild(li);

    // Create link element (remove link) and add it to li task item
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></>';
    li.appendChild(link);

    // Call storeTaskInLs function
    storeTaskInLs(taskInput.value);

    taskInput.value = '';
    e.preventDefault();
  }
}

// Create storeTaskInLs function

function storeTaskInLs(task) {
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Create deleteTask function

function deleteTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    e.target.parentElement.parentElement.remove();

    deleteTaskFromLs(e.target.parentElement.parentElement);
  }
}

// Create deleteTaskFromLs function

function deleteTaskFromLs(taskItem) {
  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  });
}

// Create deleteAllTasks function

function deleteAllTasks() {
  while (taskList.firstElementChild) {
    taskList.firstElementChild.remove();
  }

  deleteAllTasksFromLs();
}

// Create deleteAllTasksFromLs function

function deleteAllTasksFromLs() {
  localStorage.clear();
}

// Create filterTasks function

function filterTasks(e) {
  const filterInputValue = filterInput.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function (item) {
    itemContent = item.textContent.toLowerCase();
    if (itemContent.indexOf(filterInputValue) !== -1) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}


