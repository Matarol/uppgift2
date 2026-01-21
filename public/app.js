//Fetch todos and render them
async function fetchTodos() {
    const response = await fetch('/todos');
    const todos = await response.json();
    const todoList = document.getElementById('todoList');

    todoList.innerHTML = '';

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.classList.add('todo-item');

        //checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.classList.add('todo-checkbox');
        checkbox.addEventListener('change', () => toggleTodo(todo.id));

        //text
        const span = document.createElement('span');
        span.textContent = todo.task;
        span.classList.add('todo-text');
        
        if (todo.completed) {
            span.style.textDecoration = 'line-through';
        }

        //delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
        
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        todoList.appendChild(li);        
    });
}

async function addTodo() {
    const todoInput = document.getElementById('todoInput');
    const newTodo = todoInput.value.trim();

    if (newTodo) {
        const response = await fetch('/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ task: newTodo }),
        });

        if (response.ok) {
            todoInput.value = '';
            fetchTodos();
        }
        else {
            alert('Failed to add todo')
        }

    }
}

async function deleteTodo(id) {
    await fetch(`/todos/${id}`, {
        method: 'DELETE'
    });

    fetchTodos();
}

async function toggleTodo(id) {
    await fetch(`/todos/${id}`, {
        method: 'PATCH'
    });

    fetchTodos();
}

document.getElementById('todoForm').addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
});

// Load todos on page load
fetchTodos();
