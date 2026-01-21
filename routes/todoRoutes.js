const express = require('express');
const router = express.Router();

let todos = [];

// Api endpoint för att hämta alla todo's
router.get('/', (req, res) => {
    res.json(todos);
});

router.post('/add', (req, res) => {
    const { task } = req.body;
    if (task) {
        const newTodo = { id: todos.length + 1, task};
        todos.push(newTodo);
        res.status(201).json(newTodo);
    }
    else {
        res.status(400).send('Task is required');
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    todos = todos.filter(todo => todo.id !== parseInt(id));
    res.status(200).send(`Deleted todo with Id ${id}`);

});

module.exports = router;