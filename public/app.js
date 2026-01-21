//Fetch todos and render them
async function fetchTodos() {
    const response = await fetch('/todos');
    const todos = await response.json();
    const todoList = document.getElementById('todoList');

    todoList.innerHTML = '';

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo.task;
        todoList.appendChild(li);        
    });
}