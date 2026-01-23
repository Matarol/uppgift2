const fs = require('fs/promises');
const path = require('path');

const DATA_FILE = path.join(process.cwd(), 'todos.json');

let todos = [];

// Ladda todo's från fil vid start av applikation
async function loadTodos() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        todos = JSON.parse(data);
    }
    catch (err) {
        todos = []
    }    
}

//Spara todo's till filen
async function saveTodos() {
    console.log("Saving todos to:", DATA_FILE);   
    await fs.writeFile(DATA_FILE, JSON.stringify(todos, null, 2));
     
}

//Create, Read, Update, Delete (CRUD) funktioner
function getTodos() {
    return todos;
}

async function addTodo(task) {
    const newTodo = {
        id: Date.now(),
        task,
        completed: false
    };

    todos.push(newTodo);
    await saveTodos();
    return newTodo;    
}

async function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (!todo) return null;

    todo.completed = !todo.completed;
    await saveTodos();
    return todo;    
}

async function deleteTodo(id) {
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) return false;

    todos.splice(index, 1);
    await saveTodos();
    return true;
}

//Exportera funktioner för att göra de tillgängliga för hela applikationen

module.exports = {
    loadTodos,
    getTodos,
    addTodo,
    toggleTodo,
    deleteTodo
};