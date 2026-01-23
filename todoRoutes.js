const express = require('express');
const router = express.Router();

let todos = [];

// Api endpoint för att hämta alla todo's
router.get('/', (req, res) => {
    res.json(todos);
});

router.post('/', (req, res) => {
    const { task } = req.body;
    if (!task) {
        return res.status(400).send('Task is required');
    }
               
    const newTodo = { id: Date.now(), task, completed: false};
    todos.push(newTodo);

    res.status(201).json(newTodo);    
    
});

router.patch('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);

    if (!todo) {
        return res.status(404).send('Todo not found')
    }

    todo.completed = !todo.completed;
    res.json(todo);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    todos = todos.filter(todo => todo.id !== parseInt(id));
    res.status(200).send(`Deleted todo with Id ${id}`);

});

module.exports = router;